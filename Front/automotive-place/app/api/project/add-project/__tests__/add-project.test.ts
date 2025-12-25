jest.mock("@/lib/actions/user.actions", () => ({
  getLoggedInUser: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findFirst: jest.fn(),
    },
    project: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../createProject", () => ({
  createProject: jest.fn(),
}));

jest.mock("../../../helpers", () => ({
  createContentForUser: jest.fn(),
}));

import { POST } from "../route";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { createProject } from "../createProject";
import { TProjectCreate } from "@/app/utils/types/project";

const mockUser = { id: "user-1" };

const validProject: TProjectCreate = {
  forSell: false,
  name: "Test project",

  carMake: "BMW",
  carModel: "E46",
  description: "desc",

  carItemsCount: 0,
  imagesCount: 0,

  isVisible: true,
  garageId: "garage-1",
  projectPrice: 10000,

  engineName: "M54B30",
  engineStockHp: 231,
  engineStockNm: 300,
  engineDescription: "Stock engine",
  engineCapacity: 3,
  engineWasSwapped: false,

  transmissionName: "Manual",
  transmissionGears: 6,
  transmissionDescription: "Manual gearbox",
  transmissionWasSwapped: false,
  transmissionType: 0,

  stages: [],
  carItems: [],
  tags: [],
};

describe("POST /api/project/add-project", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 404 if user not logged in", async () => {
    (getLoggedInUser as jest.Mock).mockResolvedValue(null);

    const req = new NextRequest("http://localhost/api/project/add-project", {
      method: "POST",
      body: JSON.stringify(validProject),
    });

    const res = await POST(req);

    expect(res).toBeDefined();
    expect(res.status).toBe(404);

    const json = await res.json();
    expect(json.message).toBe("YouMustBeLoggedInToUseThisFunctionality");
  });

  it("creates project when data is valid", async () => {
    (getLoggedInUser as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    (createProject as jest.Mock).mockResolvedValue({
      id: "project-1",
      name: "Test project",
    });

    const req = new NextRequest("http://localhost/api/project/add-project", {
      method: "POST",
      body: JSON.stringify(validProject),
    });

    const res = await POST(req);
    const json = await res.json();
    console.log("JSON:", json);

    expect(res.status).toBe(200);
    expect(json.project.id).toBe("project-1");
    expect(createProject).toHaveBeenCalledWith(validProject, mockUser.id);
  });

  it("returns validation error for invalid project", async () => {
    (getLoggedInUser as jest.Mock).mockResolvedValue(mockUser);

    const req = new NextRequest("http://localhost/api/project/add-project", {
      method: "POST",
      body: JSON.stringify({}), // invalid
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.notification).toBeDefined();
  });
});
