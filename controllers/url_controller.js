import { nanoid } from "nanoid";
import { URL } from "../models/url_model.js"; 
import validator from "validator"; // Use `import` for "validator"


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

const DeleteUrlInfo = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  try {
    const deletedUrl = await URL.findByIdAndDelete(id);
    if (!deletedUrl) {
      return res.status(404).json({ error: "URL not found" });
    }
    const allURLs = await URL.find({});
    console.log("Deleted URL:", deletedUrl);
    // return res.status(200).json({ message: "URL deleted successfully" });
    return res.render("home", {
      urls: allURLs, // Pass the updated list of URLs
    
    });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    res.status(200).json({ totalClicks:result.visitHistory.length , analytics: result.visitHistory })
}



// Export using ES module syntax
export { handleGenerateNewShortURL , handleGetAnalytics , DeleteUrlInfo };
