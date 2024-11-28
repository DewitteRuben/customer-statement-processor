import express, { Request, Response } from "express";
import multer, { memoryStorage } from "multer";
import statementRecordParser from "../parser/parser";
import { validateRecords } from "../validator/validate";

const upload = multer({ storage: memoryStorage() });

const router = express.Router();

const supportedFileTypes = ["text/csv", "text/xml"];
router.post(
  "/validate",
  upload.single("statement_record"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: "invalid request, file is missing" });
      return;
    }

    if (!supportedFileTypes.includes(req.file?.mimetype)) {
      res
        .status(400)
        .json({ message: "invalid request, unsupported file type" });
      return;
    }

    try {
      const statementRecords = statementRecordParser.parse(req.file);
      const erroneousRecords = validateRecords(statementRecords);

      res
        .status(200)
        .json({ records: statementRecords, errors: erroneousRecords });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "failed to parse records" });
    }
  }
);

export default router;
