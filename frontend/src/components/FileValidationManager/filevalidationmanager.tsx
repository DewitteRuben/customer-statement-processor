import { useState } from "react";
import FileInput from "../FileInput/fileinput";
import Button from "../Button/button";

const FileValidationMananager = () => {
  const [file, setFile] = useState<File>();

  return (
    <div>
      <div className="mb-3">
        <FileInput
          onFileSelect={setFile}
          name="statement_record"
          accept=".csv, .xml"
        />
      </div>
      {file && <Button text="Validate records" />}
    </div>
  );
};

export default FileValidationMananager;
