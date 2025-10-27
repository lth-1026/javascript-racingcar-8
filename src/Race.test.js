import Race from "./Race.js";
import Car from "./Car.js";
import { Console } from "@woowacourse/mission-utils";

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

    await race.registerCars();

    expect(race.cars).toHaveLength(3);
    expect(race.cars[1]).toBeInstanceOf(Car);
    expect(race.cars.map((car) => car.name)).toEqual(["pobi", "crong", "jun"]);
  });

  test("입력에 공백이 포함되어도 split 결과 그대로 저장한다(트림 없음)", async () => {
    const race = new Race();

    jest.spyOn(race, "getInput").mockResolvedValue(" pobi,crong, jun ");

    await race.registerCars();

    expect(race.cars.map((car) => car.name)).toEqual([
      " pobi",
      "crong",
      " jun ",
    ]);
  });

  test("중복된 이름이 있으면 오류를 던진다", async () => {
    const race = new Race();

    jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,pobi");

    await expect(race.registerCars()).rejects.toThrow("[ERROR]");
  });
});

describe("isPossibleStop 함수 테스트", () => {
  test("입력된 stop이 maxStop 이하이면 통과한다", () => {
    const race = new Race(5);
    expect(() => race.isPossibleStop(5)).not.toThrow();
    expect(() => race.isPossibleStop(3)).not.toThrow();
  });

  test("입력된 stop이 maxStop보다 크면 에러를 던진다", () => {
    const race = new Race(5);
    expect(() => race.isPossibleStop(6)).toThrow(
      "5 보다 큰 수가 올 수 없습니다."
    );
  });
});

describe("setStop 함수 테스트 (getStop만 mock)", () => {
  test("정상 입력값이면 stop 속성에 저장된다", async () => {
    const race = new Race(5);
    // getStop만 mock해서 3을 반환
    jest.spyOn(race, "inputStop").mockResolvedValue(3);

    await race.setStop();

    expect(race.stop).toBe(3); // #stop getter로 확인
  });

  test("입력값이 maxStop보다 크면 에러를 던진다", async () => {
    const race = new Race(5);
    jest.spyOn(race, "inputStop").mockResolvedValue(10);

    await expect(race.setStop()).rejects.toThrow(
      "5 보다 큰 수가 올 수 없습니다."
    );
  });
});

describe("Race 라운드 관련 메서드 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("runRound", () => {
    test("각 자동차에 대해 forwardAttepmt를 1회씩 호출한다", async () => {
      const race = new Race();

      // 자동차 등록 (getInput만 mock)
      jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,jun");
      await race.registerCars();

      const spyForwardAttempt = jest.spyOn(Car.prototype, "forwardAttepmt");

      race.runRound();

      // 3대의 자동차 각각 1회 호출
      expect(spyForwardAttempt).toHaveBeenCalledTimes(3);
    });
  });

  describe("showRoundResult", () => {
    test("각 자동차의 showDistance를 1회씩 호출한다", async () => {
      const race = new Race();

      jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong");
      await race.registerCars();

      const spyShowDistance = jest.spyOn(Car.prototype, "showDistance");

      race.showRoundResult();

      expect(spyShowDistance).toHaveBeenCalledTimes(2);
    });
  });

  describe("start", () => {
    test("시작 메시지를 출력하고, stop 횟수만큼 runRound와 showRoundResult를 호출한다", async () => {
      const race = new Race();

      // 입력 설정: 자동차 2대 등록 + stop=3
      jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong");
      await race.registerCars();

      jest.spyOn(race, "inputStop").mockResolvedValue(3);
      await race.setStop();

      // runRound / showRoundResult 호출 감시
      const spyRunRound = jest.spyOn(race, "runRound");
      const spyShowRoundResult = jest.spyOn(race, "showRoundResult");

      // Console.print는 출력만 막고 호출 인자만 확인
      const printSpy = jest
        .spyOn(Console, "print")
        .mockImplementation(() => {});

      race.start();

      // 시작 메시지 1회
      expect(printSpy).toHaveBeenCalledWith("\n실행 결과");

      // stop=3 → 각 3회씩 호출
      expect(spyRunRound).toHaveBeenCalledTimes(3);
      expect(spyShowRoundResult).toHaveBeenCalledTimes(3);

      // 매 라운드 끝마다 빈 줄 출력("") → 3회
      const blankLineCalls = printSpy.mock.calls.filter(([arg]) => arg === "");
      expect(blankLineCalls).toHaveLength(3);
    });
  });
});
