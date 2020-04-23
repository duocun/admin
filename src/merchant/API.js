import { Http } from '../API';

export class MerchantAPI {
  url = 'Restaurants';

  find(query = null) {
    const http = new Http();
    return new Promise((resolve) => {
      http.get(this.url + '/', query).then(rsp => {
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

  find(query = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/', query).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  createOrUpdateMechantSchedules(data){
    // const {areaId, areaCode, merchantIds, weeks} = data;
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.patch(this.url + '/cu', data).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  getById(id) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/' + id).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}