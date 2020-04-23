import { Http, HttpStatus } from '../API';

export class FinanceAPI {
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

  checkStripePay(){
    const url = this.url + '/checkStripePay';
    const data = {};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  checkWechatpay(){
    const url = this.url + '/checkWechatpay';
    const data = {};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  reqMissingWechatPayments(){
    const url = this.url + '/missingWechatpayments';
    const data = {};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}