import { createFileRoute } from "@tanstack/react-router";

import { CasePage } from "../components/projects/CasePage";
import { financeHub } from "../lib/projects";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/projetos/finance-hub")({
  head: () =>
    pageHead({
      title: financeHub.meta.title,
      description: financeHub.meta.description,
      path: financeHub.path,
      locale: "pt-BR",
      alternates: false,
    }),
  component: () => <CasePage study={financeHub} />,
});
