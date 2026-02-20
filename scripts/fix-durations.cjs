const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.service.updateMany({
        data: {
            duration: 30
        }
    });
    console.log(`Updated ${result.count} services to 30-minute duration.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
