"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import UserDataPieChart from "./pieChart";
import UserDataRadarChart from "./radarChart";
import { StatusCard } from "@/components/status-card";
import { User } from "@/types/user";
import React from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [isLoadind, setIsLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | undefined>();

  const handleConsult = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const statusCode = response.status;

      if (statusCode === 200) {
        toast.success("Success!");
        const data = await response.json();

        if (data.createdAt) {
          data.createdAt = new Date(data.createdAt);
        }

        setUser(data);
      } else {
        toast.error(response.statusText);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error("Internal server error");
    }
  };

  React.useEffect(() => {
    handleConsult();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="flex flex-col w-full">
        <header className="flex flex-row w-full p-4 justify-between border-b border-gray-300">
          <SidebarTrigger className="md:hidden" />
          <p className="font-semibold text-[16px]">
            Visualize your data in an organized way
          </p>
        </header>
        <main className="flex flex-col p-4 gap-3">
          <h1 className="text-[16px]">
            Hello, <span className="font-bold">{user?.fullName}</span>
          </h1>
          <p>
            Here are some of your numbers in the <span>Task Manager</span>{" "}
            platform
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {user?.tasks &&
              user?.tasks.map((task) => (
                <StatusCard
                  key={task.label}
                  label={task.label}
                  value={task.value}
                />
              ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <h3 className="mb-3 text-sm font-medium text-gray-600">
                Tasks by Status
              </h3>
              <UserDataPieChart data={user?.tasks || []} />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <h3 className="mb-3 text-sm font-medium text-gray-600">
                User Performance
              </h3>
              <UserDataRadarChart data={user?.tasks || []} />
            </div>
          </div>
        </main>
      </section>
    </SidebarProvider>
  );
}
