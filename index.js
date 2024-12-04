import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import UrlRoute from "./routers/url_router.js";
import StaticRoute from "./routers/static_router.js"
import connectDB from "./DB/connectDB.js";
import { URL } from "./models/url_model.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))

app.use("/", StaticRoute)




app.use("/url", UrlRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
    );


    // If no entry is found, return a 404
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

       // Redirect to the original URL
       return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error handling redirect:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
