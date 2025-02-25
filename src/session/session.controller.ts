
import { Context } from "hono";
import { SessionsService, getSessionservice, createSessionservice, updateSessionservice, deleteSessionservice,} from "./session.service";
import*as bcrypt from "bcrypt";
export const listSessions = async (c: Context) => {
    try {
        //limit the number of Sessions to be returned

        const limit = Number(c.req.query('limit'))

        const data = await SessionsService(limit);
        if (data == null || data.length == 0) {
            return c.text("session not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getsession = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const session = await getSessionservice(id);
    if (session == undefined) {
        return c.text("session not found", 404);
    }
    return c.json(session, 200);
}
export const createsession = async (c: Context) => {
    try {
        const session = await c.req.json();
      
        const createdsession = await createSessionservice(session);


        if (!createdsession) return c.text("session not created", 404);
        return c.json({ msg: createdsession }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatesession = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const session = await c.req.json();
    try {
        // search for the session
        const searchedsession= await getSessionservice(id);
        if (searchedsession == undefined) return c.text("session not found", 404);
        // get the data and update it
        const res = await updateSessionservice(id, session);
        // return a success message
        if (!res) return c.text("session not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletesession = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the session
        const session = await getSessionservice(id);
        if (session== undefined) return c.text("session not found", 404);
        //deleting the session
        const res = await deleteSessionservice(id);
        if (!res) return c.text("session not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 