import Decimal from "decimal.js";
import {
  StatementRecord,
  StatementRecordValidationResult,
} from "@customer-statement-processor/shared";

type StatementProcessorAPIErrorResponse = {
  message: string;
};

export class StatementProcessorAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class StatementProcessorAPI {
  private baseURL: string = "http://localhost:3000/api";

  private rehydrateRecord(record: StatementRecord) {
    return {
      ...record,
      startBalance: new Decimal(record.startBalance),
      mutation: new Decimal(record.mutation),
      endBalance: new Decimal(record.endBalance),
    };
  }

  async validate(file: File): Promise<StatementRecordValidationResult> {
    const formData = new FormData();
    formData.append("statement_record", file);

    const response = await fetch(`${this.baseURL}/validate`, {
      method: "POST",
      body: formData,
    });

    const responseJSON:
      | StatementRecordValidationResult
      | StatementProcessorAPIErrorResponse = await response.json();

    if (response.status !== 200) {
      if ("message" in responseJSON) {
        throw new StatementProcessorAPIError(responseJSON.message);
      } else {
        throw new StatementProcessorAPIError("an error has occurred");
      }
    }

    const data = responseJSON as StatementRecordValidationResult;

    // Rewrap the data, converting the proper fields into Decimal objects
    const wrappedData: StatementRecordValidationResult = {
      errors: data.errors.map(({ record, type }) => ({
        record: this.rehydrateRecord(record),
        type,
      })),
      records: data.records.map((record) => this.rehydrateRecord(record)),
    };

    return wrappedData;
  }
}

const statementProcessorApi = new StatementProcessorAPI();

export default statementProcessorApi;
