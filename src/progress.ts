import type { PlanItem } from "./plan/plan-item";

const moment = (window as any).moment;

export default class Progress {
  getProgress(current: PlanItem, next: PlanItem) {
    const now = new Date();
    const nowMoment = moment(now);
    const currentMoment = moment(current.startTime);
    let nextMoment: any;
    if (current.endTime === undefined) {
      nextMoment = moment(current.endTime);
    } else {
      nextMoment = moment(next.startTime);
    }

    const diff = moment.duration(nextMoment.diff(currentMoment));
    const fromStart = moment.duration(nowMoment.diff(currentMoment));
    const untilNext = moment.duration(nextMoment.diff(nowMoment));
    const percentageComplete = (fromStart.asMinutes() / diff.asMinutes()) * 100;
    const minsUntilNext = untilNext.asMinutes().toFixed(0);
    return { percentageComplete, minsUntilNext };
  }

  progressMarkdown(current: PlanItem, next: PlanItem) {
    const { percentageComplete } = this.getProgress(current, next);
    const completeCount = Math.floor(20 * (percentageComplete / 100));
    return (
      new Array(completeCount).join("->") +
      new Array(20 - completeCount).join("_ ")
    );
  }
}
