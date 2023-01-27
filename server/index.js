const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());


const posts = require('./routes/api/post');

app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 4567;

app.listen(port, () => console.log(`Server started on port ${port}`));
