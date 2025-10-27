import { Console } from "@woowacourse/mission-utils";
import { validateInput } from "./utils/validators.js";

class App {
  async run() {
    const input = await this.getInput();
  }

  async getInput() {
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    validateInput(input);
    return input;
  }
}

export default App;
