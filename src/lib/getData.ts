"use server";

import { UserData } from "@/global/dbtypes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getData(): Promise<UserData> {
  const headerLists = headers();
  const jsonData = headerLists.get("data");
  if (!jsonData) {
    redirect("/login");
  }
  const data: UserData = JSON.parse(jsonData);
  return data;
}
