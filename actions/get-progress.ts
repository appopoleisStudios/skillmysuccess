import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string
): Promise<number> => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true
            }
        });

        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

        // If there are no published chapters, return 0% progress
        if (publishedChapterIds.length === 0) {
            return 0;
        }

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        });

        // Calculate progress percentage
        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

        // Ensure a valid number is returned
        return isNaN(progressPercentage) ? 0 : progressPercentage;

    } catch (error) {
        console.log("[Get_Progress]", error);
        return 0;
    }
}
