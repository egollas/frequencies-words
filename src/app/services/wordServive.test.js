const getHighFrecuencyWords = require("./wordService");
const {InvalidFileExt} = require("../errors/index");

describe("wordService", () => {
  describe("getHighFrecuencyWords", () => {
    test("returns empty list when file is empty", async () => {
      const result = await getHighFrecuencyWords("__tests__/fixtures/empty.txt", 3);
      expect(result).toEqual([]);
    });
    test("returns valid list when file is valid", async () => {
      const result = await getHighFrecuencyWords("__tests__/fixtures/valid.txt", 3);
      expectedResult = [
        { word: 'of', count: 3 },
        { word: 'is', count: 2 },
        { word: 'a', count: 2 }
      ]

      expect(result).toEqual(expectedResult);
    });

    test("returns valid list when file is a more complex file", async () => {
      const result = await getHighFrecuencyWords("__tests__/fixtures/complex.txt", 3);
      expectedResult = [
        { word: 'sed', count: 12 },
        { word: 'id', count: 10 },
        { word: 'sit', count: 8 }
      ];

      expect(result).toEqual(expectedResult);
    });
    test("throws error when file is invalid", async () => {
      await expect(getHighFrecuencyWords("__tests__/fixtures/other.doc", 3))
      .rejects
      .toThrowError(InvalidFileExt);
    });
    test("returns all the result when topN is undefined", async () => {
      const result = await getHighFrecuencyWords("__tests__/fixtures/valid.txt")
      const expectedResult = [
        { word: 'of', count: 3 },
        { word: 'is', count: 2 },
        { word: 'a', count: 2 },
        { word: 'lot', count: 2 },
        { word: 'different', count: 2 },
        { word: 'the', count: 1 },
        { word: 'short', count: 1 },
        { word: 'answer', count: 1 },
        { word: 'anywhere', count: 1 },
        { word: 'you', count: 1 },
        { word: 'want', count: 1 },
        { word: 'javascript', count: 1 },
        { word: 'has', count: 1 },
        { word: 'had', count: 1 },
        { word: 'stages', count: 1 },
        { word: 'in', count: 1 },
        { word: 'its', count: 1 },
        { word: 'life', count: 1 },
        { word: 'and', count: 1 },
        { word: 'types', count: 1 },
        { word: 'people', count: 1 },
        { word: 'using', count: 1 },
        { word: 'it', count: 1 },                                                                                                                                     { word: 'which', count: 1 },
        { word: 'probably', count: 1 },
        { word: 'why', count: 1 },
        { word: 'most', count: 1 },
        { word: 'tools', count: 1 },
        { word: 'these', count: 1 },
        { word: 'days', count: 1 },
        { word: 'are', count: 1 },
        { word: 'highly', count: 1 },
        { word: 'configurable', count: 1 },
        { word: 'to', count: 1 },
        { word: 'allow', count: 1 },
        { word: 'for', count: 1 },
        { word: 'personalization', count: 1 },
        { word: 'customization', count: 1 }
      ]
      expect(result).toEqual(expectedResult);
    });
  });
});
