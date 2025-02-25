import{Hono} from "hono"
import { Context } from "hono";
import { listdiagnosis,getDiagnosis,deletediagnosis,creatediagnosis,updatediagnosis } from "../diagnostic/diagnostic.controller";
import { adminRoleAuth,userRoleAuth,docctorRoleAuth } from "../middleware/bearAuth";
import { zValidator } from "@hono/zod-validator";
import { diagonosisSchema } from "./zvalidator";
export const diagnosisRouter = new Hono();
diagnosisRouter.get("/diagnosis",listdiagnosis);
diagnosisRouter.get("/diagnosis/:id", getDiagnosis)

diagnosisRouter.post("/diagnosis", zValidator('json', diagonosisSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), creatediagnosis)
diagnosisRouter.put("/diagnosis/:id", updatediagnosis)
diagnosisRouter.delete("/diagnosis/:id", deletediagnosis)