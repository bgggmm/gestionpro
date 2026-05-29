"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  pending: number;

  completed: number;
}

export function TasksChart({
  pending,
  completed,
}: Props) {
  const data = [
    {
      name: "Pendientes",
      value: pending,
    },

    {
      name: "Completadas",
      value: completed,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#22c55e",
  ];

  return (
    <div className="h-75 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            {data.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}