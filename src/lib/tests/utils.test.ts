import { MOCK_STATE } from "../constants";
import { arrayToSentece, findEntityById, getNumberOrDefaultString, readFileAsync } from "../utils"


describe("Testing all utility functions", () => {
  test('Read file asynchronously and return its text (content)', async () => {
    const FILE_CONTENT = 'READ THIS';
    const fileContent = await readFileAsync(new File([FILE_CONTENT], 'read.txt', { type: 'text/txt' }));
    expect(fileContent).toBe(FILE_CONTENT);
  });

  test('Convert array of strings into sentence separated by commas', () => {
    expect(arrayToSentece(['a', 'b', 'c'])).toBe("a, b, and c");
  })

  test("Check if entity exists in global state, by manually inputing global state and entity's id", () => {
    expect(findEntityById('1', 'campaign', MOCK_STATE, 'Entity does not exist')).toBeNull();
    expect(findEntityById('5', 'campaign', MOCK_STATE, 'Entity does not exist')).toBe('Entity does not exist');
  })

  test('If string can be parsed to number return number else return initial string', () => {
    expect(getNumberOrDefaultString('2')).toBe(2);
    expect(getNumberOrDefaultString('a')).toBe('a');
    expect(getNumberOrDefaultString('')).toBe('');
  });
})