import React, { InputHTMLAttributes } from "react";
import { ErrorMessage } from "@hookform/error-message";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errors: any;
  validationName: string;
  methods: any;
}

export default function index({
  methods,
  validationName,
  errors,
  ...res
}: Props) {
  return (
    <>
      <input {...res} {...methods(validationName)} />
      <ErrorMessage
        errors={errors}
        name={validationName!}
        render={({ message }) => (
          <span className="text-red-500 mt-[-10px]">{message}</span>
        )}
      />
    </>
  );
}
