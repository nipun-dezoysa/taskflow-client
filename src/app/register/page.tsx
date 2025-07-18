"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button, Input, Link } from "@heroui/react";
import React, { useState } from "react";

function page() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [btnLoandig, setBtnLoading] = useState(false);
  return (
    <section className="flex justify-center items-center">
      <div className="w-[400px] mt-16 font-poppins flex flex-col gap-3">
        <h1 className="text-2xl font-medium text-center">Get started now</h1>
        <form className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Input
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              isRequired
              label="First name"
            />
            <Input
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              isRequired
              label="Last name"
            />
          </div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            label="Email"
            type="email"
          />
          <PasswordInput
            lable="Password"
            value={password}
            setState={setPassword}
          />
          <PasswordInput
            lable="Confirm password"
            value={cpassword}
            setState={setCpassword}
            validate={(t: string) =>
              password != t ? "Password does not match" : true
            }
          />
          <Button
            isLoading={btnLoandig}
            type="submit"
            size="lg"
            color="primary"
          >
            Sign up
          </Button>
        </form>

        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Sign in now
          </Link>
        </p>
      </div>
    </section>
  );
}

export default page;
