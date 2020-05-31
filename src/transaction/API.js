import { Http, HttpStatus } from '../API';
import queryString from "query-string";

export class TransactionAPI {
  url = 'Transactions';
  http = new Http();

  async find(params = null) {
    const q = queryString.stringify(params);
    return await this.http.get(this.url + '/?' + q);
  }
}