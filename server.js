const express = require("express");
const axios = require("axios");

const app = express();

app.get("/api/cats", async (req, res) => {
    try {
        const { breed, limit } = req.query;
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}`, {
            headers: { "x-api-key": process.env.CAT_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cat images" });
    }
});

module.exports = app;
