"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
import { User } from "@/types/user";
import React from "react";
import { toast } from "sonner";

export default function Users() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<User[]>([]);

  const handleConsult = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const statusCode = response.status;

      if (statusCode === 200) {
        toast.success("Success!");
        const data = await response.json();

        data.forEach((item: User) => {
          if (item.createdAt) {
            item.createdAt = new Date(item.createdAt);
          }
        });

        setUsers(data);
      } else {
        toast.error(response.statusText);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error("Internal server error.");
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
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {user?.fullName}
                  </TableCell>
                  <TableCell>{user?.createdAt.toLocaleDateString()}</TableCell>
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
