import AdminLayout from "@/components/admin/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
