import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { video } = new Mux(
    process.env.MUX_TOKEN_ID,
    process.env.MUX_TOKEN_SECRET,
);

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    }
                }
            }
        });

        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        };

        for (const chapter of course.chapters) {
            if (chapter.muxData) {
                await video.assets.delete(chapter.muxData.assetId);
                console.log("Deleted Asset", chapter.muxData.assetId);
            }
        };

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            },
        });

        return NextResponse.json(deletedCourse); 

    } catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: { courseId: string }}
) {
    try {
        const { userId } = auth();
        console.log(userId);

        const { courseId } = params;
        console.log(courseId);
        
        const values  = await req.json();
        console.log(values);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}