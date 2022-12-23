import { arrayToSentece, readFileAsync } from "../utils"


describe("Testing all utility functions", () => {
  test('Read file asynchronously and return its text (content)', async () => {
    const FILE_CONTENT = 'READ THIS';
    const fileContent = await readFileAsync(new File([FILE_CONTENT], 'read.txt', { type: 'text/txt' }));
    expect(fileContent).toBe(FILE_CONTENT);
  });

  test('Convert array of strings into sentence separated by commas', () => {
    expect(arrayToSentece(['a', 'b', 'c'])).toBe("a, b, and c");
  })
})