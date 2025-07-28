// status	string	"new", "active", "paused", "completed"
// inQueue	boolean	user added phrase to the potential tasks pool
export class Expression {
  #expression;
  #phrase;
  #nextDate;
  #stage;
  #id;
  #history;
  #labelid;
  #label;
  #note;
  #status;
  #inQueue;
  constructor(expression) {
    this.#expression = expression.expression;
    this.#phrase = expression.phrase;
    this.#nextDate = new Date(expression.nextDate);
    this.#stage = expression.stage;
    this.#id = expression.id;
    this.#labelid = expression.labelid;
    this.#label = expression.label;
    this.#note = expression.note;
    this.#status = expression.status || "new";
    this.#inQueue = !!expression.inQueue;
    if (expression.history === undefined) {
      this.#history = [];
      this.#history.push({ action: "add", date: new Date() });
    } else if (Array.isArray(expression.history))
      this.#history = expression.history;
    else this.#history = JSON.parse(expression.history);
  }

  #getHistoryEvent(key) {
    const templates = {
      readLate: "read late",
      readByPlan: "read by the plan",
      finished: "the training is completed",
      paused: "paused by user",
      resumeAndContinue: "resumed by user (continue)",
      resumeAndNewTry: "resumed by user (new try)",
      activated: "activated by user",
    };

    if (!templates[key]) {
      throw new Error(`Unknown history event key: "${key}"`);
    }

    return {
      action: templates[key],
      date: Date.now(),
    };
  }

  #gethistorySkipRow() {
    const skipDays = this.exceededSkipsDays;
    if (skipDays === 0) return "";
    const ending = skipDays === 1 ? "" : "s";
    return {
      action: `${
        skipDays > 2 ? "excessive skips" : " training skipped"
      } (${skipDays} day${ending})`,
      date: this.nextDate.getTime(),
    };
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
  get labelid() {
    return this.#labelid;
  }
  get label() {
    return this.#label;
  }
  get note() {
    return this.#note;
  }
  get status() {
    return this.#status;
  }
  get inQueue() {
    return this.#inQueue;
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
    // if (!this.started || this.#stage === 9) return 0;
    if (
      !this.started ||
      this.stage === 9 ||
      (this.status !== "active" && this.status !== undefined)
    )
      return 0;
    let today = new Date();
    // let dt = this.#nextDate;

    let nextDay = new Date(this.#nextDate);

    const oneDayinMs = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = today.getTime() - nextDay.getTime();
    const diffInDays = Math.round(diffInTime / oneDayinMs);
    return diffInDays < 0 ? 0 : diffInDays;
  }
  get exceededSkipsCount() {
    let st = this.#stage;
    // if (!this.started || st === 9) return false;
    if (
      !this.started ||
      this.stage === 9 ||
      (this.status !== "active" && this.status !== undefined)
    )
      return false;
    const diffInDays = this.exceededSkipsDays;
    switch (diffInDays) {
      case 0:
        return false;
      case 1: {
        //one day and stage is more then 7 then it is ok
        if (st > 7) return false;
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
      case 2: {
        //two day and stage is more then 7 then it is ok
        if (st <= 7) return true;
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
    if (this.status !== "active") {
      return ["⏸ Expression is not active", false, 0];
    }
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

    if (this.exceededSkipsDays > 2) {
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
      let result = [];
      // let forceStartToday = this.#status === "new" || this.#status === "paused";
      // Determine starting date
      // let nextDate_ = forceStartToday ? new Date() : new Date(this.#nextDate);
      let nextDate_ = new Date(this.#nextDate);
      // let nextDate_ = new Date(this.#nextDate);
      // If some stage is done, show read history
      if (stage_ > 0) {
        let history_ = this.historySort;
        let count = 0;
        for (let i = 0; i < history_.length; i++) {
          if (history_[i].action.includes("read")) {
            let day = new Date(history_[i].date).toString().slice(0, 10);

            result.unshift(`🟢: Day ${stage_ - count}: ${day} ✔`);
            count++;
          }
          if (count === stage_) break;
        }
      }

      if (!this.started || this.#status === "new" || this.#status === "paused")
        nextDate_ = new Date();
      // Adjust current day for scheduling
      let ShowDate = new Date(nextDate_);
      for (let i = stage_; i < 9; i++) {
        let nd = new Date().setHours(0, 0, 0, 0);
        let sd = new Date(ShowDate).setHours(0, 0, 0, 0);
        const ico = stage_ - 1 >= i ? "🟢" : sd < nd ? "🔴" : "🔘";
        result.push(
          `${ico}: Day ${i + 1}:${ShowDate.toString().slice(0, 10)} ${
            stage_ - 1 >= i ? "✔" : sd < nd ? "☹" : ""
          }${sd === nd ? ":Today" : ""}`
        );
        // Advance to next date depending on stage
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
  //for auto change after training
  get setForUpdate() {
    const updates = {
      id: this.id,
      stage: this.stage,
      nextDate: this.nextDate,
      history: this.history ? [...this.history] : [],
    };

    const oneDayMs = 1000 * 60 * 60 * 24;
    const todayMs = new Date().setHours(12, 0, 0, 0);

    const skipDays = this.exceededSkipsDays;

    let wasLate = skipDays !== 0;
    if (wasLate) {
      updates.history.push(this.#gethistorySkipRow());
    }
    // if the expression is overdue and the number of passes is exceeded, we reset the progress.
    if (skipDays > 3) {
      updates.stage = 0;
      wasLate = false;
      updates.nextDate = todayMs;
      updates.history.push({
        action: "new try",
        date: Date.now(),
      });
    }
    updates.history.push(
      this.#getHistoryEvent(wasLate ? "readLate" : "readByPlan")
    );
    // let action = wasLate ? "read late" : "read by the plan";
    if (updates.stage === 8) {
      updates.history.push(this.#getHistoryEvent("finished"));
      // action += " FINISH!";
      updates.status = "completed";
    }
    // updates.history.push({ action, date: Date.now() });

    // next date based on a stage
    let nextDate = new Date(todayMs);
    if (updates.stage < 6) {
      nextDate.setTime(nextDate.getTime() + oneDayMs);
    } else if (updates.stage < 7) {
      nextDate.setTime(nextDate.getTime() + 7 * oneDayMs);
    } else if (updates.stage < 8) {
      nextDate.setTime(nextDate.getTime() + 14 * oneDayMs);
    }

    updates.nextDate = nextDate.getTime();
    updates.stage += 1;

    return updates;
  }

  //compare the current instance properties with the new newData object and return the object only with the changed fields.
  getUpdatedFields(newData) {
    let changed = { id: this.id };
    let statusChanged = false;
    let statusData = {};

    for (const key of Object.keys(newData)) {
      if (key === "id") continue;
      const oldVal = this[key];
      const updatedData = newData[key];
      if (key === "status" && oldVal !== updatedData) {
        statusChanged = true;
        statusData = this.setStatus(updatedData);
        continue;
      }

      if (
        JSON.stringify(oldVal) !== JSON.stringify(updatedData) &&
        !["history", "nextDate", "stage"].includes(key)
      ) {
        changed[key] = updatedData;
      }
    }
    if (statusChanged) {
      return { ...changed, ...statusData };
    }
    // if (statusChanged) {
    //   Object.entries(statusData).forEach(([key, value]) => {
    //     if (key !== "id") {
    //       changed[key] = value;
    //     }
    //   });
    // }

    return changed;
  }

  setStatus(newStatus) {
    const updates = {
      id: this.id,
      status: newStatus,
      history: [...this.history],
    };

    if (newStatus === "paused") {
      const skipDays = this.exceededSkipsDays;
      if (skipDays > 2 && this.stage > 0) {
        updates.history.push(this.#gethistorySkipRow());
        updates.stage = 0;
      }
      updates.history.push(this.#getHistoryEvent("paused"));
      // updates.history.push({ action: "paused by user", date: Date.now() });
    }

    if (newStatus === "active" && this.status === "paused") {
      updates.nextDate = new Date().setHours(12, 0, 0, 0);

      updates.history.push(
        this.#getHistoryEvent(
          this.stage > 0 ? "resumeAndContinue" : "resumeAndNewTry"
        )
      );
      // updates.history.push({
      //   action: `${
      //     this.stage > 0
      //       ? "resumed by user (continue)"
      //       : "resumed by user (new try)"
      //   }`,
      //   date: now,
      // });

      if (this.inQueue) updates["inQueue"] = false;
    }
    if (newStatus === "active" && this.status === "new") {
      updates.nextDate = new Date().setHours(12, 0, 0, 0);
      updates.history.push(this.#getHistoryEvent("activated"));
      // updates.history.push({ action: "activated by user", date: Date.now() });
      if (this.inQueue) updates["inQueue"] = false;
    }
    return updates;
  }
  // get setForUpdate() {
  //   let expression = {
  //     nextDate: this.nextDate,
  //     stage: this.stage,
  //     id: this.id,
  //     history: this.history,
  //   };
  //   const oneDayinMs = 1000 * 60 * 60 * 24;
  //   let expressionNextDate = !expression.started
  //     ? this.newDateFormat()
  //     : this.newDateFormat(expression.nextDate);

  //   let todayDate = this.newDateFormat();
  //   let diffInDays = this.exceededSkipsDays;
  //   if (this.exceededSkipsCount) {
  //     //reset progress
  //     expression.stage = 0;
  //     expression.nextDate = todayDate;
  //     expressionNextDate = this.newDateFormat();
  //     expression.history.push({
  //       action: `skipped training (${diffInDays} day${
  //         diffInDays === 1 ? "" : "s"
  //       })`,
  //       date: this.nextDate.getTime(),
  //     });
  //     expression.history.push({
  //       action: "new try",
  //       date: new Date().getTime(),
  //     });
  //     diffInDays = 0;
  //   }

  //   let act = diffInDays === 0 ? "read by the plan" : "read late";
  //   if (expression.stage === 8) act = act + " FINISH!";
  //   if (expression.history === undefined) {
  //     expression.history = [];
  //     expression.history.push({ action: "add", date: new Date().getTime() });
  //   }
  //   if (diffInDays !== 0)
  //     expression.history.push({
  //       action: `skipped training (${diffInDays} day${
  //         diffInDays === 1 ? "" : "s"
  //       })`,
  //       date: this.nextDate.getTime(),
  //     });
  //   expression.history.push({ action: act, date: new Date().getTime() });
  //   if (expression.stage < 6) {
  //     expressionNextDate.setTime(expressionNextDate.getTime() + oneDayinMs);
  //   } else if (expression.stage < 7) {
  //     expressionNextDate.setTime(expressionNextDate.getTime() + 7 * oneDayinMs);
  //   } else if (expression.stage < 8) {
  //     expressionNextDate.setTime(
  //       expressionNextDate.getTime() + 14 * oneDayinMs
  //     );
  //   }

  //   expression.nextDate = expressionNextDate.getTime();
  //   ++expression.stage;

  //   return expression;
  // }
  //   get setForUpdate() {
  //   const updates = {
  //     id: this.id,
  //     stage: this.stage,
  //     nextDate: this.nextDate,
  //     history: this.history ? [...this.history] : [],
  //   };

  //   const oneDayMs = 1000 * 60 * 60 * 24;
  //   const todayMs = new Date().setHours(12, 0, 0, 0);

  //   // if the expression is overdue and the number of passes is exceeded, we reset the progress.
  //   if (this.exceededSkipsCount) {
  //     updates.stage = 0;
  //     updates.nextDate = todayMs;
  //     updates.history.push({
  //       action: `skipped training (${this.exceededSkipsDays} day${
  //         this.exceededSkipsDays === 1 ? "" : "s"
  //       })`,
  //       date: this.nextDate.getTime(),
  //     });
  //     updates.history.push({
  //       action: "new try",
  //       date: Date.now(),
  //     });
  //   }

  //   const wasLate = this.exceededSkipsDays !== 0;
  //   if (wasLate) {
  //     updates.history.push({
  //       action: `skipped training (${this.exceededSkipsDays} day${
  //         this.exceededSkipsDays === 1 ? "" : "s"
  //       })`,
  //       date: this.nextDate.getTime(),
  //     });
  //   }

  //   let action = wasLate ? "read late" : "read by the plan";
  //   if (updates.stage === 8) action += " FINISH!";
  //   updates.history.push({ action, date: Date.now() });

  //   // next date based on a stage
  //   let nextDate = new Date(todayMs);
  //   if (updates.stage < 6) {
  //     nextDate.setTime(nextDate.getTime() + oneDayMs);
  //   } else if (updates.stage < 7) {
  //     nextDate.setTime(nextDate.getTime() + 7 * oneDayMs);
  //   } else if (updates.stage < 8) {
  //     nextDate.setTime(nextDate.getTime() + 14 * oneDayMs);
  //   }

  //   updates.nextDate = nextDate.getTime();
  //   updates.stage += 1;

  //   return updates;
  // }
}

try {
  module.exports = { Expression };
} catch (error) {}
