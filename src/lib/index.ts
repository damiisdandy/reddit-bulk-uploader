import PapaParse from 'papaparse';
import { EXPECTED_FIELDS } from './constants';
import { arrayToSentece, readFileAsync } from './utils';

type CSVRow = {
  "Campaign ID": string,
  "Campaign Title": string,
  "Campaign Objective": string,
  "Ad Group ID": string,
  "Ad Group Campaign ID": string,
  "Ad Group Title": string,
  "Geo Locations": string,
  "Start Date": string,
  "End Date": string,
  "Ad ID": string,
  "Ad Title": string,
  "Ad Ad Group ID": string,
  "Post ID": string,
}

type ValidateColumnFieldsReturn = {
  status: boolean;
  message: string;
}

export class EntityMapper {
  constructor(file: File) {
    this.csvRows = [];
    this.file = file;
  }

  private csvRows: CSVRow[];
  private file: File;

  /**
   * Read CSV file and convert into JSON
  */
  public async readCSVFiles(): Promise<CSVRow[]> {
    const csvText = await readFileAsync(this.file);
    const csv = PapaParse.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });
    const parsedData = csv.data;
    this.csvRows = [...parsedData];
    return parsedData;
  }

  /**
   * Check if all required fields are present
  */
  public validateColumnFields(): ValidateColumnFieldsReturn {
    if (this.csvRows.length) {
      // gather all fields on row
      const currentRowFields = Object.keys(this.csvRows[0]);
      if (EXPECTED_FIELDS.every(field => currentRowFields.includes(field))) {
        return {
          status: true,
          message: 'all necessary fields are included'
        }
      }
      const missingColumns = EXPECTED_FIELDS.filter(field => !currentRowFields.includes(field));
      return {
        status: false,
        message: `fields: (${arrayToSentece(missingColumns)}) are missing`
      }
    } else {
      return {
        status: false,
        message: 'empty csv file'
      }
    }
  }
}