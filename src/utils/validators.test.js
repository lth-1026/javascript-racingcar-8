import { validateEmpty, validateInput } from "./validators";

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
