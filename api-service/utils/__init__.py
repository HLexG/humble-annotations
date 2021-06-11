import os

def extract_environment_variable(name: str) -> str:
    try:
        return os.getenv(name)
    except KeyError:
        raise RuntimeError(f"The {name} environment variable is missing.")