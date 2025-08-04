"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { AiOutlineMenu } from "react-icons/ai";
import { useSideBarStore } from "@/store/dashStore";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const setSidebarOpen = useSideBarStore((state) => state.setSidebarOpen);
  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered>
        <NavbarContent>
          <div className="lg:hidden">
            <Button
              isIconOnly
              variant="flat"
              color="primary"
              onPress={() => setSidebarOpen(true)}
            >
              <AiOutlineMenu className="w-5 h-5" />
            </Button>
          </div>
          <NavbarBrand>
            <Link href="/" className="font-bold text-3xl text-black">
              TaskFlow
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {!user && (
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}

        {user && (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  src={`https://ui-avatars.com/api/?name=${user.fname}+${user.lname}`}
                  name={user.fname + " " + user.lname}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  href={`/dashboard/`}
                  key="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem href={`/dashboard/settings`} key="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    useAuthStore.getState().clearToken();
                    useUserStore.getState().clearUser();
                  }}
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}
      </Navbar>
    </>
  );
}

export default Header;
