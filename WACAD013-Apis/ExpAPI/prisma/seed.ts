import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../src/resources/userType/userType.constants";

const prisma = new PrismaClient();

async function seed() {
    await prisma.userType.createMany({
        data: [
            { label: "admin", id: UserTypes.admin },
            { label: "client", id: UserTypes.client },
        ],
        skipDuplicates: true,
    });
}

seed().then(async () => {
    console.log("Database seeded successfully.");
    await prisma.$disconnect();
}).catch(async (error) => {
    console.error("Error seeding database:", error);
    await prisma.$disconnect();   
});

/*
Populate database using package.json: npx prisma db seed
*/