import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // TODO - zaaktualizować dane do większej ilości
  // const user = await prisma.user.create({
  //   data: {
  //     email: "user@example.com",
  //     name: "John Doe",
  //   },
  // });

  // console.log("Created user:", user);

  // // Tworzenie garażu
  // const garage = await prisma.garage.create({
  //   data: {
  //     name: "My Garage",
  //     description: "desc",
  //     authorId: user.id,
  //   },
  // });

  // console.log("Created garage:", garage);

  // // Tworzenie projektu
  // const project = await prisma.project.create({
  //   data: {
  //     carMake: "BMW",
  //     carModel: "M3",
  //     authorId: user.id,
  //     forSell: false,
  //     imagesCount: 0,
  //     carItemsCount: 1,
  //     imagesUrl: "",
  //     isVerified: false,
  //     isVisible: true,
  //     likesCount: 12,
  //     stagesCount: 3,
  //     garageId: garage.id,
  //     engineName: "",
  //     engineStockHp: 0,
  //     engineStockNm: 0,
  //     transmissionGears: 5,
  //     transmissionName: "",
  //   },
  // });

  // console.log("Created project:", project);

  // // Tworzenie przedmiotu samochodowego
  // const carItem = await prisma.carItem.create({
  //   data: {
  //     name: "My Car Item",
  //     projectId: project.id,
  //     authorId: user.id,
  //     description: "desc",
  //     likesCount: 0,
  //     forSell: false,
  //     inUse: false,
  //     isVisible: true,
  //     itemType: "Turbo",
  //   },
  // });

  // console.log(garage, project, user, carItem);

  // return NextResponse.json(user);
  return NextResponse.json({});
}
