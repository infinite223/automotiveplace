enum Status {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
  Success = "Success",
  Information = "Information",
}

enum AccountTypes {
  Admin = "admin",
  Premium = "premium",
  Company = "company",
}

enum TransmissionType {
  Maual = 0,
  Automat = 1,
}

enum ContentType {
  Project = "Project",
  Problem = "Problem",
  Spot = "Spot",
  Post = "Post",
  Event = "Event",
  Trip = "Trip",
}

export const EngineParameter = {
  TorqueNm: "NM",
  PowerPs: "PS",
  MaxRPM: "Max RPM",
} as const;

export { Status, AccountTypes, TransmissionType, ContentType };
