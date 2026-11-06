import { request } from '../http/httpClient.js'
export const getCourses = ({ signal } = {}) => request('/courses', { signal })
