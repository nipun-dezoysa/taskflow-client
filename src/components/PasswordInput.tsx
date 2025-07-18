import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";
import { useState } from "react";
import { Input } from "@heroui/react";
let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export default function PasswordInput({
  lable,
  value,
  setState,
  validate,
  className,
}: any) {
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
      validate={(t) =>
        validate
          ? validate(t)
          : t.length > 0 && !regex.test(t)
          ? "Require minimum 8-15 characters, with at least one uppercase, lowercase, number, and special character."
          : true
      }
      endContent={
        <button
          className="focus:outline-none"
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
