import { store } from ".."
import { clearState, upsertEntity } from "../reducers/entity"

beforeEach(() => {
  // clear state before each test
  store.dispatch(clearState());
  // populate state before each test
  store.dispatch(upsertEntity({
    type: "campaign",
    id: 1,
    title: "Test Campaign1",
    objective: "CLICKS",
    row: 0,
    result: "Success",
  }));
  store.dispatch(upsertEntity({
    type: "campaign",
    id: 2,
    title: "Test Campaign2",
    objective: "CLICKS",
    row: 0,
    result: "Success",
  }));
})

describe('Test store reducers, both upsert and clear', () => {
  test('clear stores data', () => {
    const storeEntities = store.getState().entities;
    // we uploaded 2 items, the result of length should be 2 items
    expect(storeEntities.length).toBe(2);

    // clear store
    store.dispatch(clearState());
    const newStoreEntities = store.getState().entities;
    // store should be emtpy after
    expect(newStoreEntities.length).toBe(0);
  });

  test('upsert reducer method should update item if exists or create a new one', () => {
    const EDITED_TITLE = "Test Campaign1 Edited"
    const storeEntities = store.getState().entities;
    // we uploaded 2 items, the result of length should be 2 items
    expect(storeEntities.length).toBe(2);

    // update the entity with id: 1
    store.dispatch(upsertEntity({
      type: "campaign",
      id: 1,
      title: EDITED_TITLE,
      objective: "CLICKS",
      row: 0,
      result: "Success",
    }));

    const newStoreEntities = store.getState().entities;
    // since we updated one we should still have 2 items in store
    expect(newStoreEntities.length).toBe(2);
    // updated entity with id: 1 should have an updated title
    expect(newStoreEntities.find(entity => entity.id === 1)?.title).toBe(EDITED_TITLE)

    // add entity with id: 3
    store.dispatch(upsertEntity({
      type: "campaign",
      id: 3,
      title: "something different",
      objective: "CLICKS",
      row: 0,
      result: "Success",
    }));

    // since we added an entity we should have 3 items in store
    expect(store.getState().entities.length).toBe(3);
  })
})