import { useState } from "react";
import FileInput from "../FileInput/fileinput";
import Button from "../Button/button";
import statementProcessorApi from "../../api/api";

const FileValidationMananager = () => {
  const [file, setFile] = useState<File>();

  const onValidateClick = async () => {
    if (file) {
      const data = await statementProcessorApi.validate(file);
      console.log({ data });
    }
  };

  return (
    <div>
      <div className="mb-3">
        <FileInput
          onFileSelect={setFile}
          name="statement_record"
          accept=".csv, .xml"
        />
      </div>
      {file && <Button onClick={onValidateClick} text="Validate records" />}
    </div>
  );
};

export default FileValidationMananager;
