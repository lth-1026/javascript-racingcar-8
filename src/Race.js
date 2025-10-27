import {
  checkDuplicateValues,
  checkEmptyValues,
  isNumber,
  validateInput,
} from "./utils/validators.js";
import Car from "./Car.js";
import { Console } from "@woowacourse/mission-utils";

export default class Race {
  #cars = [];
  #maxStop;
  #stop;

  constructor(maxStop = 100) {
    this.#maxStop = maxStop;
  }

  async registerCars() {
    const input = await this.getInput();
    const notValidatedCars = this.splitInput(input);
    const validatedCars = checkDuplicateValues(notValidatedCars);
    this.#cars = this.createCars(validatedCars);
  }

  async setStop() {
    const stop = await this.inputStop();
    this.isPossibleStop(stop);
    this.#stop = stop;
  }

  get cars() {
    return this.#cars;
  }

  get stop() {
    return this.#stop;
  }

  async getInput() {
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    validateInput(input);
    return input;
  }

  async inputStop() {
    const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
    return isNumber(input);
  }

  isPossibleStop(stop) {
    if (stop > this.#maxStop) {
      throw Error(`${this.#maxStop} 보다 큰 수가 올 수 없습니다.`);
    }
  }

  splitInput(input) {
    const cars = input.split(",");
    checkEmptyValues(cars);
    return cars;
  }

  createCars(cars) {
    return cars.map((car) => new Car(car));
  }
}
