
import express from "express";
const router = express.Router();

import { handleGenerateNewShortURL,handleGetAnalytics } from "../controllers/url_controller.js"


router.post("/",handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics)

export default router
