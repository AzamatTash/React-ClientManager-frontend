import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		authorization: localStorage.getItem('token'),
	},
});

export default class Api {
	// Auth
	static register(params) {
		return instance.post('user/registration', params);
	}

	static login(params) {
		return instance.post('user/login', params);
	}

	static authMe() {
		return instance.get('user/auth');
	}

	// User
	static getUser() {
		return instance.get('user/info');
	}

	// Clients
	static createClient(params) {
		return instance.post('clients', params);
	}

	static getClient(id) {
		return instance.get(`clients/${id}`);
	}

	static getClients() {
		return instance.get('clients');
	}

	static updateClient(params) {
		return instance.put(`clients/${params.id}`, params);
	}

	static removeClient(id) {
		return instance.delete(`clients/${id}`);
	}

	// Events
	static createEvent(params) {
		return instance.post('events', params);
	}

	static getEvent(id) {
		return instance.get(`events/${id}`);
	}

	static getEvents() {
		return instance.get('events');
	}

	static updateEvent(params) {
		return instance.put(`events/${params.id}`, params);
	}

	static removeEvent(id) {
		return instance.delete(`events/${id}`);
	}
}
