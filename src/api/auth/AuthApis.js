import axios from 'axios';

export const readUserNameByIp = () => {
  const uri = `http://localhost:8080/api/auth/user-name`;

  return axios.get(uri);
};

export const updateUserName = (newName, ip) => {
  const uri = `http://localhost:8080/api/auth/user-name/update?newName=${newName}&ip=${ip}`;

  return axios.post(uri);
};
