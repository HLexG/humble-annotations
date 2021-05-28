from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_406_NOT_ACCEPTABLE

def AuthenticationError() -> HTTPException:
    return HTTPException(
        status_code=HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

def IncorrectLoginError() -> HTTPException:
    return HTTPException(
        status_code=HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"}
    )

def AccessDeniedError() -> HTTPException:
    return HTTPException(
        status_code=HTTP_403_FORBIDDEN,
        detail="You do not have access to this resource"
    )

def BadRequestError(message: str) -> HTTPException:
    return HTTPException(
        status_code=HTTP_400_BAD_REQUEST,
        detail=message
    )

def NotFoundError(message: str) -> HTTPException:
    return HTTPException(
        status_code=HTTP_404_NOT_FOUND,
        detail=message
    )

def UploadError(message: str) -> HTTPException:
    return HTTPException(
        status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        detail=message
    )

def UserAlreadyExists(message: str) -> HTTPException:
    return HTTPException(
        status_code=HTTP_406_NOT_ACCEPTABLE,
        detail=message
    )
