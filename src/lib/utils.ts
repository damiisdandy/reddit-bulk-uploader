
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