import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let result;

app.get("/", async (req, res) => {
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    result = response.data;
    res.render("index.ejs");
})

app.post("/getLocation", async (req, res) => {
    try {
        var latitude = result.latitude;
        var longitude = result.longitude;
        const finalResponse = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);
        result = finalResponse.data;
        console.log(result);
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error(`Error Occurs: ${error}`);
    }
})


app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}...`);
})