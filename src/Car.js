import { Console, MissionUtils } from "@woowacourse/mission-utils";
export default class Car {
  #name;
  #totalDistance = "";

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get totalDistance() {
    return this.#totalDistance;
  }

  showDistance() {
    Console.print(`${this.name} : ${this.totalDistance}`);
  }

  forwardAttepmt() {
    if (this.isPossibleForward()) {
      this.forward();
    }
  }

  isPossibleForward() {
    const randomNumber = this.getRandomNumber();

    if (randomNumber >= 4) {
      return true;
    } else {
      return false;
    }
  }

  forward() {
    this.#totalDistance += "-";
  }

  getRandomNumber() {
    return MissionUtils.Random.pickNumberInRange(0, 9);
  }
}
