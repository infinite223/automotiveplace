import Project from "../../@modal/(.)project/[id]/page";

export default function ProjectFullPage({
  params,
}: {
  params: { id: string };
}) {
  return <Project params={params} />;
}
