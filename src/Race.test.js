import Race from "./Race.js";

describe("splitInput 함수 테스트", () => {
  test("쉼표로 구분된 문자열을 배열로 변환한다", () => {
    const race = new Race();
    const input = "pobi,crong,jun";
    const result = race.splitInput(input);

    // checkEmptyValues 내부에서도 문제 없으면 에러 없이 통과
    expect(result).toEqual(["pobi", "crong", "jun"]);
  });

  test("쉼표로 구분된 공백이 있는 문자열을 배열로 변환한다", () => {
    const race = new Race();
    const input = " pobi,crong, jun ";
    const result = race.splitInput(input);

    // checkEmptyValues 내부에서도 문제 없으면 에러 없이 통과
    expect(result).toEqual([" pobi", "crong", " jun "]);
  });

  test("빈 문자열이 포함되어 있으면 에러를 던진다", () => {
    const race = new Race();

    expect(() => race.splitInput("pobi,,jun")).toThrow("[ERROR]");
    expect(() => race.splitInput("pobi,    ,jun")).toThrow("[ERROR]");
  });
});
