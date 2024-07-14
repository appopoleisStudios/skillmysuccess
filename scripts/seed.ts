const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    const categoriesToAdd = [
        { name: "Digital Marketing" },
        { name: "Programming" },
        { name: "Design" },
        { name: "Life Sciences" },
    ];

    try {
        // Fetch existing categories from the database
        const existingCategories = await database.category.findMany({
            where: {
                name: {
                    in: categoriesToAdd.map(category => category.name),
                },
            },
            select: {
                name: true,
            },
        });

        // Get the names of existing categories
        const existingCategoryNames = existingCategories.map(category => category.name);

        // Filter out categories that already exist
        const newCategories = categoriesToAdd.filter(category => !existingCategoryNames.includes(category.name));

        if (newCategories.length > 0) {
            // Add new categories to the database
            await database.category.createMany({
                data: newCategories,
            });
            console.log("Success!");
        } else {
            console.log("No new categories to add.");
        }
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();
