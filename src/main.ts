import './style.css';
// 課題１と課題２の共通クラス
class BaseClass {
  // 閏年かどうかを判定する
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // 今年何日を経過したかを取得する
  private getDays(nowDate: string): number {
    const arr = nowDate.split('-');
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
  protected getPassedDays(startDate: string, endDate: string): number {
    // 何年経った
    const baseYear = Number(startDate.split('-')[0]);
    const inputYear = Number(endDate.split('-')[0]);
    const passedYear =
      Math.abs(inputYear - baseYear) === 0
        ? 0
        : Math.abs(inputYear - baseYear) - 1;
    if (passedYear !== 0) {
      const passedYearNumber: number[] = [];
      for (let i = 0; i <= passedYear; i++) {
        passedYearNumber.push(baseYear + i);
      }
      const passedYearDays = passedYearNumber.reduce((acc, cur) => {
        return acc + (this.isLeapYear(cur) ? 366 : 365);
      }, 0);
      return (
        passedYearDays + this.getDays(endDate) - this.getDays(startDate) + 1
      );
    } else {
      return this.getDays(endDate) - this.getDays(startDate) + 1;
    }
  }
}

// 課題１
class HomeWork1 extends BaseClass {
  public baseDate: string[];
  public inputTag: HTMLInputElement;
  public userInput?: string;
  public outputTag: HTMLElement;
  constructor(baseDate: string[]) {
    super();
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
  protected getResult(): void {
    // 基準日から経過した日数
    const passedDays = this.getPassedDays(this.baseDate[0], this.userInput!);
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
    const yobi = useryobi[(totalDays - 1) % 7];
    return yobi;
  }
}
// 課題１の初期化
new HomeWork1(['2000-1-1', '土']);

// 課題２
class HomeWork2 extends BaseClass {
  public startDateInput: HTMLInputElement;
  public endDateInput: HTMLInputElement;
  public btn: HTMLButtonElement;
  public outputTag: HTMLElement;
  public startDate?: string;
  public endDate?: string;
  constructor() {
    super();
    this.startDateInput = document.querySelector('.start')!;
    this.endDateInput = document.querySelector('.end')!;
    this.btn = document.querySelector('.btn')!;
    this.outputTag = document.querySelector('.result2')!;
    this.init();
  }

  protected init(): void {
    this.btn.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('keydown', e => {
      e.code === 'Enter' && this.onClick();
    });
  }

  protected onClick(): void {
    this.startDate = this.startDateInput.value;
    this.endDate = this.endDateInput.value;
    this.getResult();
  }

  protected getResult(): void {
    const result = this.getPassedDays(this.startDate!, this.endDate!);
    result
      ? (this.outputTag.innerHTML = `${result.toString()}日です。`)
      : (this.outputTag.innerHTML = '正しい年月日を入力してください');
  }
}

// 課題2の初期化
new HomeWork2();
