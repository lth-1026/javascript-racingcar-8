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

describe("registerCars 함수 테스트 (getInput만 mock)", () => {
  test("정상 입력이면 cars에 저장하고 동일 배열을 반환한다", async () => {
    const race = new Race();

    // getInput()만 mock
    jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,jun");

    const result = await race.registerCars();

    expect(race.cars).toEqual(["pobi", "crong", "jun"]);
  });

  test("입력에 공백이 포함되어도 split 결과 그대로 저장한다(트림 없음)", async () => {
    const race = new Race();

    jest.spyOn(race, "getInput").mockResolvedValue(" pobi,crong, jun ");

    const result = await race.registerCars();

    expect(race.cars).toEqual([" pobi", "crong", " jun "]);
  });

  test("중복된 이름이 있으면 오류를 던진다", async () => {
    const race = new Race();

    jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,pobi");

    await expect(race.registerCars()).rejects.toThrow("[ERROR]");
  });
});
