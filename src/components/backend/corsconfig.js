// corsConfig.js
const cors = require('cors');

module.exports = cors({
    origin: 'http://localhost:3001'  // Replace with your frontend URL
});
