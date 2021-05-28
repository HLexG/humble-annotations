from enum import Enum

class AccountType(str, Enum):
    hub = "user"
    admin = "admin"

class PermissionType(str, Enum):
    read = "read"
    readwrite = "readwrite"
    owner = "owner"