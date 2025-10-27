import Car from "./Car";
import { Console } from "@woowacourse/mission-utils";

describe("Car 클래스 테스트", () => {
  test.each(["pobi", "crong", "jun"])(
    "Car 객체 생성 및 name 설정 (%s)",
    (name) => {
      const car = new Car(name);
      expect(car).toBeInstanceOf(Car);
      expect(car.name).toBe(name);
    }
  );

  test.each([
    ["pobi", "pony"],
    ["crong", "pobi"],
  ])("name이 다른 값으로 변경 불가 (%s → %s)", (orig, next) => {
    const car = new Car(orig);
    expect(() => (car.name = next)).toThrow();
  });

  test.each([
    ["pobi", "--"],
    ["crong", "-"],
  ])("totalDistance 변경 불가 (%s, %s)", (name, nextDistance) => {
    const car = new Car(name);
    expect(() => (car.totalDistance = nextDistance)).toThrow();
  });
});

describe("Car 동작 메서드 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    ["pobi", "pobi : "],
    ["crong", "crong : "],
  ])(
    "showDistance()는 Console.print로 현재 상태를 출력한다 (%s)",
    (name, expected) => {
      const car = new Car(name);
      const printSpy = jest
        .spyOn(Console, "print")
        .mockImplementation(() => {});
      car.showDistance();
      expect(printSpy).toHaveBeenCalledWith(expected);
    }
  );

  test.each([
    ["pobi", "pobi : -"],
    ["crong", "crong : -"],
  ])(
    "forward()는 이동 표시('-')를 1칸 늘린다 (%s)",
    (name, expectedLastPrint) => {
      const car = new Car(name);
      const printSpy = jest
        .spyOn(Console, "print")
        .mockImplementation(() => {});
      car.forward();
      car.showDistance();
      expect(printSpy).toHaveBeenLastCalledWith(expectedLastPrint);
    }
  );

  describe.each([
    [true, 1, "isPossibleForward()가 true면 forward() 호출"],
    [false, 0, "isPossibleForward()가 false면 forward() 미호출"],
  ])("forwardAttepmt() 동작 분기", (canMove, calledTimes, title) => {
    test(title, () => {
      const car = new Car("pobi");
      jest.spyOn(car, "isPossibleForward").mockReturnValue(canMove);
      const forwardSpy = jest.spyOn(car, "forward");
      car.forwardAttepmt();
      expect(forwardSpy).toHaveBeenCalledTimes(calledTimes);
    });
  });

  test.each([
    [4, true],
    [9, true],
    [3, false],
    [0, false],
  ])(
    "isPossibleForward() 경계값: getRandomNumber()=%d → %s",
    (rnd, expected) => {
      const car = new Car("pobi");
      jest.spyOn(car, "getRandomNumber").mockReturnValue(rnd);
      expect(car.isPossibleForward()).toBe(expected);
    }
  );
});
