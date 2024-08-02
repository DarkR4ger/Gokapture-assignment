"use client";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Loader2, LogOut, User } from "lucide-react";
import { logout } from "@/lib/logout";
import { UserData } from "@/global/dbtypes";

const HeaderComp = ({ data }: { data: UserData }) => {
  const router = useRouter();
  const user = data;
  const handleLogOut = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="container shadow-xl py-4 flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="text-md md:text-xl lg:text-2xl font-semibold">
            Book<span className="text-primary">My</span>ShowC
          </h1>
        </Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              className={`cursor-pointer rounded-full ring-2 ring-primary`}
            >
              {!user ? (
                <AvatarFallback>
                  <Loader2 className="animate-spin" />
                </AvatarFallback>
              ) : (
                <AvatarFallback>
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={`${user?.isAdmin ? "/admin" : "/profile"}`}
                  className="flex items-center"
                >
                  <User className="size-4 mr-2" />
                  <p>{user?.isAdmin ? "Admin" : "Profile"}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut className="size-4 mr-2 stroke-primary" />
                <span className="text-primary">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default HeaderComp;
