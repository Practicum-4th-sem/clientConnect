const User = require("./../models/userModel");
const multer = require("multer");
// const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const Post = require("../models/postModel");
const cloudinary = require("../utils/cloudinary");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.upload = async (req, res, next) => {
  const file = req.files.image;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    public_id: `${Date.now()}`,
    folder: "users",
  });

  const user = await User.findById(res.locals.id);
  user.photo.url = result.url;
  await user.save();
  res.redirect(`/profile/${res.locals.id}`);
};

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// exports.upload = multer({
//   storage: multerStorage,
// }).single("photo");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      username: user.name,
      photo: user.photo,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    //1) create error if user postd password data
    if (req.body.password) {
      throw new Error(
        "Cannot update password here. Please route to /resetPassword"
      );
    }

    // updating user
    const newObj = {};
    Object.keys(req.query).forEach((el) => {
      if (el != "password" && el != "user") {
        newObj[el] = req.body[el];
      }
    });
    // const user = await User.find({})
    const updatedUser = await User.findByIdAndUpdate(res.locals.id, newObj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user.posts.forEach(async (post) => {
      await Post.findByIdAndDelete(post._id);
    });
    await User.findByIdAndDelete(req.params.id);
    res.cookie("jwt", "account deleted", {
      expires: new Date(Date.now() + 10 * 1000), //expires in 10 seconds
      httpOnly: true,
    });
    next();
  } catch (error) {
    res.json(error.message);
  }
};
