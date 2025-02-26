
import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TIResource, TSResource, resources, } from "../drizzle/schema";

export const resourcesService = async (limit?: number): Promise<TSResource[] | null> => {
    if (limit) {
        return await db.query.resources.findMany({
            limit: limit
        });
    }
    return await db.query.resources.findMany();
}

export const getresourceservice = async (id: number): Promise<TIResource | undefined> => {
    return await db.query.resources.findFirst({
        where: eq(resources.id, id)
    })
}

export const createresourceservice = async (user: TIResource) => {
    await db.insert(resources).values(user)
    return "resource created successfully";
}

export const updateresourceservice = async (id: number, user: TIResource) => {
    await db.update(resources).set(user).where(eq(resources.id, id))
    return "resource updated successfully";
}

export const deleteresourceservice = async (id: number) => {
    await db.delete(resources).where(eq(resources.id, id))
    return "resource deleted successfully";
}
