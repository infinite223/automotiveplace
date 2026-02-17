import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

async function main() {
  await prisma.like.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.stage.deleteMany({});
  await prisma.pickedProjectOnEventOrSpot.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.spot.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.carItem.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.garage.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.userActivity.deleteMany({});
  await prisma.user.deleteMany({});

  // Create a user
  const user = await prisma.user.create({
    data: {
      id: "66df5830003491f4e7c4",
      email: "test@example.com",
      name: "User one",
      password: "password",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "user2",
      email: "test2@example.com",
      name: "User two",
      password: "password",
    },
  });

  // Create garages
  const garage1 = await prisma.garage.create({
    data: {
      id: "garage2",
      name: "Garage One",
      authorId: "66df5830003491f4e7c4",
      description: "Description1",
    },
  });

  // Create some tags
  const tag1 = await prisma.tag.create({
    data: { name: "Tag1", authorId: "user2" },
  });
  const tag2 = await prisma.tag.create({
    data: { name: "Tag2", authorId: "user2" },
  });
  const tag3 = await prisma.tag.create({
    data: { name: "Tag3", authorId: "user2" },
  });

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      id: "project1",
      name: "Project One",
      carMake: "Make1",
      carModel: "Model1",
      isVerified: true,
      isVisible: true,
      imagesUrl: "http://example.com/image1.jpg",
      carItemsCount: 0,
      imagesCount: 1,
      forSell: false,
      projectPrice: new Decimal(10000),
      engineName: "Engine1",
      engineStockHp: 200,
      engineStockNm: 300,
      engineCapacity: new Decimal(2.0),
      transmissionName: "Transmission1",
      transmissionGears: 6,
      authorId: "66df5830003491f4e7c4",
      transmissionType: 1,
      garageId: "garage2",
      tags: { connect: { id: tag1.id } },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      id: "project2",
      name: "Project Two",
      carMake: "Make2",
      carModel: "Model2",
      isVerified: true,
      isVisible: true,
      imagesUrl: "http://example.com/image2.jpg",
      carItemsCount: 0,
      imagesCount: 1,
      forSell: false,
      projectPrice: new Decimal(20000),
      engineName: "Engine2",
      engineStockHp: 250,
      engineStockNm: 350,
      engineCapacity: new Decimal(2.5),
      transmissionName: "Transmission2",
      transmissionGears: 6,
      authorId: "user2",
      transmissionType: 1,
      garageId: "garage2",
      tags: { connect: { id: tag2.id } },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      id: "project3",
      name: "Project Three",
      carMake: "Make3",
      carModel: "Model3",
      isVerified: true,
      isVisible: true,
      imagesUrl: "http://example.com/image3.jpg",
      carItemsCount: 0,
      imagesCount: 1,
      forSell: false,
      projectPrice: new Decimal(30000),
      engineName: "Engine3",
      engineStockHp: 300,
      engineStockNm: 400,
      engineCapacity: new Decimal(3.0),
      transmissionName: "Transmission3",
      transmissionGears: 6,
      authorId: "user2",
      transmissionType: 0,
      garageId: "garage2",
      tags: { connect: { id: tag3.id } },
    },
  });

  const media1 = await prisma.media.create({
    data: {
      fileLocation:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68Gy62kKm-z60Pe_y32-kfkuaEmprwzvfKXfM_zhLiiC4ulIna5DlScrbubsjMtfzA9w&usqp=CAU",
      fileName: "test image",
      projectId: "project1",
    },
  });

  const media2 = await prisma.media.create({
    data: {
      fileLocation:
        "https://cloud.appwrite.io/v1/storage/buckets/671a638d00369a634162/files/67a12ab00028f1f22d8e/view?project=66b72b780006144f8424&mode=admin",
      fileName: "test image",
      projectId: "project2",
    },
  });

  const media3 = await prisma.media.create({
    data: {
      fileLocation:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAForxurppxANqMjH2I1CjPPg79vtTEN71FQ&s",
      fileName: "test image",
      projectId: "project3",
    },
  });

  // // Create posts
  const post1 = await prisma.post.create({
    data: {
      id: "post1",
      content: "This is the first post",
      authorId: "user2",
      title: "Post 1",
      tags: { connect: { id: tag2.id } },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      id: "post2",
      content: "This is the second post",
      authorId: "user2",
      title: "Post 2",
      tags: { connect: { id: tag2.id } },
    },
  });

  const post3 = await prisma.post.create({
    data: {
      id: "post3",
      content: "This is the third post",
      authorId: "66df5830003491f4e7c4",
      title: "Post 3",
      tags: { connect: { id: tag2.id } },
    },
  });

  const post4 = await prisma.post.create({
    data: {
      id: "post4",
      content: "This is the fourth post",
      authorId: "user2",
      title: "Post 4",
      tags: { connect: { id: tag2.id } },
    },
  });

  const contentPost1 = await prisma.content.create({
    data: {
      postId: post1.id,
      isVerified: true,
    },
  });

  const contentPost2 = await prisma.content.create({
    data: {
      postId: post2.id,
      isVerified: true,
    },
  });

  const contentPost3 = await prisma.content.create({
    data: {
      postId: post3.id,
      isVerified: true,
    },
  });

  // Tworzymy Content dla Projektów
  const contentProject1 = await prisma.content.create({
    data: {
      projectId: project1.id,
      isVerified: true,
    },
  });

  const contentProject2 = await prisma.content.create({
    data: {
      projectId: project2.id,
      isVerified: true,
    },
  });

  await prisma.userContent.create({
    data: {
      userId: "66df5830003491f4e7c4",
      contentId: contentPost1.id,
      prio: 5,
    },
  });

  await prisma.userContent.create({
    data: {
      userId: "66df5830003491f4e7c4",
      contentId: contentPost2.id,
      prio: 4,
    },
  });

  await prisma.userContent.create({
    data: {
      userId: "66df5830003491f4e7c4",
      contentId: contentPost3.id,
      prio: 2,
    },
  });

  await prisma.userContent.create({
    data: {
      userId: "66df5830003491f4e7c4",
      contentId: contentProject1.id,
      prio: 1,
    },
  });

  await prisma.userContent.create({
    data: {
      userId: "66df5830003491f4e7c4",
      contentId: contentProject2.id,
      prio: 0,
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
