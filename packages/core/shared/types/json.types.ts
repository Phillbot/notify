/**
 * Represents a JSON-compatible primitive value.
 */
export type JSONPrimitive = string | number | boolean | null;

/**
 * Represents any JSON-compatible value.
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

/**
 * Represents a JSON-compatible object.
 */
export type JSONObject = { [key: string]: JSONValue };

/**
 * Represents a JSON-compatible array.
 */
export type JSONArray = JSONValue[];

/**
 * Represents a parsed JSON object from a string.
 */
export type ParsedJSON<T = JSONValue> = T;

/**
 * A utility type for safely serializable objects.
 */
export type Serializable<T = unknown> = T extends
  | JSONPrimitive
  | JSONObject
  | JSONArray
  ? T
  : never;

/**
 * Helper to enforce strict JSON structure.
 */
export interface StrictJSON {
  toJSON(): JSONValue;
}
