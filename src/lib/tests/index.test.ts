import { EntityMapper } from "..";
import { store } from "../../store";
import { clearState, Entity } from "../../store/reducers/entity";
import { CSV_FILE_WITH_DUPLICATE_COLUMNS, CSV_FILE_WITH_EXCESS_COLUMNS, CSV_FILE_WITH_INVALID_FIELDS, CSV_FILE_WITH_MISSING_COLUMNS, CSV_FILE_WITH_MULTIPLE_ROWS, SIMPLE_CSV_FILE_WITH_CAMPAIGN_UPDATE, SIMPLE_CSV_FILE_WITH_ONE_ROW } from "../constants"

beforeEach(() => {
  // before every test clear out the state
  store.dispatch(clearState());
});

describe('Test methods of `EntityMapper` class, this class takes in CSV files, parses and formats it into JSON', () => {
  test('Read CSV file and convert into JSON', async () => {
    const file = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'simple.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(file);
    const jsonOutput = await entityMapper.readCSVFile();

    expect(jsonOutput).toStrictEqual([{ "Ad Ad Group ID": "", "Ad Group Campaign ID": "", "Ad Group ID": "", "Ad Group Title": "Ad group 1", "Ad ID": "", "Ad Title": "Ad 1", "Campaign ID": "", "Campaign Objective": "CLICKS", "Campaign Title": "Test Campaign1", "End Date": "01/10/2020", "Geo Locations": "US, CA", "Post ID": "t2_1", "Start Date": "01/01/2020" }])
  })

  test('Check if CSV file uploaded has all required columns', async () => {
    // valid CSV file with no missing columns
    const validFile = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'valid.csv', { type: 'text/csv' });
    const validEntityMapper = new EntityMapper(validFile);
    await validEntityMapper.readCSVFile();
    expect(validEntityMapper.validateColumnFields().status).toBe(true);

    // invalid csv file with two missing columns (Ad Ad Group ID and Post ID)
    const invalidFile = new File([CSV_FILE_WITH_MISSING_COLUMNS], 'invalid.csv', { type: 'text/csv' });
    const invalidEntityMapper = new EntityMapper(invalidFile);
    await invalidEntityMapper.readCSVFile();
    expect(invalidEntityMapper.validateColumnFields()).toStrictEqual({
      status: false,
      message: 'fields: (Ad Ad Group ID, and Post ID) are missing'
    });
  })

  test('Format CSV file into Array of Entities to be stored in the global state (Memory)', async () => {
    const oneRowFile = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'one-row.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(oneRowFile);
    await entityMapper.readCSVFile();

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

  test('Convert global state data back into valid JSON format for storing in results.csv file', async () => {
    const oneRowFile = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'one-row.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(oneRowFile);
    await entityMapper.readCSVFile();
    entityMapper.parseData();

    const result = entityMapper.generateResult()[0];
    // ensure each entity has their new unique id according to type [CSVRow]
    expect(result["Campaign ID"]).toBe(1);
    expect(result["Ad Group ID"]).toBe(2);
    expect(result["Ad ID"]).toBe(3);
    expect(result.Results).toBe('Success');
  })
});

describe('Test upload of multiple valid and invalid csv files, including updating entities and others Edge Cases', () => {
  test('Upload multiple valid CSV files one at a time', async () => {
    const multipleRowCSVFile = new File([CSV_FILE_WITH_MULTIPLE_ROWS], 'multi-1.csv', { type: 'text/csv' });
    const firstEntityMapper = new EntityMapper(multipleRowCSVFile);
    await firstEntityMapper.readCSVFile();

    // stores all entities in global state
    firstEntityMapper.parseData();
    const storeEntities = store.getState().entities;
    // csv file has 8 rows, so it should have 24 entities (8*3)
    expect(storeEntities.length).toBe(24);

    const secondEntityMapper = new EntityMapper(multipleRowCSVFile);
    await secondEntityMapper.readCSVFile();

    // stores all entities in global state
    secondEntityMapper.parseData();
    const newStoreEntities = store.getState().entities;
    // addition of same file with no update fields, will assign new id and have a number (24*2) entities => 48
    expect(newStoreEntities.length).toBe(48);
  });

  test("Upload new csv file, then udpate the campaign's data", async () => {
    const file = new File([SIMPLE_CSV_FILE_WITH_ONE_ROW], 'new.csv', { type: 'text/csv' });
    const updateFile = new File([SIMPLE_CSV_FILE_WITH_CAMPAIGN_UPDATE], 'update.csv', { type: 'text/csv' });

    const newEntityMapper = new EntityMapper(file);
    await newEntityMapper.readCSVFile();
    newEntityMapper.parseData();

    const storeEntities = store.getState().entities;
    // since the csv has one row, therefore 3 entities
    expect(storeEntities.length).toBe(3);
    // Campaign title before update
    expect((storeEntities.find(entity => entity.id === 1) as Entity).title).toBe("Test Campaign1")

    const updateEntityMapper = new EntityMapper(updateFile);
    await updateEntityMapper.readCSVFile();
    updateEntityMapper.parseData();
    const newStoreEntities = store.getState().entities;
    // since we are only updating the campaign and other entities do not have ids,
    // they will be recreated, making the total store length (3 + 2) -> 5
    // 2 because the campaign entity isn't recreated but updated
    expect(newStoreEntities.length).toBe(5);
    // updated campaign title
    expect((newStoreEntities.find(entity => entity.id === 1) as Entity).title).toBe("Test Campaign1 Edited")
  });

  test('Try to update campaign by ID that does not exist', async () => {
    const updateFile = new File([SIMPLE_CSV_FILE_WITH_CAMPAIGN_UPDATE], 'update.csv', { type: 'text/csv' });
    const updateEntityMapper = new EntityMapper(updateFile);
    await updateEntityMapper.readCSVFile();

    updateEntityMapper.parseData();
    const result = updateEntityMapper.generateResult();
    expect(result[0].Results).toBe('Campaign with this id does not exist');
  })

  test('Upload csv file with invalid campaign objective and invalid Ad group start date', async () => {
    const invalidFile = new File([CSV_FILE_WITH_INVALID_FIELDS], 'invalid.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(invalidFile);
    await entityMapper.readCSVFile();

    entityMapper.parseData();
    const result = entityMapper.generateResult();
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        Results: 'Ad Group Start Date is Invalid'
      }), expect.objectContaining({
        Results: "Campaign Objectives must either be empty, 'CLICKS' or 'IMPRESSIONS'"
      })]))
  });

  test('Upload csv file with excess columns and 8 rows', async () => {
    const excessFile = new File([CSV_FILE_WITH_EXCESS_COLUMNS], 'excess.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(excessFile);
    await entityMapper.readCSVFile();
    entityMapper.parseData();

    const storeEntities = store.getState().entities;
    // since there are 8 rows with 3 entities each, making it a total of 24 entities
    // we simply ignore every other extra fields in the csv file (Field 1 and Field 2)
    expect(storeEntities.length).toBe(24);
  })

  test('Upload csv file with duplicate columns and 8 rows', async () => {
    const excessFile = new File([CSV_FILE_WITH_DUPLICATE_COLUMNS], 'duplicate.csv', { type: 'text/csv' });
    const entityMapper = new EntityMapper(excessFile);
    await entityMapper.readCSVFile();
    entityMapper.parseData();

    const storeEntities = store.getState().entities;
    // since there are 8 rows with 3 entities each, making it a total of 24 entities
    // we simply ignore fields that have already been parsed in the csv file
    expect(storeEntities.length).toBe(24);
  })
});