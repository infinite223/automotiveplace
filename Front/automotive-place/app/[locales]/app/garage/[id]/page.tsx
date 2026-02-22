import Garage from "../../@modal/(.)garage/[id]/page";

export default function GarageFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Garage params={params} />;
}
