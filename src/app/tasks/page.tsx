"use client";

import React from "react";
import { toast } from "sonner";

import { TaskCard } from "./cardTask";
import { TaskModal } from "./taskModal";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/types/task";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { STATUS_STYLES } from "@/config/status-config";
import { trpc } from "@/utils/trpc";
import TasksSkeleton from "./loading";

const statuses: TaskStatus[] = [
  "Not Started",
  "Started",
  "Completed",
  "Canceled",
];

export default function Tasks() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task>();

  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = trpc.task.getAll.useQuery();

  const createTask = trpc.task.create.useMutation({
    onSuccess: async () => {
      toast.success("Task created successfully.");
      await refetch();
      setModalOpen(false);
      setEditingTask(undefined);
    },
    onError: () => {
      toast.error("Failed to create task.");
    },
  });

  const updateTask = trpc.task.update.useMutation({
    onSuccess: async () => {
      toast.success("Task updated successfully.");
      await refetch();
      setModalOpen(false);
      setEditingTask(undefined);
    },
    onError: () => {
      toast.error("Failed to update task.");
    },
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  async function handleSave(data: Omit<Task, "id_task">) {
    try {
      if (editingTask) {
        // UPDATE
        await updateTask.mutateAsync({
          idTask: editingTask.idTask,
          title: data.title,
          description: data.description,
          status: data.status,
        });
      } else {
        // CREATE
        await createTask.mutateAsync({
          title: data.title,
          description: data.description,
          status: data.status,
        });
      }
    } catch {
      toast.error("Internal server error.");
    }
  }

  if (isLoading) return <TasksSkeleton />;

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
            <p className="font-semibold text-[16px]">View your task list</p>
          </header>
          <main className="flex flex-col p-4">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Tasks</h1>

              <Button onClick={() => setModalOpen(true)}>+ New Task</Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {statuses.map((status) => (
                <Card
                  key={status}
                  className={`border ${STATUS_STYLES[status].column}`}
                >
                  <CardHeader>
                    <CardTitle className="text-sm">{status}</CardTitle>
                  </CardHeader>

                  <div className="space-y-3 p-3">
                    {tasks &&
                      tasks
                        .filter((task: Task) => task.status === status)
                        .map((task: Task) => (
                          <TaskCard
                            key={task.idTask}
                            task={task}
                            onEdit={(task) => {
                              setEditingTask(task);
                              setModalOpen(true);
                            }}
                            onDelete={() =>
                              deleteTask.mutate({ idTask: task.idTask })
                            }
                          />
                        ))}
                  </div>
                </Card>
              ))}
            </div>

            <TaskModal
              open={modalOpen}
              onOpenChange={(open) => {
                setModalOpen(open);
                if (!open) setEditingTask(undefined);
              }}
              initialData={editingTask}
              onSave={handleSave}
            />
          </main>
        </section>
      </SidebarProvider>
    );
}
