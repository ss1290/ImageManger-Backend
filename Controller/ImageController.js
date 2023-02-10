import Model from "../Models/ImageModel.js";
import cloudinary from "cloudinary";
import catchAsyncErrors from "../config/catchAsyncErrors.js";

export const uploadImage = catchAsyncErrors(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "images",
    width: 150,
    crop: "scale",
  });
  const { title, description } = req.body;

  const image = await Model.create({
    title,
    description,
    imgUrl: myCloud.secure_url,
    user: req.user._id,
  });
  res.status(201).json({ sucess: true, image });
});

export const getAllImages = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const imagesCount = await Model.countDocuments();
  const currentPage = Number(req.query.page) || 1;
  const skip = resultPerPage * (currentPage - 1);
  const images = await Model.find({ user: req.user._id })
    .limit(resultPerPage)
    .skip(skip);

  res.status(200).json({
    success: true,
    images,
    imagesCount,
    resultPerPage,
  });
});

export const getImage = catchAsyncErrors(async (req, res) => {
  const image = await Model.findById(req.params.id);
  res.status(200).json(image);
});

export const updateCount = catchAsyncErrors(async (req, res) => {
  const image = await Model.findById(req.params.id);
  await Model.findByIdAndUpdate(req.params.id, {
    seenCount: image.seenCount + 1,
  });
  res.status(200).json({ success: true });
});
