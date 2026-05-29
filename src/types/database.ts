export type Task = {
  id: string;

  title: string;

  description: string;

  status:
    | "pending"
    | "completed";

  user_id: string;

  created_at: string;
};

export type Profile = {
  id: string;

  name: string;

  email: string;

  role: "admin" | "user";
};