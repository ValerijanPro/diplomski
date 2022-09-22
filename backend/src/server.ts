import express from 'express';
const app = express();
app.post('/ddd', (req, res) => {
    console.log("Kurac");
    res.json({"message":"ok"})
});
app.listen(4000, () => console.log(`Express server running on port 4002`));