const multer = require("multer");

// Configure multer to use memory storage. 
// express data sirf json format me read krta hai where as images binary form me rehte h (BLOB), multer helps in managing these data
const storage = multer.memoryStorage();

const upload = multer({
    storage
});

module.exports = upload;
