import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskStatus } from "@/types/task";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Task | null;
  onSave: (data: Omit<Task, "id_task">) => void;
}

const taskSchema = z.object({
  title: z.string("Enter a title").min(4, {
    message: "The title must be at least 4 characters long.",
  }),
  description: z.string("Enter a title").min(10, {
    message: "The title must be at least 10 characters long.",
  }),
  status: z.string().nonempty("User role is required"),
});

type TaskSchema = z.infer<typeof taskSchema>;

export function TaskModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  React.useEffect(() => {
    reset();
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("status", initialData.status);
    }
  }, [open]);

  function handleSave(payload: TaskSchema) {
    onSave({
      ...payload,
      status: payload.status as TaskStatus,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div className="space-y-4">
            {/* Title */}
            <Field data-invalid={errors.title}>
              <FieldLabel htmlFor="fieldgroup-title">Title</FieldLabel>
              <Input
                id="fieldgroup-title"
                placeholder="Title"
                {...register("title")}
              />
              <FieldError>{errors?.title?.message}</FieldError>
            </Field>

            {/* Description */}
            <Field data-invalid={errors.description}>
              <FieldLabel htmlFor="fieldgroup-description">
                Description
              </FieldLabel>
              <Textarea
                placeholder="Description"
                {...register("description")}
              />
              <FieldError>{errors?.description?.message}</FieldError>
            </Field>

            {/* Status */}
            <Field data-invalid={errors.status}>
              <FieldLabel htmlFor="fieldgroup-status">Status</FieldLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="Started">Started</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <FieldError>{errors?.status?.message}</FieldError>
            </Field>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
