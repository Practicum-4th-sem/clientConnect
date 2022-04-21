const User = require("./../models/userModel");
const multer = require("multer");
// const sharp = require("sharp");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys[obj].forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("photo")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image. Please upload an image"), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// exports.resizeUserPhoto = async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);
// };

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
  //1) create error if user postd password data
  if (req.body.password) {
    throw new Error(
      "Cannot update password here. Please route to /resetPassword"
    );
  }

  // updating user
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.json(error.message);
  }
};
