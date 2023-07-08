import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		authorization: window.localStorage.getItem('token'),
	},
});

export default class Api {
	static register(params) {
		return instance.post('user/registration', params);
	}

	static login(params) {
		return instance.post('user/login', params);
	}

	static authMe() {
		return instance.get('user/auth');
	}

	// clients
	static createClient(params) {
		return instance.post('clients', params);
	}

	static getClients() {
		return instance.get('clients');
	}
}
