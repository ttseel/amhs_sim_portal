import axios from 'axios';

class FromToAnalysisApi {
  async readFromToTable(site, year, month) {
    let newDisplayLines = {};
    await axios.get(`http://localhost:3001/fromto?site=${site}&year=${year}&month=${month}`).then(res => {
      newDisplayLines = res.data[0];
    });

    return newDisplayLines;
  }
}

export default FromToAnalysisApi;
