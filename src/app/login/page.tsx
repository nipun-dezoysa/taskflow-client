"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button, Input, Link } from "@heroui/react";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { loginToAccount } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function page() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await loginToAccount(values);
      useAuthStore.getState().setToken(response.token, response.user);
      resetForm();
      toast.success(response.message);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

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
        <h1 className="text-2xl font-medium text-center">
          Log in to your account
        </h1>

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

              <Button
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                color="primary"
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>

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
