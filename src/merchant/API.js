import { Http } from '../API';

export class MerchantAPI {
  url = 'Restaurants';

  find(query = null, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/qFind', query, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  getById(id, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/' + id, null, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}


export class ScheduleAPI {
  url = 'MerchantSchedules';

  find(query = null, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/qFind', query, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  getById(id, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/' + id, null, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}