"use client";

import { useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";

interface Task {
  id: string;

  title: string;

  description: string;

  status: string;
}

interface Props {
  tasks: Task[];
}

export function KanbanBoard({
  tasks,
}: Props) {
  const supabase = createClient();

  const [columns, setColumns] =
    useState({
      pending: tasks.filter(
        (task) =>
          task.status === "pending"
      ),

      completed: tasks.filter(
        (task) =>
          task.status === "completed"
      ),
    });

  async function onDragEnd(
    result: DropResult
  ) {
    if (!result.destination) return;

    const sourceColumn =
      columns[
        result.source
          .droppableId as keyof typeof columns
      ];

    const destColumn =
      columns[
        result.destination
          .droppableId as keyof typeof columns
      ];

    const sourceItems = [
      ...sourceColumn,
    ];

    const destItems =
      result.source.droppableId ===
      result.destination.droppableId
        ? sourceItems
        : [...destColumn];

    const [removed] =
      sourceItems.splice(
        result.source.index,
        1
      );

    removed.status =
      result.destination.droppableId;

    destItems.splice(
      result.destination.index,
      0,
      removed
    );

    // UPDATE UI
    setColumns({
      ...columns,

      [result.source.droppableId]:
        sourceItems,

      [result.destination
        .droppableId]: destItems,
    });

    // UPDATE DATABASE
    const { error } =
      await supabase
        .from("tasks")
        .update({
          status: removed.status,
        })
        .eq("id", removed.id);

    if (error) {
      toast.error(
        "Error actualizando tarea"
      );

      return;
    }

    toast.success(
      "Estado actualizado 🚀"
    );
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(columns).map(
          ([columnId, items]) => (
            <div
              key={columnId}
              className="rounded-2xl border bg-card p-4"
            >
              <h2 className="mb-4 text-xl font-bold capitalize">
                {columnId}
              </h2>

              <Droppable
                droppableId={columnId}
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 min-h-50"
                  >
                    {items.map(
                      (task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={
                            task.id
                          }
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={
                                provided.innerRef
                              }
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="cursor-grab rounded-xl border bg-background p-4 transition-all hover:shadow-lg"
                            >
                              <h3 className="font-semibold">
                                {task.title}
                              </h3>

                              <p className="mt-2 text-sm text-muted-foreground">
                                {
                                  task.description
                                }
                              </p>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}

                    {
                      provided.placeholder
                    }
                  </div>
                )}
              </Droppable>
            </div>
          )
        )}
      </div>
    </DragDropContext>
  );
}