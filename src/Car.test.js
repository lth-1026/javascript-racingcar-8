import Car from "./Car";
import { Console } from "@woowacourse/mission-utils";

describe("Car 클래스 테스트", () => {
  test("Car 객체 생성 테스트", () => {
    expect(new Car("pobi")).toBeInstanceOf(Car);
  });

  test("Car 객체 name 설정 테스트", () => {
    expect(new Car("pobi").name).toBe("pobi");
    expect(new Car("pobi").name).not.toBe("pony");
  });

  test("Car 객체 name 변경 불가 테스트", () => {
    const car = new Car("pobi");
    expect(() => (car.name = "crong")).toThrow();
  });

  test("Car 객체 totalDistance 변경 불가 테스트", () => {
    const car = new Car("pobi");
    expect(() => (car.totalDistance = "--")).toThrow();
  });
});

describe("Car 동작 메서드 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("showDistance()는 Console.print로 현재 상태를 출력한다", () => {
    const car = new Car("pobi");
    const printSpy = jest.spyOn(Console, "print").mockImplementation(() => {});

    car.showDistance();

    expect(printSpy).toHaveBeenCalledWith("pobi : ");
  });

  test("forward()는 이동 표시('-')를 1칸 늘린다(출력으로 검증)", () => {
    const car = new Car("pobi");
    const printSpy = jest.spyOn(Console, "print").mockImplementation(() => {});

    car.forward(); // 1칸 이동
    car.showDistance(); // 출력 확인

    expect(printSpy).toHaveBeenLastCalledWith("pobi : -");
  });

  test("forwardAttepmt()는 isPossibleForward()가 true면 forward()를 호출한다", () => {
    const car = new Car("pobi");
    jest.spyOn(car, "isPossibleForward").mockReturnValue(true);
    const forwardSpy = jest.spyOn(car, "forward");

    car.forwardAttepmt();

    expect(forwardSpy).toHaveBeenCalledTimes(1);
  });

  test("forwardAttepmt()는 isPossibleForward()가 false면 forward()를 호출하지 않는다", () => {
    const car = new Car("pobi");
    jest.spyOn(car, "isPossibleForward").mockReturnValue(false);
    const forwardSpy = jest.spyOn(car, "forward");

    car.forwardAttepmt();

    expect(forwardSpy).not.toHaveBeenCalled();
  });

  test("isPossibleForward()는 getRandomNumber()가 4 이상이면 true를 반환한다", () => {
    const car = new Car("pobi");
    jest.spyOn(car, "getRandomNumber").mockReturnValue(4);

    expect(car.isPossibleForward()).toBe(true);
  });

  test("isPossibleForward()는 getRandomNumber()가 3 이하면 false를 반환한다", () => {
    const car = new Car("pobi");
    jest.spyOn(car, "getRandomNumber").mockReturnValue(3);

    expect(car.isPossibleForward()).toBe(false);
  });
});
