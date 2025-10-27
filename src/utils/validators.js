export function validateEmpty(input) {
  if (!input || input.trim() === "") {
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

export function checkEmptyValues(arr) {
  if (!Array.isArray(arr)) {
    throw Error("[ERROR] 입력값이 배열이 아닙니다.");
  }

  const hasEmpty = arr.some(
    (item) => typeof item === "string" && item.trim() === ""
  );

  if (hasEmpty) {
    throw Error("[ERROR] 배열에 빈 문자열이 포함되어 있습니다.");
  }
}
