const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcfo3ly5p",
  api_key: "367429563698147",
  api_secret: "XVAhVwR-qkGRvreWmT0H_OJR56c",
});

module.exports = cloudinary;