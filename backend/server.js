const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));  


const GEMINI_API_KEY = "AIzaSyAlikm7_thgnFmsKy3o7HXKeK7OCID4Jsc";

const SYSTEM_INSTRUCTION = "You are a search engine that provides exact accurate and relevant results based on user queries. Always prioritize the most recent and trustworthy sources. and you give answer in the best minimalist way possible";


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

app.post('/api/search', async (req, res) => {
    const searchTerm = req.body.query;

    try {
        
        const geminiResult = await model.generateContent(searchTerm);
        console.log("Gemini Result:", geminiResult); 

        
        const geminiResponse = await geminiResult.response.text();

       
        res.json({
            geminiResponse: geminiResponse,
            youtubeOverview: [] 
        });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
