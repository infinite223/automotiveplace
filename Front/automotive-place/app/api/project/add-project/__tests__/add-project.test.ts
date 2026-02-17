import { POST } from "../route";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { createProject } from "../createProject";
import { TBasicProject, TProjectCreate } from "@/app/utils/types/project";

jest.mock("@/lib/actions/user.actions", () => ({
  getLoggedInUser: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
    project: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../createProject", () => ({
  createProject: jest.fn(),
}));

const mockUser = { user: { $id: "user-1", name: "Test User" } };

const validProject: TProjectCreate = {
  forSell: false,
  name: "Test project",
  carMake: "BMW",
  carModel: "E46",
  description: "desc",
  carItemsCount: 0,
  imagesCount: 0,
  isVisible: true,
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

  stages: [
    {
      name: "SERIA",
      description: "Stock stage",
      stageNumber: 0,
      hp: 231,
      nm: 300,
      carItems: [],
    },
  ],

  carItems: [],
  tags: [],
};

const mockProject: TBasicProject = {
  id: "project-1",
  name: "Test project",
  carMake: "BMW",
  carModel: "E46",
  description: "desc",
  isVisible: true,
  forSell: false,
  engineStockHp: 231,
  engineStockNm: 300,
  hp: 231,
  nm: 300,
  stageNumber: 0,
  images: [],
  tags: [],
  author: { id: mockUser.user.$id, name: mockUser.user.name },
  createdAt: new Date(),
  updatedAt: new Date(),
  isVerified: true,
  likesCount: 0,
  isLikedByAuthUser: false,
  engineNameAndCapacity: "M54B30 3",
  acc_0_100: null,
  acc_100_200: null,
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

    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.message).toBe("YouMustBeLoggedInToUseThisFunctionality");
  });

  it("creates project when data is valid", async () => {
    (getLoggedInUser as jest.Mock).mockResolvedValue(mockUser);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: mockUser.user.$id,
      name: mockUser.user.name,
      garage: { id: "garage-1" },
    });

    (createProject as jest.Mock).mockResolvedValue(mockProject);

    const req = new NextRequest("http://localhost/api/project/add-project", {
      method: "POST",
      body: JSON.stringify(validProject),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.project.id).toBe("project-1");
    expect(createProject).toHaveBeenCalledWith(
      validProject,
      mockUser.user.$id,
      "garage-1"
    );
  });

  it("returns validation error for invalid project", async () => {
    (getLoggedInUser as jest.Mock).mockResolvedValue(mockUser);

    const req = new NextRequest("http://localhost/api/project/add-project", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.notification).toBeDefined();
  });
});
