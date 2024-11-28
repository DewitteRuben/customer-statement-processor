import { StatementRecord } from "../../../shared/types";
import { parse as CSVParser } from "csv-parse/sync";
import { RawCSVRecordArraySchema, transformCSVRecord } from "./csv";

export class StatementRecordParser {
  parse(file: Express.Multer.File): StatementRecord[] {
    switch (file.mimetype) {
      case "text/csv": {
        return this.parseCSV(file);
      }
      case "text/xml": {
        return this.parseXML(file);
      }
      default:
        throw new Error("unsupported mimetype");
    }
  }

  parseCSV(file: Express.Multer.File): StatementRecord[] {
    const unvalidatedRecords = CSVParser(file.buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const records = RawCSVRecordArraySchema.parse(unvalidatedRecords);
    const transformedRecord = records.map(transformCSVRecord);

    return transformedRecord;
  }

  parseXML(file: Express.Multer.File): StatementRecord[] {
    throw new Error("not yet implemented");
  }
}

const statementRecordParser = new StatementRecordParser();

export default statementRecordParser;
