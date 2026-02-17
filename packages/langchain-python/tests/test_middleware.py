import json
from pathlib import Path

import pytest

from safestop_langchain.middleware import with_safestop

FIXTURES = Path(__file__).resolve().parent.parent.parent / "core" / "__tests__" / "fixtures"
VALID_PATH = FIXTURES / "valid-deployable.json"


def test_with_safestop_returns_agent_when_valid():
    agent = object()
    wrapped = with_safestop(agent, {"artifact": str(VALID_PATH)})
    assert wrapped is agent


def test_with_safestop_raises_on_invalid_path():
    with pytest.raises((ValueError, OSError, FileNotFoundError)):
        with_safestop(object(), {"artifact": "/nonexistent.json"})


def test_with_safestop_raises_when_not_deployable():
    with open(VALID_PATH, encoding="utf-8") as f:
        artifact = json.load(f)
    artifact["deployable"] = False
    artifact["missing_requirements"] = ["Incomplete"]
    with pytest.raises(ValueError, match="not deployable"):
        with_safestop(object(), {"artifact": artifact})
