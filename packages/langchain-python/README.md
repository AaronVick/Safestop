# safestop-langchain

LangChain (Python) integration for Safestop: validate governance artifacts and wrap agents.

## Install

```bash
pip install safestop-langchain
```

## Usage

### Validator

```python
from safestop_langchain import validate_artifact

with open("governance.json") as f:
    artifact = json.load(f)
result = validate_artifact(artifact)
# result["valid"], result["deployable"], result.get("missing_requirements"), result.get("errors")
```

### Tool

```python
from safestop_langchain import SafestopValidatorTool

tool = SafestopValidatorTool()
output = tool.invoke({"artifact_path": "./governance.json"})
# "Valid and deployable ✓" or error message
```

### Middleware

```python
from safestop_langchain import with_safestop

agent = ...  # your LangChain agent or runnable
wrapped = with_safestop(agent, {"artifact": "./governance.json"})
# Raises if artifact invalid or not deployable; returns same agent
```
