import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://momentum.redberryinternship.ge/api";

const yourBearerToken = "9e77b40d-621c-4675-9e4a-7d811a754ed5";
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try{
        const departmentResponse = await axios.get(API_URL + "/departments");
        const departments = departmentResponse.data;

        const prioritiesResponse = await axios.get(API_URL + "/priorities");
        const priorities = prioritiesResponse.data;

        const employeesResponse = await axios.get(API_URL + "/employees", config);
        const employees = employeesResponse.data;

        res.render("index.ejs", { departments, priorities, employees });
    }catch(error){
        console.error("Error fetching departments:", error);
        res.render("index.ejs", { departments: [], priorities: [], employees: [] });
    }
});

app.listen(port, () => {
    console.log(`Server runnig on port ${port}.`);
});