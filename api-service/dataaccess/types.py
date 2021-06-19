from enum import Enum


class AccountType(str, Enum):
    hub = "user"
    admin = "admin"


class PermissionType(str, Enum):
    read = "read"
    readwrite = "readwrite"
    owner = "owner"


class AnnotationType(str, Enum):
    entity_mention = "entity_mention"
    entity_coreference = "entity_coreference"
    named_entity_recognition = "named_entity_recognition"
    entity_linking = "entity_linking"
    event_mention = "event_mention"
    event_coreference = "event_coreference"
