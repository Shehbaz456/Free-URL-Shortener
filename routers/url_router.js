
import express from "express";
const router = express.Router();

import { DeleteUrlInfo, handleGenerateNewShortURL,handleGetAnalytics } from "../controllers/url_controller.js"


router.post("/",handleGenerateNewShortURL);
router.delete("/:id", DeleteUrlInfo);
router.get("/analytics/:shortId", handleGetAnalytics)

export default router
