import { FormEvent } from "react";

export const useData = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return { handleSubmit };
};
