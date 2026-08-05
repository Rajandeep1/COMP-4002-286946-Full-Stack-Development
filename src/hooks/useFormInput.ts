// useFormInput — custom hook that manages the value and validation messages
// for a single form input.
//
// Responsibilities (this hook only):
//   - Hold the current string value of one input
//   - Hold any validation message strings for that input
//   - Expose a validate() method that accepts a callback, runs it against
//     the current value, stores resulting messages, and returns them
//
// This hook does NOT know what valid/invalid means — that logic belongs
// to the caller (the form or the service).

import { useState } from 'react';

export interface FormInputState {
  value: string;
  messages: string[];
  setValue: (value: string) => void;
  validate: (callback: (value: string) => string[]) => string[];
  clearMessages: () => void;
}

const useFormInput = (initialValue: string = ''): FormInputState => {
  const [value, setValue] = useState<string>(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  // Runs the provided validation callback against the current value.
  // Stores the returned messages in state and returns them to the caller.
  const validate = (callback: (value: string) => string[]): string[] => {
    const result = callback(value);
    setMessages(result);
    return result;
  };

  const clearMessages = (): void => {
    setMessages([]);
  };

  return { value, messages, setValue, validate, clearMessages };
};

export default useFormInput;
