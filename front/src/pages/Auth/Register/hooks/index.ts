import { FormEvent } from "react";

export function useRister() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("a");
  };
  return {
    handleSubmit,
  };
}
