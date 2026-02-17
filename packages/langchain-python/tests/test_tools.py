import json
from pathlib import Path

import pytest

from safestop_langchain.tools import SafestopValidatorTool

FIXTURES = Path(__file__).resolve().parent.parent.parent / "core" / "__tests__" / "fixtures"
VALID_PATH = str(FIXTURES / "valid-deployable.json")


def test_tool_valid_deployable():
    tool = SafestopValidatorTool()
    result = tool.invoke({"artifact_path": VALID_PATH})
    assert "Valid and deployable" in result


def test_tool_invalid_path():
    tool = SafestopValidatorTool()
    result = tool.invoke({"artifact_path": "/nonexistent/file.json"})
    assert "Error" in result or "Invalid" in result
