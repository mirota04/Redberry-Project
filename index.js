import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://momentum.redberryinternship.ge/api";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(API_URL + "/departments");
        const departments = response.data;
        res.render("index.ejs", { departments });
    }catch(error){
        console.error("Error fetching departments:", error);
        res.render("index.ejs", { departments: [] });
    }
});

app.listen(port, () => {
    console.log(`Server runnig on port ${port}.`);
});