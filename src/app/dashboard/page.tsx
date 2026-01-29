"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import UserDataPieChart from "./pieChart";
import UserDataRadarChart from "./radarChart";
import { StatusCard } from "@/components/status-card";
import { User } from "@/types/user";
import React from "react";
import { toast } from "sonner";

import { trpc } from "@/utils/trpc";
import DashboardSkeleton from "./loading";

export default function Dashboard() {
  const { data, isLoading, isSuccess, isError } =
    trpc.user.getProfile.useQuery();

  if (isLoading)
    return (
      <SidebarProvider>
        <AppSidebar />
        <DashboardSkeleton />
      </SidebarProvider>
    );

  if (isError)
    return (
      <SidebarProvider>
        <AppSidebar />
        <section className="flex justify-center items-center mx-auto my-auto"></section>
      </SidebarProvider>
    );

  if (isSuccess)
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
              Hello, <span className="font-bold">{data?.fullName}</span>
            </h1>
            <p>
              Here are some of your numbers in the <span>Task Manager</span>{" "}
              platform
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {data?.tasks &&
                data?.tasks.map((task) => (
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
                <UserDataPieChart data={data?.tasks || []} />
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
                <h3 className="mb-3 text-sm font-medium text-gray-600">
                  User Performance
                </h3>
                <UserDataRadarChart data={data?.tasks || []} />
              </div>
            </div>
          </main>
        </section>
      </SidebarProvider>
    );
}
