import { Http, HttpStatus } from '../API';

export class TransactionAPI {
  url = 'Transactions';
  http = new Http();


  find(query = null, fields = null) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/qFind', query, fields).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}