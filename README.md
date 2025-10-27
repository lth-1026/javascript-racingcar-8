# javascript-racingcar-precourse

## 구현 기능 목록

- 자동차 객체 생성
  - 속성: 이름, 이동 거리
  - 메소드
    - forwardAttepmt
    - showDistance
- Race 객체 생성
  - 속성: 등록된 자동차, 동록 제한 수, 이동 횟수
  - 메소드
    - registerCars
    - race
    - showWinner
- 경주할 자동차 이름 입력 기능
  - 이름 5자 이하만 가능
  - 마지막 문자로 , 올 수 없음
  - 공백만으로 이루어진 이름 금지
  - 동일한 이름 금지
  - 입력에 문제 없으면 자동차 객체 배열 생성
- 시도할 횟수 입력 기능
  - 몇회로 제한 둘 것인가? 100회
- 자동차 움직이는 로직 구현
  - 랜덤값 받기
  - 조건에 맞으면 forward
- 우승자 출력
