class StatementProcessorAPI {
  private baseURL: string = "http://localhost:3000/api";

  async validate(file: File) {
    const formData = new FormData();
    formData.append("statement_record", file);

    const data = await fetch(`${this.baseURL}/validate`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    return data;
  }
}

const statementProcessorApi = new StatementProcessorAPI();

export default statementProcessorApi;
