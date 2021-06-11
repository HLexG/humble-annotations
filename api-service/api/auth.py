from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Header, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestFormStrict
from fastapi.security.api_key import APIKeyHeader, APIKey
from jose import JWTError, jwt
from passlib.context import CryptContext

from api.data_models import User, TokenData
from api import errors
from dataaccess import users as dataaccess_users
from dataaccess.types import PermissionType, AccountType
from dataaccess.errors import RecordNotFoundError

router = APIRouter()

#TODO: Move this to environment variables
# openssl rand -hex 32
JWT_SECRET_KEY = "a3b017c067de6bcdf3696fdcf23ff5b0948ebaca5687b98423b498b44206c942"
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60
API_KEY_NAME = "api_key"

# Password context
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define PasswordBearer Auth Schema
auth_scheme = OAuth2PasswordBearer(
    tokenUrl="/v1/auth/login",
    scheme_name="OAuth2",
    auto_error=False
)
#auth_scheme.model.flows.password = None
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return password_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

class AuthData():
    user_id: Optional[int]
    api_key: Optional[str]

    def __init__(self, token: str,api_key: str, optional: bool = False):
        self.user_id = None
        self.api_key = None
        if (optional and not token and not api_key):
            return

        print("token:",token)
        print("api_key:",api_key)
        # Check api key first
        if api_key:
            self.api_key = api_key
        else:
            # Check jwt token
            try:
                payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            except JWTError:
                raise errors.AuthenticationError()

            try:
                self.user_id = payload["id"]
            except KeyError:
                raise errors.AuthenticationError()

    async def load(self):
        if self.api_key:
            try:
                api_key_db = await dataaccess_api_keys.get_by_key(key=self.api_key)
            except RecordNotFoundError:
                raise errors.AuthenticationError()

            try:
                self.user_id = api_key_db["user_id"]
            except KeyError:
                raise errors.AuthenticationError()
        
        # TODO:Load other access control details from DB

class AsyncAuth():
    def __init__(self, optional: bool = False):
        self.optional = optional

    async def __call__(self, token: str = Depends(auth_scheme), api_key: APIKey = Security(api_key_header)) -> AuthData:
        auth = AuthData(token=token, api_key=api_key, optional=self.optional)
        await auth.load()

        return auth

Auth = AsyncAuth(optional=False)
OptionalAuth = AsyncAuth(optional=True)

@router.post(
    "/auth/login",
    tags=["Authentication"],
    summary="Authenticate with login credentials",
    description="Authenticate with an username/password and request an access and refresh token.",
    response_description="The access and refresh tokens, and an expiration duration.",
)
async def login(
    form_data: OAuth2PasswordRequestFormStrict = Depends(),
    user_agent: Optional[str] = Header(None),
):
    # Get user
    user = await dataaccess_users.get_by_name(form_data.username)

    # Verify password
    if not verify_password(form_data.password, user["hashed_password"]):
        raise errors.IncorrectLoginError()

    access_token_expires = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "username": user["username"],
            "id": user["id"]
            }, 
        expires_delta=access_token_expires
    )

    return {
        "username": user["username"],
        "access_token": access_token, 
        "token_type": "bearer"
    }

@router.post(
    "/auth/signup",
    tags=["Authentication"],
    summary="Signup with login credentials",
    description="Signup to create an account",
    response_description="Account creation success or failure",
)
async def signup(
    form_data: OAuth2PasswordRequestFormStrict = Depends(),
    user_agent: Optional[str] = Header(None),
):
    # Check if username exists
    try:
        user = await dataaccess_users.get_by_name(form_data.username)
        raise errors.UserAlreadyExists("Username already exists")
    except RecordNotFoundError:
        pass

    # Hash password
    hashed_password = get_password_hash(form_data.password)

    # Save user
    user = await dataaccess_users.create(
        username=form_data.username,
        email='',
        full_name='',
        hashed_password=hashed_password
    )

    return {"account_created": True}

@router.post(
    "/auth/validate",
    tags=["Authentication"],
    summary="Validate authenticattion token",
    description="Validate authenticattion token and request a new access token.",
    response_description="The access token and an expiration duration.",
)
async def validate(
    auth: Auth = Depends()
):
    # Get user
    user = await dataaccess_users.get(auth.user_id)

    access_token_expires = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "username": user["username"],
            "id": user["id"]
            }, 
        expires_delta=access_token_expires
    )

    return {
        "username": user["username"],
        "access_token": access_token, 
        "token_type": "bearer"
    }

