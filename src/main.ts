import './style.css';
class HomeWork1 {
  public baseDate: string[];
  protected inputTag: HTMLInputElement;
  protected userInput?: string;
  protected outputTag: HTMLElement;
  constructor(baseDate: string[]) {
    this.baseDate = baseDate;
    // 入力フォームを取得
    this.inputTag = document.querySelector('.work1')!;
    this.inputTag.addEventListener('change', this.onChange.bind(this));
    // 出力要素を取得
    this.outputTag = document.querySelector('.result1')!;
  }
  // ユーザーが入力した日付を取得する
  protected onChange(): void {
    this.userInput = this.inputTag.value;
    this.getResult();
  }

  // 結果
  public getResult(): void {
    // 基準日から経過した日数
    const passedDays = this.getPassedDays();
    // 曜日を取得する
    const yobi = this.getYobi(passedDays);
    // 結果を出力する
    const year = this.userInput && this.userInput.split('-')[0];
    const month = this.userInput && this.userInput.split('-')[1];
    const day = this.userInput && this.userInput.split('-')[2];
    yobi
      ? (this.outputTag.innerHTML = `${year}年${month}月${day}日は${yobi}曜日です`)
      : (this.outputTag.innerHTML = '正しい年月日を入力してください');
  }

  // 閏年かどうかを判定する
  protected isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // 今年何日を経過したかを取得する
  protected getDays(): number {
    const arr = this.userInput!.split('-');
    let days = Number(arr[2]);
    const month = Number(arr[1]);
    const year = Number(arr[0]);
    // 一月ならその日数を返す
    if (month === 1) {
      return days;
    }
    // 一月以外ならその月の日数を足す
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < month - 1; i++) {
      days += monthDays[i];
    }
    // 閏年2月
    if (this.isLeapYear(year) && month > 2) {
      days++;
    }
    return days;
  }
  // 基準日から経過した日数を取得する
  protected getPassedDays(): number {
    // 何年経った
    const baseYear = Number(this.baseDate[0].split('-')[0]);
    const inputYear = Number(this.userInput!.split('-')[0]);
    const passedYear = Math.abs(inputYear - baseYear) - 1;
    const passedYearNumber: number[] = [];
    for (let i = 0; i <= passedYear; i++) {
      passedYearNumber.push(baseYear + i);
    }
    const passedYearDays = passedYearNumber.reduce((acc, cur) => {
      return acc + (this.isLeapYear(cur) ? 366 : 365);
    }, 0);
    return passedYearDays + this.getDays();
  }

  // 曜日を取得する
  protected getYobi(totalDays: number): string {
    const baseyobi = ['日', '月', '火', '水', '木', '金', '土'];
    const useryobi = [this.baseDate[1]];
    const j = baseyobi.findIndex(e => e === useryobi[0]);
    for (let i = 1; i < 7; i++) {
      let index = j + i;
      if (index > 6) {
        index = index - 7;
      }
      useryobi.push(baseyobi[index]);
    }
    // 最後の計算、その日自身を消すために-1する
    const yobi = useryobi[(totalDays - 1) % 7];
    return yobi;
  }
}
new HomeWork1(['2000-1-1', '土']);

class HomeWork2 {
  public startDateInput: HTMLInputElement;
  public endDateInput: HTMLInputElement;
  public btn: HTMLButtonElement;
  public startDate?: string;
  public endDate?: string;
  constructor() {
    this.startDateInput = document.querySelector('.start')!;
    this.endDateInput = document.querySelector('.end')!;
    this.btn = document.querySelector('.btn')!;
    this.init();
  }

  protected init(): void {
    this.btn.addEventListener('click', this.onClick.bind(this));
  }

  protected onClick(): void {
    this.startDate = this.startDateInput.value;
    this.endDate = this.endDateInput.value;
    // this.getResult();
  }
}
new HomeWork2();
