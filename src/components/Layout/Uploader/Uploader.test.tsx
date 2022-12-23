import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SIMPLE_CSV_FILE_WITH_ONE_ROW } from "../../../lib/constants";
import Uploader from "./Uploader";

describe("Ensure component can upload file", () => {
  test("ensure file gets uploaded by input", async () => {
    const FILE_NAME = "simple.csv";
    const file = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], FILE_NAME, {
      type: "text/csv",
    });

    render(<Uploader />);
    const uploadInput: any = screen.getByTestId("uploader");
    userEvent.upload(uploadInput, file);

    expect(uploadInput.files[0].name).toBe(FILE_NAME);
  });
});
