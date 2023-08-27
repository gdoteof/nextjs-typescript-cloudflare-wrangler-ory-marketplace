# Schema gen

We generate schemas from their types and load them in here.

`$ npx ts-json-schema-generator --path src/types.ts --type Facility``

```sh
{
  "$ref": "#/definitions/Facility",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "Facility": {
      "additionalProperties": false,
      "properties": {
        "amenities": {
          "type": "string"
        },
        "associatedServiceProviders": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "id": {
          "type": "string"
        },
        "location": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "location",
        "amenities",
        "associatedServiceProviders"
      ],
      "type": "object"
    }
  }
}
```