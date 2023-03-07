import { useState } from "react";

const useForm = ({ fields, onSubmit }) => {
  const [formFields, setFormFields] = useState(fields);

  const [errors, setErrors] = useState(
    fields.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {})
  );

  const onChange = (event) => {
    const { name, value } = event.target;
  };

  return {
    errors,
    onChange,
    onSubmit: (event) => {
      event.preventDefault();
      onSubmit(event);
    },
    onReset: (event) => {
      event.preventDefault();
      formFields.forEach((field) => {
        field.setValue("");
      });
    },
  };
};

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
    setValue,
  };
};

export { useField, useForm };
