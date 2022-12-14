export default class Airline {
  private readonly boardingWaitingLine: string[]; // 탑승 대기 줄
  private readonly _customersOnBoard: string[]; // 탑습 고객

  constructor() {
    this.boardingWaitingLine = []; // 탑승 대기 줄 초기화
    this._customersOnBoard = []; // 탑승 고객 초기화
  }

  // 탑승한 고객 가져오기
  get customersOnBoard() {
    return this._customersOnBoard;
  }

  // 탑승 대기 줄에 줄 서기
  addToLine(peopleId: string) {
    console.log(`${peopleId} - 줄서기를 했습니다.`);
    this.boardingWaitingLine.push(peopleId); // 줋서기

    // 체크인 하기
    this.checkIn((peopleId) => {
      console.log(`${peopleId} - 탑승이 시작했습니다.`);
      this.addCustomerOnBoard(peopleId); // 탑승 완료 시키기
    });
  }

  // 탑승한 인원으로 추가하기
  addCustomerOnBoard(peopleId: string) {
    setTimeout(() => {
      this._customersOnBoard.push(peopleId);
    }, 0);
  }

  // 출국 심사를 진행합니다.
  // 출국 심사는 출국심사원에 따라서 랜덤한 시간을 가집니다.
  immigration(callback: Function) {
    setTimeout(() => {
      console.log("출국 심사 중...");
      callback();
    }, Math.floor(Math.random() * 3 * 1000));
  }

  // 체크인 하기
  // 체크인은 시간이 걸립니다.
  checkIn(done: (peopleId: string) => void) {
    if (!this.boardingWaitingLine.length) {
      console.log("탑승 가능한 인원이 없습니다.");
      return;
    }

    const peopleId = this.boardingWaitingLine.shift(); // 대기줄에서 첫번째 사람을 탑승자로 지정한다.

    this.immigration(() => {
      if (peopleId)
        done(peopleId);
    });
  }
}
