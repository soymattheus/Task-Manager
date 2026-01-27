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

export default function Tasks() {
  const [tasks, setTasks] = React.useState<Task[]>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task>();

  const statuses: TaskStatus[] = [
    "Not Started",
    "Started",
    "Completed",
    "Canceled",
  ];

  async function fetchTasks() {
    try {
      const response = await fetch("/api/task");

      if (!response.ok) {
        toast.error("Failed to fetch tasks");
      }

      const data: Task[] = await response.json();
      setTasks(data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  }

  async function handleDelete(id_task: string) {
    try {
      const response = await fetch("/api/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_task }),
      });

      if (!response.ok) {
        toast.error("Failed to delete task");
      }

      setTasks(
        (prev) => prev && prev.filter((task) => task.id_task !== id_task),
      );
    } catch {
      toast.error("Failed to delete task");
    }
  }

  async function handleSave(data: Omit<Task, "id_task">) {
    try {
      if (editingTask) {
        // UPDATE
        const response = await fetch("/api/task", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_task: editingTask.id_task,
            ...data,
          }),
        });

        if (!response.ok) {
          toast.error("Failed to update task.");
        }

        const updatedTask: Task = await response.json();

        setTasks((prev) =>
          prev
            ? prev.map((task) =>
                task.id_task === updatedTask.id_task ? updatedTask : task,
              )
            : [updatedTask],
        );
        toast.success("Task updated successfully.");
      } else {
        // CREATE
        const response = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          toast.error("Failed to create task.");
        }

        const newTask: Task = await response.json();

        setTasks((prev) => [...(prev || []), newTask]);
        toast.success("Task created successfully.");
      }

      setModalOpen(false);
      setEditingTask(undefined);
    } catch {
      toast.error("Internal server error.");
    }
  }

  React.useEffect(() => {
    fetchTasks();
  }, []);

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
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <TaskCard
                          key={task.id_task}
                          task={task}
                          onEdit={(task) => {
                            setEditingTask(task);
                            setModalOpen(true);
                          }}
                          onDelete={handleDelete}
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
