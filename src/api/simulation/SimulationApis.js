import axios from 'axios';

export const readCurrentRunningApi = user => {
  const uri = `http://localhost:8080/api/simulation/simboard/current-running?user=${user}`;

  return axios.get(uri);
};

export const readReservedScenarioApi = user => {
  const uri = `http://localhost:8080/api/simulation/simboard/reserved-scenario?user=${user}`;

  return axios.get(uri);
};

export const readMyHistoryApi = user => {
  const uri = `http://localhost:8080/api/simulation/my-simulation/my-history?user=${user}`;

  return axios.get(uri);
};

export const stopSimulationApi = (user, simulator, scenario) => {
  const uri = `http://localhost:8080/api/simulation/simboard/stop-sim?user=${user}&simulator=${simulator}&scenario=${scenario}`;

  return axios.delete(uri);
};

export const cancelReservedScenarioApi = (user, simulator, scenario) => {
  const uri = `http://localhost:8080/api/simulation/simboard/cancel-reservation?user=${user}&simulator=${simulator}&scenario=${scenario}`;

  return axios.delete(uri);
};

export const downloadHistoryApi = (user, simulator, scenario) => {
  const uri = `http://localhost:8080/api/simulation/my-simulation/download-my-history?user=${user}&simulator=${simulator}&scenario=${scenario}`;

  return axios({
    method: 'get',
    url: uri,
    responseType: 'blob',
  });
};

export const deleteMyHistoryApi = (user, simulator, scenario) => {
  const uri = `http://localhost:8080/api/simulation/my-simulation/delete-my-history?user=${user}&simulator=${simulator}&scenario=${scenario}`;

  return axios.delete(uri);
};

export const simulatorVersionListApi = simulator => {
  const uri = `http://localhost:8080/api/simulation/reservation/version-list?simulator=${simulator}`;

  return axios.get(uri);
};

// export const saveScenarioFileApi = (user, simulator, scenario, importFile) => {
// const uri = `http://localhost:8080/api/simulation/reservation/reserve-new-scenario?user=${user}&simulator=${simulator}&scenario=${scenario}`;
export const reserveNewScenarioApi = formData => {
  const uri = `http://localhost:8080/api/simulation/reservation/reserve-new-scenario`;

  return axios({
    method: 'post',
    url: uri,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};

export const validatePossibleToRserveApi = (user, simulator, scenarioList) => {
  const uri = `http://localhost:8080/api/simulation/reservation/validate-reserve?user=${user}&simulator=${simulator}&scenarioList=${scenarioList}`;

  return axios.get(uri);
};
