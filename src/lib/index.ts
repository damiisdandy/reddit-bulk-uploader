import PapaParse from 'papaparse';
import { readFileAsync } from './utils';

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
}