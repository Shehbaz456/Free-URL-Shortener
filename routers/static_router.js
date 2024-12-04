import express from "express";
import { URL } from "../models/url_model.js";
const router = express.Router();

router.get("/", async(req,res)=>{
    const allURLs = await URL.find({});
    return res.render("home",{
        urls:allURLs,
    })
} )

router.get("/view",async(req,res)=>{
    const allURLs = await URL.find({});
    return res.render("getinfo",{
      urls:allURLs,
    });
  })

export default router