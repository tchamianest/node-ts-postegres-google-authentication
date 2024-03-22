import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imageData: Buffer): Promise<string> => {

  const base64Image = imageData.toString("base64");
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      { public_id: "user_image"},
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const url = result!.secure_url;
          resolve(url);
        }
      }
    );
  });
};
export default uploadImage;