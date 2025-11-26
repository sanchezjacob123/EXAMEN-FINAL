import { Router } from "express";
import {
  getAllSony,
  getSonyById,
  postSony,
  putSony,
  deleteSony
} from "../controllers/sony.controller.js";

const router = Router();

router.get("/", getAllSony);
router.get("/:id", getSonyById);
router.post("/", postSony);
router.put("/:id", putSony);
router.delete("/:id", deleteSony);

export default router;

