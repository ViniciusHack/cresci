import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/v/studio")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
