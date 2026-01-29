"use client";

import React from "react";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import UsersTableSkeleton from "./loding";

export default function Users() {
  const { data: users, isLoading, isSuccess } = trpc.user.getAll.useQuery();

  if (isLoading)
    return (
      <SidebarProvider>
        <AppSidebar />
        <UsersTableSkeleton />
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
              View the list of all registered users
            </p>
          </header>
          <main className="flex flex-col p-4">
            <Table>
              <TableCaption>The list of users.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {user?.fullName}
                      </TableCell>
                      <TableCell>
                        {user?.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user?.status === "A" ? "Active" : "Inactive"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </main>
        </section>
      </SidebarProvider>
    );
}
