import { FormEvent, useEffect } from "react";

export function useRister() {
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return {
    handleSubmit,
  };
}
