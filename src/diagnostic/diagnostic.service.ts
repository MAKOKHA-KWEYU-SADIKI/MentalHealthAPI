
import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIDiagnostics,TSDiagnostics,diagnostics}from "../drizzle/schema"

export const diagnosisService = async (limit?: number): Promise<TSDiagnostics[] | null> => {
    if (limit) {
        return await db.query.diagnostics.findMany({
            limit: limit
        });
    }
    return await db.query.diagnostics.findMany();
}

export const getdiagnosisService = async (id: number): Promise<TSDiagnostics | undefined> => {
    return await db.query.diagnostics.findFirst({
        where: eq(diagnostics.id, id)
    })
}

export const creatediagnosisService = async (book: TIDiagnostics):Promise<string> => {
    await db.insert(diagnostics).values(book)
    return "diagnostic created successfully";
}

export const updatediagnosisService = async (id: number, book: TIDiagnostics)=> {
    await db.update(diagnostics).set(book).where(eq(diagnostics.id, id))
    return "diagnostic updated successfully";
}

export const deletediagnosisService = async (id: number) => {
    await db.delete(diagnostics).where(eq(diagnostics.id, id))
    return "diagnostic deleted successfully";
}