import { Locator, Page } from "@playwright/test";

export class PipelineOverviewPage {
  readonly page: Page;
  readonly pagePath: string;
  readonly runButton: Locator;
  readonly inputForm: Locator;
  readonly moreOptionsButton: Locator;

  constructor(page: Page, pipelineID: string) {
    this.page = page;
    this.pagePath = `/admin/pipelines/${pipelineID}/playground`;
    this.runButton = page.getByRole("button", { name: "Run", exact: true });
    this.inputForm = page.locator(
      "form[id='pipeline-details-page-trigger-pipeline-form']",
    );
    this.moreOptionsButton = page.getByLabel("More options");
  }

  async goto() {
    await this.page.goto(this.pagePath);
  }

  async expectOnIt() {
    await this.page.waitForURL(this.pagePath);
  }
}
