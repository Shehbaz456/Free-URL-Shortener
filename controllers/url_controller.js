import { nanoid } from "nanoid";
import { URL } from "../models/url_model.js"; 
import validator from "validator"; // Use `import` for "validator"
import { response } from "express";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  // Validate the URL
  if (!validator.isURL(body.url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const shortID = nanoid(8); // Generate a unique short ID
  
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // return res.json({ id: shortID });
  // return res.render("home",{
  //   id: shortID 
  // });

   // Fetch all URLs to pass to the view
   const allURLs = await URL.find({});

   return res.render("home", {
     urls: allURLs, // Pass the updated list of URLs
     id: shortID
   });
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    res.status(200).json({ totalClicks:result.visitHistory.length , analytics: result.visitHistory })
}



// Export using ES module syntax
export { handleGenerateNewShortURL , handleGetAnalytics };
