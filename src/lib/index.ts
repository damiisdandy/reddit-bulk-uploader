import dayjs from 'dayjs';
import PapaParse from 'papaparse';
import { store } from '../store';
import { AdGroup, Ads, Campaign, CampaignObjective, upsertEntity } from '../store/reducers/entity';
import { EXPECTED_CAMPAIGN_BEHAVIOURS, EXPECTED_FIELDS } from './constants';
import { arrayToSentece, findEntityById, getNumberOrDefaultString, readFileAsync } from './utils';

type CSVRow = {
  "Campaign ID": string,
  "Campaign Title": string,
  "Campaign Objective": CampaignObjective,
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

  /**
   * Parse campaign entity
  */
  private parseCampaign(data: CSVRow, row: number): Campaign {
    const currentStoreState = store.getState();
    const errorArray = [];
    const providedId = data["Campaign ID"];

    const errorMessage = findEntityById(providedId, "campaign", currentStoreState.entities, "Campaign with this id does not exist");
    if (errorMessage) {
      errorArray.push(errorMessage);
    }

    if (!EXPECTED_CAMPAIGN_BEHAVIOURS.includes(data["Campaign Objective"])) {
      errorArray.push("Campaign Objectives must either be empty, 'CLICKS' or 'IMPRESSIONS'")
    }

    const campaign: Campaign = {
      type: 'campaign',
      id: getNumberOrDefaultString(providedId),
      title: data["Campaign Title"],
      objective: data["Campaign Objective"],
      row,
      result: errorArray.length ? arrayToSentece(errorArray) : 'Success',
    };

    store.dispatch(upsertEntity(campaign));
    return campaign;

  }

  /**
  * Parse Ad Groups entity
  */
  private parseAdGroups(data: CSVRow, row_id: number): AdGroup {
    const currentStoreState = store.getState();
    const errorArray = [];
    const providedId = data["Ad Group ID"];
    const providedCampaignId = data["Ad Group Campaign ID"];
    let campaignRowId = null;

    // check if id exists
    const idErrorMessage = findEntityById(providedId, "ad_group", currentStoreState.entities, "Ad group with that ID does not exist");
    if (idErrorMessage) {
      errorArray.push(idErrorMessage);
    }
    // check if associated campaign id exist
    const campaignIdErrorMessage = findEntityById(providedCampaignId, "campaign", currentStoreState.entities, "Selected Campaign for Ad group does not exist")
    if (campaignIdErrorMessage) {
      errorArray.push(campaignIdErrorMessage);
    } else {
      let campaignEntityOnRow = currentStoreState.entities.find(entity => entity.row === row_id && entity.type === 'campaign');
      if (campaignEntityOnRow) {
        campaignRowId = campaignEntityOnRow.id;
      } else {
        errorArray.push("Selected Campaign for Ad group does not exist")
      }
    }

    // check if start date and end date are valid dates
    if (data["Start Date"] && !dayjs(data["Start Date"]).isValid()) {
      errorArray.push("Ad Group Start Date is Invalid")
    }

    if (data["End Date"] && !dayjs(data["End Date"]).isValid()) {
      errorArray.push("Ad Group End Date is Invalid")
    }


    const adGroup: AdGroup = {
      type: 'ad_group',
      id: getNumberOrDefaultString(providedId),
      campaign_id: campaignRowId || getNumberOrDefaultString(data["Ad Group Campaign ID"]),
      title: data["Ad Group Title"],
      geolocations: data["Geo Locations"].split(",").map(loc => loc.trim()),
      start_date: data["Start Date"],
      end_date: data["End Date"],
      result: errorArray.length ? arrayToSentece(errorArray) : 'Success',
      row: row_id,
    }

    store.dispatch(upsertEntity(adGroup));
    return adGroup;
  }

  /**
  * Parse Ads Entity
  */
  private parseAds(data: CSVRow, row_id: number): Ads {
    const currentStoreState = store.getState();
    const errorArray = [];
    const providedId = data["Ad ID"];
    const providedAdGroupId = data["Ad Ad Group ID"];
    let adGroupRowId = null;
    // check if id exists
    const idErrorMessage = findEntityById(providedId, "ad", currentStoreState.entities, "Ad with that ID does not exist");
    if (idErrorMessage) {
      errorArray.push(idErrorMessage);
    }
    // check if  associated campaign id exist
    const campaignIdErrorMessage = findEntityById(providedAdGroupId, "ad_group", currentStoreState.entities, "Selected Ad group for Ad does not exist")
    if (campaignIdErrorMessage) {
      errorArray.push(campaignIdErrorMessage);
    } else {
      let adGroupEntityOnRow = currentStoreState.entities.find(entity => entity.row === row_id && entity.type === 'ad_group');
      if (adGroupEntityOnRow) {
        adGroupRowId = adGroupEntityOnRow.id;
      } else {
        errorArray.push("Selected Ad group for Ad does not exist")
      }
    }

    const ad: Ads = {
      id: getNumberOrDefaultString(providedId),
      ad_group_id: adGroupRowId || getNumberOrDefaultString(data["Ad Ad Group ID"]),
      type: 'ad',
      row: row_id,
      title: data["Ad Title"],
      post_id: data["Post ID"],
      result: errorArray.length ? arrayToSentece(errorArray) : 'Success',
    }

    store.dispatch(upsertEntity(ad));
    return ad;
  }

  /**
   * Parse all entity types per row and store then in global state
   */
  public parseData(): void {
    this.csvRows.forEach((row, index) => this.parseCampaign(row, index));
    this.csvRows.forEach((row, index) => this.parseAdGroups(row, index));
    this.csvRows.forEach((row, index) => this.parseAds(row, index));
  }
}