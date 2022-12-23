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

export const SIMPLE_CSV_FILE_WITH_CAMPAIGN_UPDATE = `
Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID
1,Test Campaign1 Edited,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
`

export const CSV_FILE_WITH_MULTIPLE_ROWS = `
Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID
,Test Campaign1,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
,Test Campaign2,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2
,Test Campaign3,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
,Test Campaign4,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2
,Test Campaign5,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
,Test Campaign6,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2
,Test Campaign7,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
,Test Campaign8,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2
`

export const VALID_TWO_ROW_CSV_FILE =
  `Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID
,Test Campaign1,CLICKS,,,Ad group 1,"US, CA",1/1/20,1/10/20,,Ad 1,,t2_1
,Test Campaign2,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",1/1/20,1/10/20,,Ad 2,,t2_2
`

export const CSV_FILE_WITH_EXCESS_COLUMNS = `
Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID,Field 1,Field 2
,Test Campaign1,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,1,2
,Test Campaign2,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,1,2
,Test Campaign3,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,1,2
,Test Campaign4,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,1,
,Test Campaign5,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,1,2
,Test Campaign6,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,,2
,Test Campaign7,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,1,2
,Test Campaign8,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,1,2
`

export const CSV_FILE_WITH_DUPLICATE_COLUMNS = `
Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID,End Date,Campaign ID
,Test Campaign1,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,01/10/2020,
,Test Campaign2,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,02/10/2020,
,Test Campaign3,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,03/10/2020,
,Test Campaign4,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,04/10/2020,
,Test Campaign5,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,05/10/2020,
,Test Campaign6,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,06/10/2020,
,Test Campaign7,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1,07/10/2020,
,Test Campaign8,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2,08/10/2020,
`

export const CSV_FILE_WITH_INVALID_FIELDS = `
Campaign ID,Campaign Title,Campaign Objective,Ad Group ID,Ad Group Campaign ID,Ad Group Title,Geo Locations,Start Date,End Date,Ad ID,Ad Title,Ad Ad Group ID,Post ID
,Test Campaign1 Edited,CLICKS,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
,Test Campaign2 Edited,CLICKS,,,Ad group 1,"US, CA",NOT DATE,01/10/2020,,Ad 1,,t2_1
,Test Campaign3 Edited,IMPRESSIONS,,,Ad group 2,"GB, AU, US-CA",01/01/2020,01/10/2020,,Ad 2,,t2_2
,Test Campaign1,DANCE,,,Ad group 1,"US, CA",01/01/2020,01/10/2020,,Ad 1,,t2_1
`