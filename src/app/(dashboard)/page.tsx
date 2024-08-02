import Dashboard from "@/components/Dashboard";
import { getData } from "@/lib/getData";

export default async function Home() {

  const data = await getData();

  return (
    <main className="container min-h-screen">
      <Dashboard data={data} />
    </main>
  );
}
