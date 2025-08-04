import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiLock, FiArrowLeft } from "react-icons/fi";

function Unauthorized() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <FiLock className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          You don&apos;t have permission to access this page. Please contact
          your administrator if you believe this is a mistake.
        </p>
        <div className="mt-6">
          <Button
            as={Link}
            href="/login"
            className="w-full "
            color="primary"
            startContent={<FiArrowLeft className="mr-2" />}
          >
            Go Back Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
