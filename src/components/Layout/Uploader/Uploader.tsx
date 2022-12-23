import { ChangeEventHandler } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";

export default function Uploader() {
  const onFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {};

  return (
    <div>
      <label
        className="cursor-pointer flex gap-1 flex-col items-center justify-center h-64 w-64 rounded-lg border-[4px] border-dashed"
        htmlFor="csv-uploader"
      >
        <AiOutlineFileAdd className="text-6xl text-gray-300" />
        <p className="text-gray-300 text-sm font-bold">Click to upload</p>
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
