import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Users() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="flex flex-col w-full">
        <header className="flex flex-row w-full p-4 justify-between border-b border-gray-300">
          <SidebarTrigger className="md:hidden" />
          <p className="font-semibold text-[16px]">
            View the list of all registered users
          </p>
        </header>
        <main className="flex flex-col p-4">
          <p>Users</p>
        </main>
      </section>
    </SidebarProvider>
  );
}
