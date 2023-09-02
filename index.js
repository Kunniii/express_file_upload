import express from "express";
import multer from "multer";
import { extname } from "path";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
