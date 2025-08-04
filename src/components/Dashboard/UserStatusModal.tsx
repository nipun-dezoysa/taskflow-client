import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { UserProfile, UserStatus } from "@/types/user.type";
import { updateUserStatus } from "@/services/userService";
import { toast } from "react-toastify";
import {
  FiUserX,
  FiUserCheck,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

function UserStatusModal({
  isOpen,
  onOpenChange,
  selectedUser,
  onUserStatusChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedUser: UserProfile | null;
  onUserStatusChange: (user: UserProfile) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeStatus = () => {
    if (selectedUser) {
      setIsSubmitting(true);
      updateUserStatus(
        selectedUser.id,
        selectedUser.status === UserStatus.ACTIVE
          ? UserStatus.SUSPENDED
          : UserStatus.ACTIVE
      )
        .then(() => {
          onUserStatusChange({
            ...selectedUser,
            status:
              selectedUser.status === UserStatus.ACTIVE
                ? UserStatus.SUSPENDED
                : UserStatus.ACTIVE,
          });
          toast.success("User status updated successfully!");
        })
        .catch((error) => {
          toast.error("Failed to update user status.");
          console.error("Error updating user status:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
          onOpenChange(false);
        });
    }
  };

  const isSuspending = selectedUser?.status === UserStatus.ACTIVE;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Change User Status
            </ModalHeader>
            <ModalBody className="gap-4">
              {selectedUser && (
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon and Action Title */}
                  <div
                    className={`p-4 rounded-full ${
                      isSuspending ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    {isSuspending ? (
                      <FiUserX className="w-12 h-12 text-red-600" />
                    ) : (
                      <FiUserCheck className="w-12 h-12 text-green-600" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {isSuspending ? "Suspend User" : "Activate User"}
                  </h3>

                  {/* User Info */}
                  <div className="bg-gray-50 rounded-lg p-4 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        User:
                      </span>
                      <span className="text-sm text-gray-800">
                        {selectedUser.fname || selectedUser.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Email:
                      </span>
                      <span className="text-sm text-gray-800">
                        {selectedUser.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Current Status:
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          selectedUser.status === UserStatus.ACTIVE
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedUser.status === UserStatus.ACTIVE
                          ? "Active"
                          : "Suspended"}
                      </span>
                    </div>
                  </div>

                  {/* Action Description */}
                  <div
                    className={`flex items-start space-x-3 p-4 rounded-lg w-full ${
                      isSuspending
                        ? "bg-red-50 border border-red-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    {isSuspending ? (
                      <FiAlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <FiCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="text-left">
                      <p
                        className={`text-sm font-medium ${
                          isSuspending ? "text-red-800" : "text-green-800"
                        }`}
                      >
                        {isSuspending ? "Warning:" : "Confirmation:"}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          isSuspending ? "text-red-700" : "text-green-700"
                        }`}
                      >
                        {isSuspending
                          ? "This user will be suspended and will not be able to access the system until reactivated."
                          : "This user will be activated and will regain access to the system."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                color={isSuspending ? "danger" : "success"}
                onClick={changeStatus}
                isLoading={isSubmitting}
              >
                {isSubmitting
                  ? "Changing..."
                  : selectedUser?.status === UserStatus.ACTIVE
                  ? "Suspend"
                  : "Activate"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UserStatusModal;
