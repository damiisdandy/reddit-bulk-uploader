import { ChangeEventHandler, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFileAdd } from "react-icons/ai";

export default function Uploader() {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const onFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const csvFile = e.target.files[0];
      if (csvFile.type !== "text/csv") {
        toast.error("only csv files are allowed :(");
        return;
      }
      setUploadedFileName(csvFile.name);
    }
  };

  return (
    <div>
      <label
        className="cursor-pointer flex gap-1 flex-col items-center justify-center h-64 w-64 rounded-lg border-[4px] border-dashed"
        htmlFor="csv-uploader"
      >
        <AiOutlineFileAdd className="text-6xl text-gray-300" />
        <p className="text-gray-300 text-sm font-bold">
          Click to {uploadedFileName ? "add another file" : "upload"}
        </p>
        {uploadedFileName && (
          <p className="text-sm opacity-50 w-[80] truncate text-center">
            uploaded file{" "}
            <span className="text-brand-100">{uploadedFileName}</span>
          </p>
        )}
        <input
          onChange={onFileUpload}
          className="hidden"
          id="csv-uploader"
          type="file"
          accept=".csv"
        />
      </label>
    </div>
  );
}
