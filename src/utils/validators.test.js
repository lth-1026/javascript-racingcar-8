import { validateEmpty, validateInput, checkEmptyValues } from "./validators";

describe("validateEmpty", () => {
  test("빈 문자열이면 에러를 던진다", () => {
    expect(() => validateEmpty("")).toThrow("[ERROR]");
    expect(() => validateEmpty("   ")).toThrow("[ERROR]");
    expect(() => validateEmpty(null)).toThrow("[ERROR]");
    expect(() => validateEmpty(undefined)).toThrow("[ERROR]");
  });

  test("값이 존재하면 에러를 던지지 않는다", () => {
    expect(() => validateEmpty("pobi")).not.toThrow();
  });
});

describe("validateInput", () => {
  test("유효한 입력이면 통과한다", () => {
    expect(() => validateInput("pobi,crong,jun")).not.toThrow();
    expect(() => validateInput("pobi, jun")).not.toThrow(); // 공백 포함 허용
  });

  test("빈 문자열이면 에러를 던진다", () => {
    expect(() => validateInput("")).toThrow("[ERROR]");
  });

  test("쉼표로 끝나면 에러를 던진다", () => {
    expect(() => validateInput("pobi,")).toThrow("[ERROR]");
  });

  test("이름이 5자를 초과하면 에러를 던진다", () => {
    expect(() => validateInput("pobiddd,crong")).toThrow("[ERROR]");
  });

  test("빈 이름이 있으면 에러를 던진다", () => {
    expect(() => validateInput("pobi,,crong")).toThrow("[ERROR]");
  });
});

describe("checkEmptyValues", () => {
  test("배열이 아닐 경우 에러를 던진다", () => {
    expect(() => checkEmptyValues("pobi")).toThrow("[ERROR]");
    expect(() => checkEmptyValues(null)).toThrow("[ERROR]");
    expect(() => checkEmptyValues(undefined)).toThrow("[ERROR]");
    expect(() => checkEmptyValues(123)).toThrow("[ERROR]");
  });

  test("배열에 빈 문자열 또는 공백만 있는 요소가 있으면 에러를 던진다", () => {
    expect(() => checkEmptyValues(["pobi", "", "jun"])).toThrow("[ERROR]");
    expect(() => checkEmptyValues(["pobi", "  ", "crong"])).toThrow("[ERROR]");
  });

  test("모든 요소가 유효한 문자열이면 에러를 던지지 않는다", () => {
    expect(() => checkEmptyValues(["pobi", "crong", "jun"])).not.toThrow();
    expect(() => checkEmptyValues([" a ", "b", "c"])).not.toThrow();
  });
});
