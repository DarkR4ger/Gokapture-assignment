import HeaderComp from "@/components/HeaderComp";
import { getData } from "@/lib/getData";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  return (
    <main className="container">
      <HeaderComp data={data} />
      <div className="mt-5 shadow-2xl pt-5 pb-5 min-h-screen">{children}</div>
    </main>
  );
}
