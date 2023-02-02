/* upload image in cloudinary */

const { cloudConfig } = require("../config/config");

const cloudinary = require("cloudinary").v2;

// Imports config
cloudinary.config(cloudConfig);

// Upload image to cloudinary
const uploadImage = async (file, path) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "mills-business/" + path + "/",
    use_filename: true,
    unique_filename: false,
  });
  return result;
};

// Delete image from cloudinary
const deleteImage = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id, {
    invalidate: true,
    folder: "mills-business/" + path + "/",
  });
  return result;
};

module.exports = { uploadImage, deleteImage };
