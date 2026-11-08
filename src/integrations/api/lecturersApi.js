import { request } from '../http/httpClient.js'
export const getLecturers = ({ signal } = {}) => request('/lecturers', { signal })
