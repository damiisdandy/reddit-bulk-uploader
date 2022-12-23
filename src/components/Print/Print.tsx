import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Entity, printEntity } from "../../store/reducers/entity";
import ReactJson from "react-json-view";
import _ from "lodash";

export default function Print({ entities }: { entities: Partial<Entity>[] }) {
  const [searchedEntities, setSearchedEntities] = useState<Partial<Entity>[]>(
    []
  );
  const [ranSearch, setRanSearch] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [entityType, setEntityType] = useState<
    "campaign" | "ad_group" | "ad" | "all"
  >("all");

  const onIdChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIdValue(e.target.value);
  };

  const onEntityChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setEntityType(e.target.value as any);
  };

  const handleSearch = () => {
    setSearchedEntities(printEntity(entities, idValue, entityType));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    setRanSearch(true);
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities]);
  return (
    <div className="mt-7">
      <h1 className="text-2xl text-center font-bold uppercase">
        Print out Entities
      </h1>
      <p className="text-gray-500 text-center px-[10%]">
        <span className="text-brand-100 font-bold">{entities.length}</span>{" "}
        Entities have been stored, search for an entity below by selecting an
        entity type and input it's ID, or leave the fields blank to fetch all
        entities.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col xl:flex-row items-center xl:items-stretch gap-4 justify-center"
      >
        <input
          className="bg-gray-200 px-3 py-2 rounded-lg w-80"
          value={idValue}
          onChange={onIdChange}
        />
        <div className="flex items-stretch gap-4">
          <select
            onChange={onEntityChange}
            className="bg-gray-300 p-3 rounded-lg"
          >
            <option value="all">All</option>
            <option value="campaign">Campaign</option>
            <option value="ad_group">Ad Group</option>
            <option value="ad">Ad</option>
          </select>
          <button
            type="submit"
            className="text-white bg-brand-100 px-8 rounded-lg"
          >
            Search
          </button>
        </div>
      </form>
      {searchedEntities.length > 0 ? (
        <div className="p-6">
          <ReactJson src={_.sortBy(searchedEntities, "id")} />
        </div>
      ) : ranSearch ? (
        <p className="text-gray-400 font-bold text-center mt-12">
          🔍 couldn't find entity of that query
        </p>
      ) : null}
    </div>
  );
}
