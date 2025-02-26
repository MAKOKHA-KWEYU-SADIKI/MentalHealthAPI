 
import { Context } from "hono";
import { feedbackService, createfeedbackService, getfeedbackService, UpdatefeedbackService, deletefeedbackService } from "./feedback.service";
export const listfeedback = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await feedbackService(limit);
        if (data == null || data.length == 0) {
            return c.text("no diagnosi not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getfeedback = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const feedback = await getfeedbackService(id);
    if (feedback == undefined) {
        return c.text("feedback not found", 404);
    }
    return c.json(feedback, 200);
}
export const createfeedback = async (c: Context) => {
    try {
        const dia = await c.req.json();
        const createdfeedback = await createfeedbackService(dia);


        if (!createdfeedback) return c.text("feedbacking unsuccessful", 404);
        return c.json({ msg: createdfeedback }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatefeedback = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searchedfeedback = await getfeedbackService(id);
        if (searchedfeedback == undefined) return c.text("feedback unavailable", 404);
        
        const res = await UpdatefeedbackService(id, state);
        
        if (!res) return c.text("feedback not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

// export const deletefeedback = async (c: Context) => {
//     const id = Number(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     try {
//         //search for the feedback
//         const feedback = await getfeedbackService(id);
//         if (feedback == undefined) return c.text("feedback not found", 404);
//         //deleting the feedback
//         const res = await deletefeedbackService(id);
//         if (!res) return c.text("feedback details not deleted", 404);

//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         console.log(error)
//         return c.json({ error: error?.message }, 400)

//     }
// }
export const deletefeedback = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the feedbacking
        const feedback = await getfeedbackService(id);
        if (feedback == undefined) return c.text("feedbacking not found", 404);
        //deleting the feedbacking
        const res = await deletefeedbackService(id);
        if (!res) return c.text("feedbacking not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}