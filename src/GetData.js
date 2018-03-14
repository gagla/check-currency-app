import axios from 'axios';

class GetData {
  constructor() {
    this.baseUrl = "http://api.nbp.pl/api/exchangerates";
  }

  getData(path) {
    let url = `${this.baseUrl}${path}`;
    return axios.get(`${url}`);
  }
}

export default (new GetData()); 