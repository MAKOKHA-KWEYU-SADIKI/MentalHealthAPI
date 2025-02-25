 
import { Context } from "hono";
import { diagnosisService, creatediagnosisService, getdiagnosisService, updatediagnosisService, deletediagnosisService } from "./diagnostic.service";
export const listdiagnosis = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await diagnosisService(limit);
        if (data == null || data.length == 0) {
            return c.text("no diagnosi not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getDiagnosis = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await getdiagnosisService(id);
    if (book == undefined) {
        return c.text("diagnosis not found", 404);
    }
    return c.json(book, 200);
}
export const creatediagnosis = async (c: Context) => {
    try {
        const dia = await c.req.json();
        const createddia = await creatediagnosisService(dia);


        if (!createddia) return c.text("booking unsuccessful", 404);
        return c.json({ msg: createddia }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatediagnosis = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searcheddiagnosis = await getdiagnosisService(id);
        if (searcheddiagnosis == undefined) return c.text("diagnosis unavailable", 404);
        
        const res = await updatediagnosisService(id, state);
        
        if (!res) return c.text("diagnosis not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletediagnosis = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the diagnosis
        const dia = await getdiagnosisService(id);
        if (dia == undefined) return c.text("diagnosis not found", 404);
        //deleting the diagnosis
        const res = await deletediagnosisService(id);
        if (!res) return c.text("diagnosis details not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}