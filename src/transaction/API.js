import { Http, HttpStatus } from '../API';

export class TransactionAPI {
  url = 'Transactions';
  http = new Http();


  find(query = null) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/', query, fields).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}