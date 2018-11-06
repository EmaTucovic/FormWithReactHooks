import React, { useState, Fragment } from "react";

const useInput = ({
  fieldName,
  label,
  defaultValue,
  validationRules = [],
  isVisible = true
}) => {
  let [schemaState, setSchemaState] = useState({
    [fieldName]: { value: defaultValue, isVisible, error: "" }
  });
  let formData = {};

  formData[fieldName] = {
    render: function(additionalPorps = {}) {
      let { isVisible } = additionalPorps;

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
