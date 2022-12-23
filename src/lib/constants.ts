import { Entity } from "../store/reducers/entity";

export const EXPECTED_FIELDS = [
  "Campaign ID",
  "Campaign Title",
  "Campaign Objective",
  "Ad Group ID",
  "Ad Group Campaign ID",
  "Ad Group Title",
  "Geo Locations",
  "Start Date",
  "End Date",
  "Ad ID",
  "Ad Title",
  "Ad Ad Group ID",
  "Post ID"
];

export const EXPECTED_CAMPAIGN_BEHAVIOURS = ['CLICKS', 'IMPRESSIONS', '']

export const MOCK_STATE = [{
  type: "campaign",
  id: 1,
  title: "Test Campaign1 Edited",
  objective: "CLICKS",
  row: 0,
  result: "Success",
}, {
  type: "campaign",
  id: 2,
  title: "Test Campaign2 Edited",
  objective: "CLICKS",
  row: 1,
  result: "Success",
}] as Partial<Entity>[];

export const SIMPLE_CSV_FILE_WITH_ONE_ROW = `
Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID
,Test Campaign1,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
`

export const CSV_FILE_WITH_MISSING_COLUMNS =
  `Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title
,Test Campaign1,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1
,Test Campaign2,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2
`