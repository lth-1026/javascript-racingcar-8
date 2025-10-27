import {
  validateEmpty,
  validateInput,
  checkEmptyValues,
  checkDuplicateValues,
  isNumber,
} from "./validators";

describe("validateEmpty", () => {
  test.each(["", "   ", null, undefined])(
    "빈값('%s')이면 에러를 던진다",
    (val) => {
      expect(() => validateEmpty(val)).toThrow("[ERROR]");
    }
  );

  test.each(["pobi", "0", " false "])(
    "값('%s')이 존재하면 에러를 던지지 않는다",
    (val) => {
      expect(() => validateEmpty(val)).not.toThrow();
    }
  );
});

describe("validateInput", () => {
  test.each(["pobi,crong,jun", "pobi, jun"])(
    "유효한 입력('%s')이면 통과한다",
    (input) => {
      expect(() => validateInput(input)).not.toThrow();
    }
  );

  test.each([
    "", // 빈 문자열
    "pobi,", // 끝이 쉼표
    "pobiddd,crong", // 6자 초과
    "pobi,,crong", // 빈 이름 포함
  ])("잘못된 입력('%s')이면 에러를 던진다", (input) => {
    expect(() => validateInput(input)).toThrow("[ERROR]");
  });
});

describe("checkEmptyValues", () => {
  describe.each([["pobi"], [null], [undefined], [123]])(
    "배열이 아닐 경우 (%s)",
    (val) => {
      test("에러를 던진다", () => {
        expect(() => checkEmptyValues(val)).toThrow("[ERROR]");
      });
    }
  );

  test.each([[["pobi", "", "jun"]], [["pobi", "  ", "crong"]]])(
    "배열에 빈 문자열/공백만 있으면 에러 (%j)",
    (arr) => {
      expect(() => checkEmptyValues(arr)).toThrow("[ERROR]");
    }
  );

  test.each([[["pobi", "crong", "jun"]], [[" a ", "b", "c"]]])(
    "모든 요소가 유효하면 통과 (%j)",
    (arr) => {
      expect(() => checkEmptyValues(arr)).not.toThrow();
    }
  );
});

describe("checkDuplicateValues", () => {
  test.each([
    [["pobi", "pobi", "jun"], true],
    [["pobi", "crong", "jun"], false],
  ])("중복 검사 (%j) → 에러:%s", (arr, shouldThrow) => {
    const act = () => checkDuplicateValues(arr);
    shouldThrow ? expect(act).toThrow("[ERROR]") : expect(act).not.toThrow();
  });

  test.each([
    [[" pobi", "pobi "]], // 공백 위치 달라도 값 자체는 다름(트림을 안 하는 정책 기준)
  ])("공백 위치만 다른 값은 허용 (%j)", (arr) => {
    expect(() => checkDuplicateValues(arr)).not.toThrow();
  });
});

describe("isNumber", () => {
  test.each(["", "   ", null, undefined])("빈값('%s')이면 에러", (val) => {
    expect(() => isNumber(val)).toThrow("[ERROR]");
  });

  test.each(["abc", "1a", NaN, Infinity])("숫자가 아니면 에러 (%s)", (val) => {
    expect(() => isNumber(val)).toThrow("[ERROR]");
  });

  test.each([
    [5, 5],
    ["5", 5],
    [" 10 ", 10],
    [0, 0],
  ])("숫자/숫자문자('%s')이면 %s 반환", (input, expected) => {
    expect(isNumber(input)).toBe(expected);
  });
});
