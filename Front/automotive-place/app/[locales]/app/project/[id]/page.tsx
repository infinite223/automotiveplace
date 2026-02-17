import Project from "../../@modal/(.)project/[id]/page";

export default function ProjectFullPage({
  params,
}: {
  params: Promise<{ id: string }>; // Zmiana na Promise
}) {
  return <Project params={params} />;
}
