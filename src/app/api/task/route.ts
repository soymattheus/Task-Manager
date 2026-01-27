import { NextResponse } from "next/server";

let tasks = [
  {
    id_task: "1",
    title: "Design Dashboard",
    description: "Create UI",
    status: "Not Started",
  },
  {
    id_task: "2",
    title: "API Tasks",
    description: "CRUD endpoints",
    status: "Started",
  },
  {
    id_task: "3",
    title: "Auth Flow",
    description: "JWT login",
    status: "Completed",
  },
  {
    id_task: "4",
    title: "Fix bugs",
    description: "UI bugs",
    status: "Canceled",
  },
  {
    id_task: "5",
    title: "Fix bugs new",
    description: "UI bugs",
    status: "Canceled",
  },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newTask = {
    id_task: Date.now().toLocaleString(),
    title: body.title,
    description: body.description,
    status: body.status,
  };

  tasks.push(newTask);

  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();

  tasks = tasks.map((task) =>
    task.id_task === body.id_task ? { ...task, ...body } : task,
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { id_task } = await request.json();

  tasks = tasks.filter((task) => task.id_task !== id_task);

  return NextResponse.json({ success: true });
}
