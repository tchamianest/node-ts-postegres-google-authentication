import multer from "multer";
import express from "express";
const fileFilter = (req: any, file: any, cb: any) => {
  return cb(null, true);
};
const multerUpload = multer({ fileFilter: fileFilter });
export default multerUpload;
