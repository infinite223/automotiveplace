import { z } from "zod";

const numberFromInput = z.preprocess((val) => {
  if (typeof val === "string") {
    const normalized = val.replace(",", ".");
    if (normalized.trim() === "") return undefined;
    return Number(normalized);
  }
  return val;
}, z.number());

export const createTagSchema = z.object({
  name: z.string().min(3).max(50).optional(),
});

export const createCarItemSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().min(1).max(500),
  itemType: z.string().min(1).max(50),
  carItemPrice: z.number().optional(),
  tags: z.array(createTagSchema),
});

export const createStageSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().min(1).max(500),
  stageNumber: z.number().min(0).max(50),
  hp: z.number().min(1).max(5000),
  nm: z.number().min(1).max(8000),
  acc_0_100: z.number().min(1).max(100).optional(),
  acc_100_200: z.number().min(1).max(150).optional(),
  acc_50_150: z.number().min(1).max(150).optional(),
  sl_150_50: z.number().min(1).max(2000).optional(),
  sl_100_0: z.number().min(1).max(2000).optional(),
  topSpeed: z.number().min(1).max(900).optional(),
  weight: z.number().min(1).max(10000).optional(),
  stagePrice: z.number().optional(),
  chartImageUrl: z.string().min(1).max(500).optional(),

  carItems: z.array(createCarItemSchema),
});

export const createStageStepSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(1).max(500),

  stageNumber: numberFromInput.pipe(z.number().min(0).max(50)),

  hp: numberFromInput.pipe(z.number().min(1).max(5000)),

  nm: numberFromInput.pipe(z.number().min(1).max(8000)),

  acc_0_100: numberFromInput.pipe(z.number().min(1).max(100)).optional(),

  acc_100_200: numberFromInput.pipe(z.number().min(1).max(150)).optional(),

  acc_50_150: numberFromInput.pipe(z.number().min(1).max(150)).optional(),

  sl_150_50: numberFromInput.pipe(z.number().min(1).max(2000)).optional(),

  sl_100_0: numberFromInput.pipe(z.number().min(1).max(2000)).optional(),

  stagePrice: numberFromInput.optional(),

  chartImage: z.instanceof(File).optional().nullable(),
  carItems: z.array(createCarItemSchema).optional(),
  createdById: z.string().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  carMake: z.string().min(2).max(50),
  carModel: z.string().min(1).max(50),
  description: z.string().min(1).max(500).optional(),
  isVisible: z.boolean().optional(),
  forSell: z.boolean().optional(),
  projectPrice: z.number().optional(),
  engineName: z.string().min(1).max(50),
  engineStockHp: z.number().min(1).max(5000),
  engineStockNm: z.number().min(1).max(8000),
  engineDescription: z.string().min(1).max(500),
  engineCapacity: numberFromInput.pipe(z.number().min(0.1).max(100)),
  engineWasSwapped: z.boolean().optional(),
  transmissionName: z.string().min(1).max(50).optional(),
  transmissionType: z.number().min(0).max(2), // type -> 0 - maual | 1 - automatic |
  transmissionGears: numberFromInput.pipe(z.number().min(1).max(20)),
  transmissionDescription: z.string().min(1).max(500).optional(),
  transmissionWasSwapped: z.boolean().optional(),
  topSpeedStock: z.number().min(1).max(500).optional(),
  weightStock: z.number().min(1).max(10000).optional(),

  carItems: z.array(createCarItemSchema),
  stages: z.array(createStageSchema),
  tags: z.array(createTagSchema),
});

export const basicDataSchema = createProjectSchema.pick({
  name: true,
  carMake: true,
  carModel: true,
  description: true,
  isVisible: true,
});

export const basicEngineAndTransmissionSchema = createProjectSchema.pick({
  engineName: true,
  engineDescription: true,
  engineCapacity: true,
  engineWasSwapped: true,

  transmissionName: true,
  transmissionType: true,
  transmissionGears: true,
  transmissionDescription: true,
  transmissionWasSwapped: true,
});

export const userRegistrationSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createPostSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  isVisible: z.boolean().optional(),
});

export const createHistoryStepSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(1).optional(),
  date: z.string().min(1),

  mileage: numberFromInput.pipe(z.number().min(0)),

  price: numberFromInput.optional(),

  isVisible: z.boolean(),

  projectId: z.string().optional(),
  companyId: z.string().nullable().optional(),
});
