import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="flex w-full flex-col">
        {/* Header */}
        <header className="flex flex-row w-full p-4 justify-between border-b border-gray-300">
          <SidebarTrigger className="md:hidden" />
          <p className="font-semibold text-[16px]">
            Visualize your data in an organized way
          </p>
        </header>

        {/* Main */}
        <main className="flex flex-col gap-4 p-4">
          {/* Greeting */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full rounded-xl" />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Pie Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <Skeleton className="mb-4 h-4 w-40" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>

            {/* Radar Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <Skeleton className="mb-4 h-4 w-40" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </main>
      </section>
    </SidebarProvider>
  );
}
