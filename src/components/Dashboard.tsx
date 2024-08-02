'use client'
import { UserData } from "@/global/dbtypes";

export default function Dashboard({data}: {data: UserData}) {
  console.log(data)
  return (
    <div>
      <div>hello</div>
    </div>
  );
}
