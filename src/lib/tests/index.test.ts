import { EntityMapper } from "..";
import { SIMPLE_CSV_FILE_WITH_ONE_ROW } from "../constants"

describe('Test methods of `EntityMapper` class, this class takes in CSV files, parses and formats it into JSON', () => {
  test('Read CSV file and convert into JSON', async () => {
    const file = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'simple.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(file);
    const jsonOutput = await entityMapper.readCSVFiles();

    expect(jsonOutput).toStrictEqual([{ "Ad Ad Group ID": "", "Ad Group Campaign ID": "", "Ad Group ID": "", "Ad Group Title": "Ad group 1", "Ad ID": "", "Ad Title": "Ad 1", "Campaign ID": "", "Campaign Objective": "CLICKS", "Campaign Title": "Test Campaign1", "End Date": "01/10/2020", "Geo Locations": "US, CA", "Post ID": "t2_1", "Start Date": "01/01/2020" }])
  })
})