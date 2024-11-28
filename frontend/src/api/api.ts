import Decimal from "decimal.js";
import { StatementRecord } from "../../../shared/types";

class StatementProcessorAPI {
  private baseURL: string = "http://localhost:3000/api";

  async validate(file: File): Promise<StatementRecord[]> {
    const formData = new FormData();
    formData.append("statement_record", file);

    const data = await fetch(`${this.baseURL}/validate`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    // Rewrap the data, converting the proper fields into Decimal objects
    const wrappedData: StatementRecord[] = data.map(
      (record: StatementRecord) => ({
        ...record,
        startBalance: new Decimal(record.startBalance),
        mutation: new Decimal(record.mutation),
        endBalance: new Decimal(record.endBalance),
      })
    );

    return wrappedData;
  }
}

const statementProcessorApi = new StatementProcessorAPI();

export default statementProcessorApi;
