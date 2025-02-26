
import { Context } from "hono";
import { resourcesService, getresourceservice, createresourceservice, updateresourceservice, deleteresourceservice,} from "./rources.service";
import*as bcrypt from "bcrypt";
export const listresources = async (c: Context) => {
    try {
        //limit the number of resources to be returned

        const limit = Number(c.req.query('limit'))

        const data = await resourcesService(limit);
        if (data == null || data.length == 0) {
            return c.text("resource not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getresource = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const resource = await getresourceservice(id);
    if (resource == undefined) {
        return c.text("resource not found", 404);
    }
    return c.json(resource, 200);
}
export const createresource = async (c: Context) => {
    try {
        const resource = await c.req.json();
      
        const createdresource = await createresourceservice(resource);


        if (!createdresource) return c.text("resource not created", 404);
        return c.json({ msg: createdresource }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateresource = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const resource = await c.req.json();
    try {
        // search for the resource
        const searchedresource= await getresourceservice(id);
        if (searchedresource == undefined) return c.text("resource not found", 404);
        // get the data and update it
        const res = await updateresourceservice(id, resource);
        // return a success message
        if (!res) return c.text("resource not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteresource = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the resource
        const resource = await getresourceservice(id);
        if (resource== undefined) return c.text("resource not found", 404);
        //deleting the resource
        const res = await deleteresourceservice(id);
        if (!res) return c.text("resource not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
 
 