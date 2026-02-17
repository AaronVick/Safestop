import json
from pathlib import Path

from jsonschema import validate as jsonschema_validate, ValidationError

SCHEMA_PATH = Path(__file__).resolve().parent / "schema" / "v1.2.json"


def validate_artifact(artifact: dict) -> dict:
    """Validate a Safestop artifact against the v1.2 schema.

    Returns a dict with:
        - valid: bool
        - deployable: bool (from artifact)
        - missing_requirements: list (when deployable is False)
        - errors: list (when valid is False)
    """
    with open(SCHEMA_PATH, encoding="utf-8") as f:
        schema = json.load(f)

    try:
        jsonschema_validate(instance=artifact, schema=schema)
        return {
            "valid": True,
            "deployable": artifact.get("deployable", False),
            "missing_requirements": artifact.get("missing_requirements", []),
        }
    except ValidationError as e:
        return {
            "valid": False,
            "errors": [e.message],
        }
