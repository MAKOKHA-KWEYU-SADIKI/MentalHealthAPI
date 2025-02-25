
import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TISession, TSSession, sessions, } from "../drizzle/schema";

export const SessionsService = async (limit?: number): Promise<TSSession[] | null> => {
    if (limit) {
        return await db.query.sessions.findMany({
            limit: limit
        });
    }
    return await db.query.sessions.findMany();
}

export const getSessionservice = async (id: number): Promise<TISession | undefined> => {
    return await db.query.sessions.findFirst({
        where: eq(sessions.id, id)
    })
}

export const createSessionservice = async (user: TISession) => {
    await db.insert(sessions).values(user)
    return "session created successfully";
}

export const updateSessionservice = async (id: number, user: TISession) => {
    await db.update(sessions).set(user).where(eq(sessions.id, id))
    return "session updated successfully";
}

export const deleteSessionservice = async (id: number) => {
    await db.delete(sessions).where(eq(sessions.id, id))
    return "session deleted successfully";
}
