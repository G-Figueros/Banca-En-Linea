export class ApiService {
  baseUrl = 'http://localhost:3000/api';

  request(path: string, options: RequestInit = {}) {
    return fetch(`${this.baseUrl}/${path}`, options).then(res => res.json());
  }
}
