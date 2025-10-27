import Race from "./Race.js";
import Car from "./Car.js";
import { Console } from "@woowacourse/mission-utils";

describe("splitInput 함수 테스트", () => {
  const race = new Race();

  test.each([
    ["pobi,crong,jun", ["pobi", "crong", "jun"]],
    [" pobi,crong, jun ", [" pobi", "crong", " jun "]],
  ])("입력 '%s' → %j로 변환한다", (input, expected) => {
    expect(race.splitInput(input)).toEqual(expected);
  });

  test.each(["pobi,,jun", "pobi,    ,jun"])(
    "입력 '%s' → 빈 문자열 포함 시 [ERROR] 발생",
    (input) => {
      expect(() => race.splitInput(input)).toThrow("[ERROR]");
    }
  );
});

describe.each([
  ["pobi,crong,jun", ["pobi", "crong", "jun"]],
  [" pobi,crong, jun ", [" pobi", "crong", " jun "]],
])("registerCars('%s')", (input, expected) => {
  test("자동차 이름 배열로 Car 객체를 생성해 저장한다", async () => {
    const race = new Race();
    jest.spyOn(race, "getInput").mockResolvedValue(input);
    await race.registerCars();

    expect(race.cars).toHaveLength(expected.length);
    expect(race.cars[0]).toBeInstanceOf(Car);
    expect(race.cars.map((c) => c.name)).toEqual(expected);
  });
});

test("registerCars(): 중복된 이름이 있으면 오류 발생", async () => {
  const race = new Race();
  jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,pobi");
  await expect(race.registerCars()).rejects.toThrow("[ERROR]");
});

describe.each([
  [5, 5, false], // 5는 5 이하 → 통과
  [5, 3, false], // 3은 5 이하 → 통과
  [5, 6, true], // 6은 5보다 큼 → 에러
])(
  "isPossibleStop(maxStop=%d, inputStop=%d)",
  (maxStop, inputStop, shouldThrow) => {
    test(`입력된 stop이 ${
      shouldThrow ? "maxStop보다 크면 에러" : "허용 범위면 통과"
    }`, () => {
      const race = new Race(maxStop);
      const fn = () => race.isPossibleStop(inputStop);

      if (shouldThrow)
        expect(fn).toThrow(`${maxStop} 보다 큰 수가 올 수 없습니다.`);
      else expect(fn).not.toThrow();
    });
  }
);

describe("setStop 함수 테스트 (getStop만 mock)", () => {
  test.each([
    [3, 5, false], // 정상 입력
    [10, 5, true], // maxStop 초과
  ])("입력값 %d, maxStop %d", async (inputStop, maxStop, shouldThrow) => {
    const race = new Race(maxStop);
    jest.spyOn(race, "inputStop").mockResolvedValue(inputStop);

    if (shouldThrow)
      await expect(race.setStop()).rejects.toThrow(
        `${maxStop} 보다 큰 수가 올 수 없습니다.`
      );
    else {
      await race.setStop();
      expect(race.stop).toBe(inputStop);
    }
  });
});

describe("Race 라운드 관련 메서드 테스트", () => {
  afterEach(() => jest.restoreAllMocks());

  test("runRound: 각 자동차에 대해 forwardAttepmt를 호출한다", async () => {
    const race = new Race();
    jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,jun");
    await race.registerCars();

    const spy = jest.spyOn(Car.prototype, "forwardAttepmt");
    race.runRound();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test("showRoundResult: 각 자동차의 showDistance를 호출한다", async () => {
    const race = new Race();
    jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong");
    await race.registerCars();

    const spy = jest.spyOn(Car.prototype, "showDistance");
    race.showRoundResult();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test.each([1, 3, 5])(
    "start: stop=%d이면 runRound와 showRoundResult가 해당 횟수만큼 호출된다",
    async (stopCount) => {
      const race = new Race();
      jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong");
      await race.registerCars();

      jest.spyOn(race, "inputStop").mockResolvedValue(stopCount);
      await race.setStop();

      const runSpy = jest.spyOn(race, "runRound");
      const showSpy = jest.spyOn(race, "showRoundResult");
      const printSpy = jest
        .spyOn(Console, "print")
        .mockImplementation(() => {});

      race.start();

      expect(printSpy).toHaveBeenCalledWith("\n실행 결과");
      expect(runSpy).toHaveBeenCalledTimes(stopCount);
      expect(showSpy).toHaveBeenCalledTimes(stopCount);
    }
  );
});

describe("우승자 관련 메서드 테스트", () => {
  afterEach(() => jest.restoreAllMocks());

  async function setupRace() {
    const race = new Race();
    jest.spyOn(race, "getInput").mockResolvedValue("pobi,crong,jun");
    await race.registerCars();

    const [pobi, crong, jun] = race.cars;
    for (let i = 0; i < 3; i++) pobi.forward();
    for (let i = 0; i < 5; i++) crong.forward();
    for (let i = 0; i < 5; i++) jun.forward();
    return race;
  }

  test("findMaxDistance(): 최대 거리 반환", async () => {
    const race = await setupRace();
    expect(race.findMaxDistance()).toBe(5);
  });

  test("getWinners(): 최대 거리 자동차 이름 배열 반환", async () => {
    const race = await setupRace();
    expect(race.getWinners(race.findMaxDistance())).toEqual(["crong", "jun"]);
  });

  test.each([
    [["crong", "jun"], "최종 우승자 : crong, jun"],
    [["pobi"], "최종 우승자 : pobi"],
  ])("showWinner(): %j → '%s' 출력", async (winners, expectedMessage) => {
    const race = new Race();
    const spyPrint = jest.spyOn(Console, "print").mockImplementation(() => {});
    jest.spyOn(race, "getWinners").mockReturnValue(winners);

    race.showWinner();

    expect(spyPrint).toHaveBeenCalledWith(expectedMessage);
  });
});
