import json
from pathlib import Path
from typing import Any, Union

from .validator import validate_artifact


def with_safestop(agent: Any, config: dict) -> Any:
    """Wrap an agent with Safestop: validate artifact at call time; raise if invalid or not deployable.

    config:
        artifact: path to JSON file or artifact dict
    """
    artifact_cfg = config.get("artifact")
    if isinstance(artifact_cfg, (str, Path)):
        with open(artifact_cfg, encoding="utf-8") as f:
            artifact = json.load(f)
    else:
        artifact = artifact_cfg

    result = validate_artifact(artifact)
    if not result["valid"]:
        errors = "; ".join(result.get("errors", ["validation failed"]))
        raise ValueError(f"Safestop artifact invalid: {errors}")
    if not result.get("deployable"):
        missing = ", ".join(result.get("missing_requirements", []))
        raise ValueError(f"Safestop artifact not deployable: {missing}")

    return agent
