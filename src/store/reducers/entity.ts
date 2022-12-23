import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CampaignObjective = 'CLICKS' | 'IMPRESSIONS' | '';

interface BaseEntity {
  id: number | string;
  type: EntityType;
  row: number;
  result: string;
}

export interface Campaign extends BaseEntity {
  title: string;
  objective: CampaignObjective
}

export interface AdGroup extends BaseEntity {
  campaign_id: number | string;
  title: string;
  geolocations: string[];
  start_date: string;
  end_date: string;
}

export interface Ads extends BaseEntity {
  ad_group_id: number | string;
  title: string;
  post_id: string;
}
export type EntityType = 'campaign' | 'ad_group' | 'ad';

export type Entity = Campaign & AdGroup & Ads

const initialState: Partial<Entity>[] = [];

export const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    clearState: () => {
      return [];
    },
    // create or update entity if exists
    upsertEntity: (state, action: PayloadAction<Partial<Entity>>) => {
      const { payload } = action;

      // to help modify payload
      let finalPayload = { ...payload };
      // if no id was provided
      if (finalPayload.id === '') {
        return [...state, {
          ...finalPayload,
          id: state.length + 1,
        }]
      } else {
        const selectedEntity = state.find(entity => entity.id === payload.id);
        // if entity with that id exists, replace it
        if (selectedEntity) {
          return [
            ...state.filter(entity => entity.id !== payload.id),
            {
              ...finalPayload,
            }
          ]
        } else {
          // if doesn't exist just add it with the respective result message
          return [...state, finalPayload];
        }
      }
    }
  }
})

export const { clearState, upsertEntity } = entitySlice.actions;
export const printEntity = (entities: Partial<Entity>[], id: string, type: 'campaign' | 'ad_group' | 'ad' | 'all'): Partial<Entity>[] => {
  if (id) {
    return entities.filter(
      (entity) =>
        entity.id?.toString() === id &&
        (type === "all" ? true : entity.type === type)
    )
  } else {
    if (type === "all") {
      return entities;
    } else {
      return entities.filter((entity) => entity.type === type)
    }
  }
}
export default entitySlice.reducer;