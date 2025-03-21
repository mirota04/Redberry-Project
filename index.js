import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;
const API_URL = "https://momentum.redberryinternship.ge/api";

const yourBearerToken = "9e77b40d-621c-4675-9e4a-7d811a754ed5";
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
};

const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.json());
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

        const statusesResponse = await axios.get(API_URL + "/statuses");
        const statuses = statusesResponse.data;

        const tasksResponse = await axios.get(API_URL + "/tasks", config);
        const tasks = tasksResponse.data;

        res.render("index.ejs", { departments, priorities, employees, statuses, tasks });
    }catch(error){
        console.error("Error fetching departments:", error);
        res.render("index.ejs", { departments: [], priorities: [], employees: [], statuses: [], tasks: [] });
    }
});

app.post("/employees", upload.single("avatar"), async (req, res) => {
    try {
        const employeeData = {
            name: req.body.name,
            surname: req.body.surname,
            avatar: req.body.avatar,
            department_id: req.body.department_id,
        };

        if (req.file) {
            employeeData.avatar = req.file;
        }

        const response = await axios.post(API_URL + "/employees", employeeData, config);
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).send("Failed to add employee.");
    }
});


app.listen(port, () => {
    console.log(`Server runnig on port ${port}.`);
});