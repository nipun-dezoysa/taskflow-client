"use client";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user.type";
import { Avatar } from "@heroui/react";
import React from "react";

function UserDetailCard({ userDetails }: { userDetails: User }) {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={`https://ui-avatars.com/api/?name=${userDetails.fname}+${userDetails.lname}`}
        size="sm"
      />
      <div>
        <p className="font-medium text-sm">
          {userDetails.fname} {userDetails.lname}{" "}
          {user?.id === userDetails.id ? "(You)" : ""}
        </p>
        <p className="text-xs text-gray-500">{userDetails.email}</p>
      </div>
    </div>
  );
}

export default UserDetailCard;
