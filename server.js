require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const CAT_API_URL = "https://api.thecatapi.com/v1";

app.get("/api/cats", async (req, res) => {
    try {
        const { breed, limit } = req.query;
        const url = `${CAT_API_URL}/images/search?limit=${limit || 10}&breed_ids=${breed || ""}`;
        const response = await axios.get(url, {
            headers: { "x-api-key": process.env.CAT_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cat images" });
    }
});

app.get("/api/breeds", async (req, res) => {
    try {
        const response = await axios.get(`${CAT_API_URL}/breeds`, {
            headers: { "x-api-key": process.env.CAT_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching breeds" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
