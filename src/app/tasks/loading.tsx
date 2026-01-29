import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function TasksSkeleton() {
  return (
    <section className="flex w-full flex-col">
      {/* Header */}
      <header className="flex w-full flex-row items-center justify-between border-b border-gray-300 p-4">
        <Skeleton className="h-8 w-8 md:hidden" />
        <Skeleton className="h-6 w-40" />
      </header>

      <main className="flex flex-col p-4">
        {/* Title + Button */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, columnIndex) => (
            <Card key={columnIndex} className="border">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
              </CardHeader>

              <div className="space-y-3 p-3">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="rounded-md border p-3 space-y-2"
                  >
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
}
