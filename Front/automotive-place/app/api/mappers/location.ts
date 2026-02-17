import { TProject } from "@/app/utils/types/project";
import { ProjectWithIncludes } from "./project";

export function mapLocation(
  location: ProjectWithIncludes["location"]
): TProject["location"] | undefined {
  if (!location) return undefined;

  return {
    name: location.name || "",
    description: location.description || "",
    lat: location.lat.toNumber() || 0,
    lng: location.lng.toNumber() || 0,
  };
}
