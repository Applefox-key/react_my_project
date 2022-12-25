export class Expression {
  #expression;
  #phrase;
  #nextDate;
  #stage;
  #id;
  #history;

  constructor(expression) {
    this.#expression = expression.expression;
    this.#phrase = expression.phrase;
    this.#nextDate = new Date(expression.nextDate);
    this.#stage = expression.stage;
    this.#id = expression.id;
    if (expression.history === undefined) {
      this.#history = [];
      this.#history.push({ action: "add", date: new Date() });
    } else if (Array.isArray(expression.history))
      this.#history = expression.history;
    else this.#history = JSON.parse(expression.history);
  }

  get expression() {
    return this.#expression;
  }

  get id() {
    return this.#id;
  }
  get history() {
    return this.#history;
  }
  get historySort() {
    let history_ = this.#history;
    history_.sort((a, b) => {
      let a_ = typeof a.date === "number" ? a.date : new Date(a.date).getTime();
      let b_ = typeof b.date === "number" ? b.date : new Date(b.date).getTime();
      return b_ - a_ === 0 ? (a.action > b.action ? -1 : 1) : b_ - a_;
    });
    return history_;
  }
  get phrase() {
    return this.#phrase;
  }
  get stage() {
    return this.#stage;
  }
  get nextDate() {
    return this.#nextDate;
  }

  get exceededSkipsDays() {
    if (!this.started) return 0;
    let today = new Date();
    // let dt = this.#nextDate;

    let nextDay = new Date(this.#nextDate);
    console.log(nextDay);

    const oneDayinMs = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = today.getTime() - nextDay.getTime();
    const diffInDays = Math.round(diffInTime / oneDayinMs);
    return diffInDays < 0 ? 0 : diffInDays;
  }
  get exceededSkipsCount() {
    if (!this.started) return false;

    let st = this.#stage;

    const diffInDays = this.exceededSkipsDays;
    switch (diffInDays) {
      case 0:
        return false;
      case 1: {
        //check the history
        let his = this.historySort;
        // his.reverse();
        let count = 0;
        for (let i = 0; i < st; i++) {
          let act = his[i].action;
          if (act.includes("late")) count++;
          else if (act.includes("new try")) break;
        }

        return count > 0;
      }
      default:
        return true;
    }
  }

  get started() {
    return !!this.stage;
  }
  get hintForReading() {
    let result;
    //checking the date and set a hint for user
    if (this.alreadyRead) {
      //the text is already read
      result = [`the text has been read today`, false, 0];
    }

    //the text is not read today
    result = [
      `read the text ${this.stage < 7 ? "twice " : "thrice "}`,
      false,
      this.stage < 7 ? 2 : 3,
    ];
    //check the allert about late reading

    if (this.exceededSkipsCount) {
      result = [
        ` ☹ The number of deviations from the study plan has been exceeded. 
        The study will be started from the beginning! Read the text twice`,
        true,
        2,
      ];
    }
    return result;
  }

  get userHistory() {
    let result = [];

    try {
      let history_ = this.historySort;

      // history_.sort((a, b) => {
      //   let a_ =
      //     typeof a.date === "number" ? a.date : new Date(a.date).getTime();
      //   let b_ =
      //     typeof b.date === "number" ? b.date : new Date(b.date).getTime();
      //   return b_ - a_ === 0 ? (a.action > b.action ? -1 : 1) : b_ - a_;
      // });

      history_.forEach((item) => {
        let day = new Date(item.date).toString().slice(0, 10);
        result.push(`${item.action}: ${day}`);
      });
      return result;
    } catch (err) {
      return result;
    }
  }

  get studyPlan() {
    try {
      let stage_ = this.#stage;
      let nextDate_ = new Date(this.#nextDate);
      let result = [];

      if (!this.started) nextDate_ = new Date();
      let ShowDate = new Date(nextDate_);
      ShowDate.setDate(
        ShowDate.getDate() - (stage_ < 7 ? stage_ : stage_ < 8 ? 13 : 27)
      );
      for (let i = 0; i < 9; i++) {
        let nd = new Date().setHours(0, 0, 0, 0);
        let sd = new Date(ShowDate).setHours(0, 0, 0, 0);
        result.push(
          `Day ${i + 1}: ${ShowDate.toString().slice(0, 10)} ${
            stage_ - 1 >= i ? "✔" : sd < nd ? "☹" : ""
          }`
        );
        ShowDate.setDate(ShowDate.getDate() + (i < 6 ? 1 : i < 7 ? 7 : 14));
      }
      return result;
    } catch (err) {
      return [];
    }
  }
  newDateFormat(dt = new Date()) {
    if (typeof dt == "string" && dt[10] === "T") dt = dt.slice(0, 10);
    let nd = new Date(dt);
    nd.setHours(12, 0, 0, 0);
    return nd;
  }
  get setForUpdate() {
    let expression = {
      nextDate: this.nextDate,
      stage: this.stage,
      id: this.id,
      history: this.history,
    };
    const oneDayinMs = 1000 * 60 * 60 * 24;
    let expressionNextDate = !expression.started
      ? this.newDateFormat()
      : this.newDateFormat(expression.nextDate);

    let todayDate = this.newDateFormat();
    let diffInDays = this.exceededSkipsDays;
    if (this.exceededSkipsCount) {
      //reset progress
      expression.stage = 0;
      expression.nextDate = todayDate;
      expressionNextDate = this.newDateFormat();
      expression.history.push({
        action: `skipped training ( ${diffInDays} day${
          diffInDays === 1 ? "" : "s"
        }  )`,
        date: this.nextDate.getTime(),
      });
      expression.history.push({
        action: "new try",
        date: new Date().getTime(),
      });
      diffInDays = 0;
    }

    let act = diffInDays === 0 ? "read by the plan" : "read late";
    if (expression.history === undefined) {
      expression.history = [];
      expression.history.push({ action: "add", date: new Date().getTime() });
    }
    if (diffInDays !== 0)
      expression.history.push({
        action: `skipped training ( ${diffInDays} day${
          diffInDays === 1 ? "" : "s"
        }  )`,
        date: this.nextDate.getTime(),
      });

    expression.history.push({ action: act, date: new Date().getTime() });
    if (expression.stage < 6) {
      expressionNextDate.setTime(expressionNextDate.getTime() + oneDayinMs);
    } else if (expression.stage < 7) {
      expressionNextDate.setTime(expressionNextDate.getTime() + 7 * oneDayinMs);
    } else {
      expressionNextDate.setTime(
        expressionNextDate.getTime() + 14 * oneDayinMs
      );
    }

    expression.nextDate = expressionNextDate.getTime();
    ++expression.stage;
    return expression;
  }
}

try {
  module.exports = { Expression };
} catch (error) {}
