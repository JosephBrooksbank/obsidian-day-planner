import { ItemView, WorkspaceLeaf } from "obsidian";

import { VIEW_TYPE_TIMELINE } from "../constants";
import type DayPlanner from "../main";
import type { DayPlannerSettings } from "../settings";

import Timeline from "./components/timeline.svelte";

export default class TimelineView extends ItemView {
  private timeline: Timeline;
  private settings: DayPlannerSettings;

  constructor(
    leaf: WorkspaceLeaf,
    settings: DayPlannerSettings,
    private readonly plugin: DayPlanner,
  ) {
    super(leaf);
    this.settings = settings;
  }

  getViewType(): string {
    return VIEW_TYPE_TIMELINE;
  }

  getDisplayText(): string {
    return "Day Planner Timeline";
  }

  getIcon() {
    return this.settings.timelineIcon;
  }

  async onOpen() {
    const contentEl = this.containerEl.children[1];
    this.timeline = new Timeline({
      target: contentEl,
    });
  }

  async onClose() {
    this.timeline?.$destroy();
  }
}
