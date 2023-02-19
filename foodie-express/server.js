const express = require('express');
const app = express();

app.use(express.json());  
app.use(express.static('public'));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Serve React App
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// run the exrpess app
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});