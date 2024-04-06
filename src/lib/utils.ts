import { Entity, EntityType } from "../store/reducers/entity";

/**
 * Read file as text asynchronously
*/
export const readFileAsync = (file: File) => {
  return new Promise<string | ArrayBuffer | null | undefined>((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = ({ target }) => {
      resolve(target?.result);
    }
    reader.onerror = reject;
    reader.readAsText(file)
  })
}

/**
 * Convert array to a sentence e.g [a, b, c] => a, b, and c
*/
export const arrayToSentece = (param: string[]) => {
  if (param.length === 1) return param[0];
  return param.reduce((a, b, index) => a + (param.length - 1 === index ? 'and ' : "") + b + (param.length - 1 !== index ? ", " : ""), '')
}

/**
 * Check if entity of that id exists
 */
export const findEntityById = (id: string, type: EntityType, state: Partial<Entity>[], errorMessage: string): string | null => {
  let message = null;
  if (id !== "") {
    // check if ID does not exist
    if (isNaN(id as any)) {
      message = "Entity id can only be a number";
    } else {
      const foundEntity = state.find(entity => entity.type === type && entity.id === Number(id));
      if (!foundEntity) {
        message = errorMessage;
      }
    }
  }
  return message;
}

/**
 * if it can be parsed as a number e.g "3", return 3 else return the initial inputed string
 */
export const getNumberOrDefaultString = (param: string) => {
  // isNaN("") -> false
  if (param === '') return param;
  if (isNaN(param as any)) {
    return param;
  } else {
    return Number(param);
  }
}