import { EntityMapper } from "..";
import { store } from "../../store";
import { CSV_FILE_WITH_MISSING_COLUMNS, SIMPLE_CSV_FILE_WITH_ONE_ROW } from "../constants"

describe('Test methods of `EntityMapper` class, this class takes in CSV files, parses and formats it into JSON', () => {
  test('Read CSV file and convert into JSON', async () => {
    const file = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'simple.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(file);
    const jsonOutput = await entityMapper.readCSVFiles();

    expect(jsonOutput).toStrictEqual([{ "Ad Ad Group ID": "", "Ad Group Campaign ID": "", "Ad Group ID": "", "Ad Group Title": "Ad group 1", "Ad ID": "", "Ad Title": "Ad 1", "Campaign ID": "", "Campaign Objective": "CLICKS", "Campaign Title": "Test Campaign1", "End Date": "01/10/2020", "Geo Locations": "US, CA", "Post ID": "t2_1", "Start Date": "01/01/2020" }])
  })

  test('Check if CSV file uploaded has all required columns', async () => {
    // valid CSV file with no missing columns
    const validFile = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'valid.csv', { type: 'text/csv' });
    const validEntityMapper = new EntityMapper(validFile);
    await validEntityMapper.readCSVFiles();
    expect(validEntityMapper.validateColumnFields().status).toBe(true);

    // invalid csv file with two missing columns (Ad Ad Group ID and Post ID)
    const invalidFile = new File([CSV_FILE_WITH_MISSING_COLUMNS], 'invalid.csv', { type: 'text/csv' });
    const invalidEntityMapper = new EntityMapper(invalidFile);
    await invalidEntityMapper.readCSVFiles();
    expect(invalidEntityMapper.validateColumnFields()).toStrictEqual({
      status: false,
      message: 'fields: (Ad Ad Group ID, and Post ID) are missing'
    });
  })

  test('Format CSV file into Array of Entities to be stored in the global state (Memory)', async () => {
    const oneRowFile = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'one-row.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(oneRowFile);
    await entityMapper.readCSVFiles();

    // stores all entities in global state
    entityMapper.parseData();
    const storeEntities = store.getState().entities;
    expect(storeEntities).toStrictEqual([
      {
        type: 'campaign',
        id: 1,
        title: 'Test Campaign1',
        objective: 'CLICKS',
        row: 0,
        result: 'Success'
      },
      {
        type: 'ad_group',
        id: 2,
        campaign_id: 1,
        title: 'Ad group 1',
        geolocations: ['US', 'CA'],
        start_date: '01/01/2020',
        end_date: '01/10/2020',
        result: 'Success',
        row: 0
      },
      {
        id: 3,
        ad_group_id: 2,
        type: 'ad',
        row: 0,
        title: 'Ad 1',
        post_id: 't2_1',
        result: 'Success'
      }
    ])
  });
})