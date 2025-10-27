import Race from "./Race.js";

class App {
  async run() {
    const race = new Race();
    await race.registerCars();
    await race.setStop();
    race.start();
  }
}

export default App;
