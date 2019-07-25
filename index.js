const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsController = require('./controllers/blogs');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsController);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
