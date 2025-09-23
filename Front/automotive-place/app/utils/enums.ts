enum ErrorStatus {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3,
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
}

export const EngineParameter = {
  TorqueNm: "NM",
  PowerPs: "PS",
  MaxRPM: "Max RPM",
} as const;

export { ErrorStatus, AccountTypes, TransmissionType, ContentType };
