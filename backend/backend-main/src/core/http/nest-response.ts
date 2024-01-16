export class NestResponse {
  status: number;
  headers: object;
  body: object;

  constructor(response: NestResponse) {
    // this.status = response.status;
    // this.headers = response.headers;
    // this.body = response.body;
    Object.assign(this, response);
  }
}
