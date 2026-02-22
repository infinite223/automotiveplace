import Project from "../../@modal/(.)project/[id]/page";

export default function ProjectFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Project params={params} />;
}
