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
      {children}
    </main>
  );
}
