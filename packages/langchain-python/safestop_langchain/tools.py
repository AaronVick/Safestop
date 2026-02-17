import json

from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field

from .validator import validate_artifact


class SafestopValidatorInput(BaseModel):
    """Input for Safestop validator tool."""

    artifact_path: str = Field(description="Path to the Safestop governance artifact JSON file")


class SafestopValidatorTool(BaseTool):
    """Validate a Safestop governance artifact for an agentic workflow."""

    name: str = "safestop_validator"
    description: str = (
        "Validate a Safestop governance artifact for an agentic workflow. "
        "Pass the file path to the artifact JSON."
    )
    args_schema: type[BaseModel] = SafestopValidatorInput

    def _run(self, artifact_path: str) -> str:
        try:
            with open(artifact_path, encoding="utf-8") as f:
                artifact = json.load(f)
        except (OSError, FileNotFoundError) as e:
            return f"Error: {e}"
        except json.JSONDecodeError as e:
            return f"Error: Invalid JSON - {e}"
        result = validate_artifact(artifact)

        if result["valid"] and result.get("deployable"):
            return "Valid and deployable ✓"
        if result["valid"]:
            missing = ", ".join(result.get("missing_requirements", []))
            return f"Valid schema, but not deployable. Missing: {missing}"
        errors = "; ".join(result.get("errors", ["unknown"]))
        return f"Invalid: {errors}"

    async def _arun(self, artifact_path: str) -> str:
        return self._run(artifact_path)
