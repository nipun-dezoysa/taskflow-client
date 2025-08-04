"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Avatar,
  Switch,
} from "@heroui/react";
import { FiUser, FiMail, FiSave, FiEdit2 } from "react-icons/fi";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-toastify";
import { updateUser } from "@/services/userService";

function SettingsPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<{
    fname: string;
    lname: string;
    email: string;
  }>({
    fname: user?.fname || "",
    lname: user?.lname || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      updateUser(form)
        .then((res) => {
          setUser({ id: user.id, ...form, role: user.role });
          setEditMode(false);
          toast.success("Profile updated!");
        })
        .catch((err) => {
          toast.error("Something went wrong while updating your profile.");
        });
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-semibold text-2xl mb-2 text-gray-900">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your account information</p>

      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FiUser className="inline-block" /> Profile
        </h2>
        <div className="border-b border-gray-200 mb-4" />
        <Card className="shadow-none">
          <CardHeader className="flex items-center gap-4 bg-gray-50">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${form.fname}+${form.lname}`}
              size="lg"
              className="ring-2 ring-primary-500"
            />
            <div>
              <div className="font-semibold text-xl text-gray-900">
                {user?.fname} {user?.lname}
              </div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    First Name
                  </label>
                  <Input
                    name="fname"
                    value={form.fname}
                    onChange={handleChange}
                    startContent={<FiUser />}
                    disabled={!editMode}
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Last Name
                  </label>
                  <Input
                    name="lname"
                    value={form.lname}
                    onChange={handleChange}
                    startContent={<FiUser />}
                    disabled={!editMode}
                    variant="bordered"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  startContent={<FiMail />}
                  disabled
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div className="flex gap-3 mt-6">
                {editMode ? (
                  <>
                    <Button
                      color="primary"
                      startContent={<FiSave />}
                      onClick={handleSave}
                      type="button"
                      className="min-w-[120px]"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => {
                        setEditMode(false);
                        setForm({
                          fname: user?.fname || "",
                          lname: user?.lname || "",
                          email: user?.email || "",
                        });
                      }}
                      className="min-w-[100px]"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    color="secondary"
                    startContent={<FiEdit2 />}
                    onClick={() => setEditMode(true)}
                    type="button"
                    className="min-w-[120px]"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      {/* Notification Section */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FiMail className="inline-block" /> Notifications
        </h2>
        <div className="border-b border-gray-200 mb-4" />
        <Card className="shadow-none">
          <CardBody>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Email Notifications
                </div>
                <div className="text-sm text-gray-600">
                  Receive important updates and activity alerts via email.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="emailNotifications"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable
                </label>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Delete Profile Section */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FiUser className="inline-block" /> Delete Profile
        </h2>
        <div className="border-b border-gray-200 mb-4" />
        <Card className="bg-red-50 border border-red-200">
          <CardBody>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-semibold text-red-700 mb-1">
                  Danger Zone
                </div>
                <div className="text-sm text-red-600">
                  Deleting your profile is irreversible. All your data will be
                  permanently removed.
                </div>
              </div>
              <Button
                color="danger"
                variant="solid"
                className="min-w-[140px]"
                // TODO: Replace with actual delete handler
                onClick={() => {
                  // Implement delete logic here
                  toast.error("Profile deletion is not implemented.");
                }}
              >
                Delete Profile
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SettingsPage;
