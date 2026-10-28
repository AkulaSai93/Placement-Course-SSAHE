import { redirect } from "next/navigation";

/** signup lands on Payment first — blocking the seat is the next thing to do */
export default function DashboardIndex() {
  redirect("/dashboard/payment");
}
