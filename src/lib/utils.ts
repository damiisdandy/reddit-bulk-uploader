
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