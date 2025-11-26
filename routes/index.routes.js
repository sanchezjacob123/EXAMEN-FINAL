import { Router } from "express";
import sonyRoutes from "./sony.routes.js";

const indexRoutes = Router();

indexRoutes.use("/sony", sonyRoutes);

export default indexRoutes;



