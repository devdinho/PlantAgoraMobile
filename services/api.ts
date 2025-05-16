import { endpoints } from './endpoints';
import { ApiParams } from './types';

const API_BASE_URL='https://plantagora.dinho.dev'
// const API_BASE_URL='http://localhost:8001'
const API_CEP_URL='https://viacep.com.br/ws'

export async function callApi(name: keyof typeof endpoints, params: ApiParams = {}) {
  const endpoint = endpoints[name];
  if (!endpoint) throw new Error(`API ${name} não existe.`);

  let url = API_BASE_URL + endpoint.url;
  console.log('URL:', url);
  
  if (name === 'get_address') {
    url = API_CEP_URL + endpoint.url;
  }
  
  if (params.urlParams) {
    for (const key in params.urlParams) {
      url = url.replace(`:${key}`, encodeURIComponent(params.urlParams[key]));
    }
  }

  if (params.queryParams) {
    const query = new URLSearchParams();
    Object.entries(params.queryParams).forEach(([k, v]) => {
      query.append(k, String(v));
    });
    url += `?${query.toString()}`;
  }

  const fetchOptions: RequestInit = {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
  };

  if (params.body) {
    fetchOptions.body = JSON.stringify(params.body);
  }

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro na requisição: ${error}`);
  }

  return await response.json();
}
