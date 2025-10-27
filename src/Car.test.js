import Car from "./Car";

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

  test("Car 객체 showDistance 메서드 테스트", () => {
    const car = new Car("pobi");
    expect(car.showDistance()).toBe("pobi : ");
  });
});
