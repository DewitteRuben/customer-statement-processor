import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FileInput from "./fileinput";

describe("FileInput Component", () => {
  it("renders upload label", () => {
    render(<FileInput />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders file details when a file is selected", () => {
    const testFile = new File(["test content"], "test.csv", {
      type: "text/csv",
    });

    render(<FileInput />);

    const input = screen.getByLabelText(
      /Click to upload a file/i
    );

    fireEvent.change(input, { target: { files: [testFile] } });

    expect(screen.getByText(/Name: test.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: text\/csv/i)).toBeInTheDocument();
    expect(screen.getByText(/Size: 12 bytes/i)).toBeInTheDocument();
  });

  it("calls onFileSelect callback with the selected file", () => {
    const onFileSelectMock = jest.fn();
    const testFile = new File(["test content"], "test.csv", {
      type: "text/plain",
    });

    render(<FileInput onFileSelect={onFileSelectMock} />);

    const input = screen.getByLabelText(
      "Click to upload a file"
    );

    fireEvent.change(input, { target: { files: [testFile] } });
    expect(onFileSelectMock).toHaveBeenCalledWith(testFile);
  });

  it("does not render file details if no file is selected", () => {
    render(<FileInput />);

    expect(screen.queryByText(/Name:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Type:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Size:/i)).not.toBeInTheDocument();
  });
});
