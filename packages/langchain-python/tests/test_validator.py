import json
from pathlib import Path

import pytest

from safestop_langchain.validator import validate_artifact

FIXTURES = Path(__file__).resolve().parent.parent.parent / "core" / "__tests__" / "fixtures"
VALID_PATH = FIXTURES / "valid-deployable.json"


def test_valid_deployable_artifact():
    with open(VALID_PATH, encoding="utf-8") as f:
        artifact = json.load(f)
    result = validate_artifact(artifact)
    assert result["valid"] is True
    assert result["deployable"] is True


def test_invalid_artifact():
    result = validate_artifact({"version": "1.2", "deployable": False})
    assert result["valid"] is False
    assert "errors" in result


def test_valid_but_not_deployable():
    with open(VALID_PATH, encoding="utf-8") as f:
        artifact = json.load(f)
    artifact["deployable"] = False
    artifact["missing_requirements"] = ["Complete all six artifacts"]
    result = validate_artifact(artifact)
    assert result["valid"] is True
    assert result["deployable"] is False
    assert "Complete all six artifacts" in result["missing_requirements"]
