const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  const coins = await fetch(ENDPOINT);
  const data = await coins.json();
  return data;
};

export default fetchApi;
