import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string },
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }
    return ( 
        <div>
            ChapterIdPage
        </div>
     );
}
 
export default ChapterIdPage;