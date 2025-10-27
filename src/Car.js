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
    return `${this.name} : ${this.totalDistance}`;
  }

  forwardAttepmt() {}
}
