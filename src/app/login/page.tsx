"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button, Input, Link } from "@heroui/react";
import React, { useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoandig, setBtnLoading] = useState(false);
  return (
    <section className="flex justify-center items-center">
      <div className="w-[400px] mt-16 font-poppins flex flex-col gap-3">
        <h1 className="text-2xl font-medium text-center">
          Log in to your account
        </h1>
        <form className="flex flex-col gap-3">
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
          <Button
            isLoading={btnLoandig}
            type="submit"
            size="lg"
            color="primary"
          >
            Log in
          </Button>
        </form>

        <p className="text-center text-xs">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Sign up now
          </Link>
        </p>
      </div>
    </section>
  );
}

export default page;
