import express, { Request, Response } from "express";
import multer, { memoryStorage } from "multer";

const upload = multer({ storage: memoryStorage() });

const router = express.Router();

const supportedFileTypes = ["text/csv", "text/xml"];
router.post(
  "/validate",
  upload.single("statement_record"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ text: "invalid request, file is missing" });
      return;
    }

    if (!supportedFileTypes.includes(req.file?.mimetype)) {
      res.status(400).json({ text: "invalid request, unsupported file type" });
      return;
    }

    res.status(200).json({ contents: req.file.buffer.toString() });
  }
);

export default router;
