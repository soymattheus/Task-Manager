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

const statuses: TaskStatus[] = [
  "Not Started",
  "Started",
  "Completed",
  "Canceled",
];

export default function Tasks() {
  const [data, setData] = React.useState<Task[] | undefined>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task>();
  const utils = trpc.useUtils();

  const { data: tasks, isLoading } = trpc.task.getAll.useQuery();

  React.useEffect(() => {
    if (!isLoading) {
      setData(tasks);
    }
  }, [isLoading, tasks]);

  const createTask = trpc.task.create.useMutation({
    onSuccess: (newTask) => {
      utils.task.getAll.invalidate();
      utils.task.getAll.setData(undefined, (old) =>
        old ? [...old, newTask] : [newTask],
      );
      toast.success("Task created successfully.");
    },
    onError: () => {
      toast.error("Failed to create task.");
    },
  });

  const updateTask = trpc.task.update.useMutation({
    onSuccess: (task) => {
      utils.task.getAll.invalidate();
      utils.task.getAll.setData(undefined, (old) => {
        return old ? [...old, task] : [task];
      });
      toast.success("Task updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update task.");
    },
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: (deletedTask) => {
      utils.task.getAll.setData(undefined, (old) => {
        if (!old) return old;

        return old.filter((task) => task.idTask !== deletedTask.idTask);
      });
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
          idUser: 1,
        });
      } else {
        // CREATE
        await createTask.mutateAsync({
          title: data.title,
          description: data.description,
          status: data.status,
          idUser: 1,
        });
      }

      setModalOpen(false);
      setEditingTask(undefined);
    } catch {
      toast.error("Internal server error.");
    }
  }

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
                  {data &&
                    data
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
