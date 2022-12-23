import { ChangeEventHandler, useState } from "react";
import { toast } from "react-hot-toast";
import Papaparse from "papaparse";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { EntityMapper } from "../../lib";

export default function Uploader() {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [parseLoading, setParseLoading] = useState(false);
  const [csvDownloadLink, setCsvDownloadLink] = useState("");

  const onFileUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      if (e.target.files?.length) {
        const csvFile = e.target.files[0];
        if (csvFile.type !== "text/csv") {
          toast.error("only csv files are allowed :(");
          return;
        }
        setUploadedFileName(csvFile.name);

        const entityMapper = new EntityMapper(csvFile);
        setParseLoading(true);
        // read CSV file
        await entityMapper.readCSVFile();
        // validate CSV files
        const validationResult = entityMapper.validateColumnFields();
        if (!validationResult.status) {
          toast.error(validationResult.message);
          // reset form input
          e.target.value = "";
          setUploadedFileName(null);
          return;
        }
        // parse all entities and added them to global state (memory)
        entityMapper.parseData();
        // convert global state back into CSV
        const result = entityMapper.generateResult();
        // create downloadable link for results.csv
        downloadCSV(result);
      }
    } catch {
      toast.error("Problem parsing CSV");
    } finally {
      setParseLoading(false);
    }
  };

  /**
   * Create downloadable link for new csv file
   */
  const downloadCSV = (array: any[]) => {
    const csv = Papaparse.unparse(array);
    const blobData = new Blob([csv], { type: "text/csv" });
    setCsvDownloadLink(URL.createObjectURL(blobData));
  };

  return (
    <div>
      <label
        className="cursor-pointer flex gap-1 flex-col items-center justify-center h-64 w-64 rounded-lg border-[4px] border-dashed"
        htmlFor="csv-uploader"
      >
        {parseLoading ? (
          <BiLoaderAlt className="spin text-4xl text-brand-100" />
        ) : (
          <>
            <AiOutlineFileAdd className="text-6xl text-gray-300" />
            <p className="text-gray-300 text-sm font-bold">
              Click to {uploadedFileName ? "add another file" : "upload"}
            </p>
            {uploadedFileName && (
              <p className="text-sm opacity-50 w-[80%] truncate text-center">
                uploaded file{" "}
                <span className="text-brand-100">{uploadedFileName}</span>
              </p>
            )}
            <input
              data-testid="uploader"
              onChange={onFileUpload}
              className="hidden"
              id="csv-uploader"
              type="file"
              accept=".csv"
            />
          </>
        )}
        {csvDownloadLink && (
          <a
            href={csvDownloadLink}
            className="text-sm text-brand-100 underline text-center"
            download="results.csv"
          >
            download results
          </a>
        )}
      </label>
    </div>
  );
}
