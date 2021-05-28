from fastapi import APIRouter, Depends, Path

from api.auth import Auth, OptionalAuth
from api.data_models import Profile, Account
from dataaccess import users as dataaccess_users

router = APIRouter()

@router.get(
    "/profile",
    tags=["Settings"],
    summary="Get profile information",
    description="Get all information about the currently signed in user.",
    response_description="The user profile information",
    response_model=Profile
)
async def profile_fetch(
    auth: Auth = Depends()
):
    print("user_id:",auth.user_id)

    # Get user
    user = await dataaccess_users.get(auth.user_id)

    return {
        "username": user["username"],
        "full_name": user["full_name"]
    }

@router.get(
    "/profile/{username}",
    tags=["Profile"],
    summary="Get profile information",
    description="Get profile information of the username",
    response_description="Get profile information of the username",
    response_model=Profile
)
async def profile_by_name_fetch(
    username: str = Path(..., description="The username"),
    auth: OptionalAuth = Depends()
):
    print("username:",username)

    # Get user
    user = await dataaccess_users.get_by_name(username)

    return {
        "username": user["username"],
        "full_name": user["full_name"]
    }

@router.put(
    "/profile",
    tags=["Settings"],
    summary="Update profile information",
    description="Update profile information",
    response_description="The user profile information",
    response_model=Profile
)
async def profile_update(
        profile: Profile,
        auth: Auth = Depends()
):
    # Get user
    user = await dataaccess_users.get(auth.user_id)

    # Update user profile information
    user_db = await dataaccess_users.update(
        id=user["id"],
        full_name=profile.full_name
    )

    return {
        "username": user_db["username"],
        "full_name": user_db["full_name"]
    }

@router.get(
    "/account",
    tags=["Settings"],
    summary="Get account information",
    description="Get all information about the currently signed in user.",
    response_description="The user account information",
    response_model=Account
)
async def account_fetch(
    auth: Auth = Depends()
):
    print("user_id:",auth.user_id)

    # Get user
    user = await dataaccess_users.get(auth.user_id)

    return {
        "username": user["username"],
        "email": user["email"]
    }

@router.put(
    "/account",
    tags=["Settings"],
    summary="Update account information",
    description="Update account information",
    response_description="The user account information",
    response_model=Account
)
async def account_update(
        account: Account,
        auth: Auth = Depends()
):
    # Get user
    user = await dataaccess_users.get(auth.user_id)

    # Update user profile information
    user_db = await dataaccess_users.update(
        id=user["id"],
        email=account.email
    )

    return {
        "username": user_db["username"],
        "email": user_db["email"]
    }
    