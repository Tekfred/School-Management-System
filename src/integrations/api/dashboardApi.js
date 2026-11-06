import { request } from '../http/httpClient.js'
export const getDashboard = ({ signal } = {}) => request('/dashboard', { signal })
