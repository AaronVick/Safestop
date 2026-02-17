import Ajv, { ErrorObject } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import schema from "../schema/v1.2.json";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema as object);

export interface ValidationResult {
  valid: boolean;
  errors?: ErrorObject[] | null;
  deployable?: boolean;
  missingRequirements?: string[];
}

export function validateArtifact(artifact: unknown): ValidationResult {
  const valid = validate(artifact) as boolean;
  const obj = artifact as { deployable?: boolean; missing_requirements?: string[] };

  return {
    valid,
    errors: validate.errors ?? undefined,
    deployable: obj?.deployable,
    missingRequirements: obj?.missing_requirements,
  };
}
