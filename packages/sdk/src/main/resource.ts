import type { InstillAPIClient } from "./index";

export class APIResource {
  protected _client: InstillAPIClient;

  constructor(client: InstillAPIClient) {
    this._client = client;
  }
}
