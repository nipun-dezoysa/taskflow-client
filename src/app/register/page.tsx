"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button, Input, Link } from "@heroui/react";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { registerAccount } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toastConfig } from "@/utils/toastConfig";
import { toast } from "react-toastify";

interface FormValues {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cpassword: string;
}

const validationSchema = Yup.object({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function Page() {
  const initialValues: FormValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await registerAccount({
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
      });

      console.log("Registration successful:", response);
      resetForm();
      toast.success(response.message, toastConfig);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setFieldError("email", error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-[400px] mt-16 font-poppins flex flex-col gap-3">
        <h1 className="text-2xl font-medium text-center">Get started now</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Input
                  name="fname"
                  value={values.fname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isRequired
                  variant="bordered"
                  label="First name"
                  isInvalid={touched.fname && !!errors.fname}
                  errorMessage={touched.fname && errors.fname}
                />
                <Input
                  name="lname"
                  value={values.lname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isRequired
                  variant="bordered"
                  label="Last name"
                  isInvalid={touched.lname && !!errors.lname}
                  errorMessage={touched.lname && errors.lname}
                />
              </div>

              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
                variant="bordered"
                label="Email"
                type="email"
                isInvalid={touched.email && !!errors.email}
                errorMessage={touched.email && errors.email}
              />

              <PasswordInput
                lable="Password"
                value={values.password}
                setState={(value: string) => setFieldValue("password", value)}
                isInvalid={touched.password && !!errors.password}
                errorMessage={touched.password && errors.password}
              />

              <PasswordInput
                lable="Confirm password"
                value={values.cpassword}
                setState={(value: string) => setFieldValue("cpassword", value)}
                validate={(t: string) =>
                  values.password !== t ? "Password does not match" : true
                }
                isInvalid={touched.cpassword && !!errors.cpassword}
                errorMessage={touched.cpassword && errors.cpassword}
              />

              <Button
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                color="primary"
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>

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

export default Page;
