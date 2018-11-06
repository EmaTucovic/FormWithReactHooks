import React, { useState, Fragment } from "react";

// schema { a: { }, }
const initSchemaState = schema => {
  let formState = {};

  Object.keys(schema).forEach(fieldName => {
    formState[fieldName] = {
      value: schema[fieldName].defaultValue,
      isVisible: schema[fieldName].isVisible,
      error: ""
    };
  });
  return formState;
};

const useInput = schema => {
  let [schemaState, setSchemaState] = useState(() => initSchemaState(schema));
  let formData = {};

  Object.keys(schema).forEach(key => {
    let { fieldName, label, validationRules } = schema[key];

    formData[fieldName] = {
      render: function(additionalPorps = {}) {
        let { isVisible } = additionalPorps;
        // update isVisible in state
        if (
          isVisible !== undefined &&
          isVisible !== schemaState[fieldName].isVisible
        ) {
          setSchemaState({
            ...schemaState,
            [fieldName]: { ...schemaState[fieldName], isVisible }
          });
        }

        if (
          isVisible ||
          (isVisible === undefined && schemaState[fieldName].isVisible)
        ) {
          return (
            <div>
              <div>{label}</div>
              <input
                style={{
                  background: schemaState[fieldName].error ? "red" : "white"
                }}
                value={schemaState[fieldName].value}
                onChange={ev => {
                  let value = ev.currentTarget.value;
                  let error = validateField({
                    fieldName,
                    value,
                    validationRules
                  });
                  setSchemaState({
                    ...schemaState,
                    [fieldName]: { ...schemaState[fieldName], value, error }
                  });
                }}
              />
              {schemaState[fieldName].error && (
                <div>{schemaState[fieldName].error}</div>
              )}
            </div>
          );
        }
      }
    };
  });

  return formData;
};

const validateField = function({ fieldName, value, validationRules } = {}) {
  for (let rule of validationRules) {
    let errorMessage = rule.fn(value);
    if (errorMessage) {
      return errorMessage;
    }
    return "";
  }
};

export default useInput;
