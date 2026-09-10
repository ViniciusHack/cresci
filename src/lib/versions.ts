export type VersionId = "editorial" | "studio" | "noir" | "brutal";

export const versions: Array<{
  id: VersionId;
  href: string;
}> = [
  { id: "studio", href: "/" },
  { id: "editorial", href: "/v/editorial" },
  { id: "noir", href: "/v/noir" },
  { id: "brutal", href: "/v/brutal" },
];
