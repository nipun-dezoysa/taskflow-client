import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";
import { useState } from "react";
import { Input } from "@heroui/react";
const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

interface PasswordInputProps {
  lable: string;
  value: string;
  setState: (value: string) => void;
  validate?: (value: string) => true | string;
  className?: string;
  isInvalid?: boolean;
  errorMessage?: string | undefined | boolean;
}

export default function PasswordInput({
  lable,
  value,
  setState,
  validate,
  className,
  isInvalid,
  errorMessage,
}: PasswordInputProps) {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <Input
      type={passVisible ? "text" : "password"}
      className={className ? className : ""}
      label={lable}
      isRequired
      value={value}
      onChange={(e) => setState(e.target.value)}
      validationBehavior="native"
      variant="bordered"
      validate={(t) =>
        validate
          ? validate(t)
          : t.length > 0 && !regex.test(t)
          ? "Require minimum 8-15 characters, with at least one uppercase, lowercase, number, and special character."
          : true
      }
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      endContent={
        <button
          className="focus:outline-none cursor-pointer"
          type="button"
          onClick={() => setPassVisible(!passVisible)}
          aria-label="toggle password visibility"
        >
          {passVisible ? (
            <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <HiMiniEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
  );
}
