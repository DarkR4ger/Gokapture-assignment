"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ResponseJsonData } from "@/global/authtype";


const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toastId = toast.loading("Account is being created...");
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      const data: ResponseJsonData = await res.json();
      if (data.success) {
        toast.success(data.message, {
          id: toastId,
        });
      } else {
        toast.error(data.message, {
          id: toastId,
        });
      }
      setIsLoading(false);
    } catch (err) {
      toast.error(err as string, {
        id: toastId,
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="container min-h-screen flex items-center justify-center">
      <Card className="lg:w-[30%] shadow-xl">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register to make your own task management
          </CardDescription>
        </CardHeader>
        <form onSubmit={onFormSubmit}>
          <CardContent className="grid items-center gap-y-4">
            <div className="grid items-center gap-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username..."
                required
              />
            </div>

            <div className="grid items-center gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email..."
                required
              />
            </div>

            <div className="grid items-center gap-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password..."
                required
              />
            </div>
          </CardContent>
          <CardFooter className="grid items-center gap-y-4">
            <p className="text-center text-sm">
              Already have an account&#63; Please{" "}
              <Link className="text-blue-600" href="/login">
                login
              </Link>
            </p>
            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <p className="flex items-center gap-x-4">
                  Sign Up{" "}
                  <span className="animate-spin inline-flex">
                    <Loader2 />
                  </span>
                </p>
              ) : (
                <p>Sign Up</p>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
