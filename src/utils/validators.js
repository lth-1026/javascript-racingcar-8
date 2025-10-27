export function validateEmpty(input) {
  if (!input || input === "") {
    throw Error("[ERROR] 값을 입력해주세요.");
  }
}

export function validateInput(input) {
  validateEmpty(input);

  const regex = /^([^,]{1,5})(,([^,]{1,5}))*$/;
  if (!regex.test(input)) {
    throw Error(
      "[ERROR] 이름은 쉼표(,)로 구분하며, 각 이름은 1~5자여야 합니다."
    );
  }
}
