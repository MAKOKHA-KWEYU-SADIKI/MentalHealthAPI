
import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIFeedback,TSFeedback,feedback}from "../drizzle/schema"

export const feedbackService = async (limit?: number): Promise<TSFeedback[] | null> => {
    if (limit) {
        return await db.query.feedback.findMany({
            limit: limit
        });
    }
    return await db.query.feedback.findMany();
}

export const getfeedbackService = async (id: number): Promise<TSFeedback | undefined> => {
    return await db.query.feedback.findFirst({
        where: eq(feedback.id, id)
    })
}

export const createfeedbackService = async (book: TIFeedback):Promise<string> => {
    await db.insert(feedback).values(book)
    return "feedback created successfully";
}

export const UpdatefeedbackService = async (id: number, book: TIFeedback)=> {
    await db.update(feedback).set(book).where(eq(feedback.id, id))
    return "feedback updated successfully";
}

export const deletefeedbackService = async (id: number) => {
    await db.delete(feedback).where(eq(feedback.id, id))
    return "feedback deleted successfully";
}