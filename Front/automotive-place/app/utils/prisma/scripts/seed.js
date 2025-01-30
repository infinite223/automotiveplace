import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  // const user = await prisma.user.create({
  //   data: {
  //     id: "user2",
  //     email: "user2@example.com",
  //     name: "User two",
  //     password: "password",
  //   },
  // });

  // Create garages
  // const garage1 = await prisma.garage.create({
  //   data: {
  //     id: "garage2",
  //     name: "Garage One",
  //     authorId: "user2",
  //     description: "Description1",
  //   },
  // });

  // Create some tags
  // const tag1 = await prisma.tag.create({
  //   data: { name: "Tag1", authorId: "user2" },
  // });
  // const tag2 = await prisma.tag.create({
  //   data: { name: "Tag2", authorId: "user2" },
  // });
  // const tag3 = await prisma.tag.create({
  //   data: { name: "Tag3", authorId: "user2" },
  // });

  // Create projects
  // const project1 = await prisma.project.create({
  //   data: {
  //     id: "project1",
  //     name: "Project One",
  //     carMake: "Make1",
  //     carModel: "Model1",
  //     isVerified: true,
  //     isVisible: true,
  //     imagesUrl: "http://example.com/image1.jpg",
  //     carItemsCount: 0,
  //     imagesCount: 1,
  //     forSell: false,
  //     projectPrice: new Decimal(10000),
  //     engineName: "Engine1",
  //     engineStockHp: 200,
  //     engineStockNm: 300,
  //     engineCapacity: new Decimal(2.0),
  //     transmissionName: "Transmission1",
  //     transmissionGears: 6,
  //     authorId: "user2",
  //     transmissionType: 1,
  //     garageId: "garage1",
  //   },
  // });

  // const project2 = await prisma.project.create({
  //   data: {
  //     id: "project2",
  //     name: "Project Two",
  //     carMake: "Make2",
  //     carModel: "Model2",
  //     isVerified: true,
  //     isVisible: true,
  //     imagesUrl: "http://example.com/image2.jpg",
  //     carItemsCount: 0,
  //     imagesCount: 1,
  //     forSell: false,
  //     projectPrice: new Decimal(20000),
  //     engineName: "Engine2",
  //     engineStockHp: 250,
  //     engineStockNm: 350,
  //     engineCapacity: new Decimal(2.5),
  //     transmissionName: "Transmission2",
  //     transmissionGears: 6,
  //     authorId: "user2",
  //     transmissionType: 1,
  //     garageId: "garage1",
  //   },
  // });

  // const project3 = await prisma.project.create({
  //   data: {
  //     id: "project3",
  //     name: "Project Three",
  //     carMake: "Make3",
  //     carModel: "Model3",
  //     isVerified: true,
  //     isVisible: true,
  //     imagesUrl: "http://example.com/image3.jpg",
  //     carItemsCount: 0,
  //     imagesCount: 1,
  //     forSell: false,
  //     projectPrice: new Decimal(30000),
  //     engineName: "Engine3",
  //     engineStockHp: 300,
  //     engineStockNm: 400,
  //     engineCapacity: new Decimal(3.0),
  //     transmissionName: "Transmission3",
  //     transmissionGears: 6,
  //     authorId: "user2",
  //     transmissionType: 0,
  //     garageId: "garage1",
  //   },
  // });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      id: "post1",
      content: "This is the first post",
      authorId: "user2",
      title: "Post 1",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      id: "post2",
      content: "This is the second post",
      authorId: "user2",
      title: "Post 2",
    },
  });

  const post3 = await prisma.post.create({
    data: {
      id: "post3",
      content: "This is the third post",
      authorId: "user2",
      title: "Post 3",
    },
  });

  const post4 = await prisma.post.create({
    data: {
      id: "post4",
      content: "This is the fourth post",
      authorId: "user2",
      title: "Post 4",
    },
  });

  console.log("Sample data has been added to the database");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
