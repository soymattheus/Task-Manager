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

import UserSkeleton from "./loding";

export default function Users() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
  } = trpc.user.getAll.useQuery();

  if (isLoading) return <UserSkeleton />;

  if (isError)
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
          <main className="flex flex-col w-fit justify-center items-center my-auto mx-auto bg-red-500 p-4 rounded">
            <h1 className="mx-auto font-extrabold text-4xl">
              An error has occurred
            </h1>
          </main>
        </section>
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
                  <TableHead>E-mail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {user?.name}
                      </TableCell>
                      <TableCell>
                        {user?.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{user?.email}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </main>
        </section>
      </SidebarProvider>
    );
}
