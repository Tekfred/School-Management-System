import { request } from '../http/httpClient.js'
export const getFinanceOverview = ({ signal } = {}) => request('/finance/overview', { signal })
export const createPayment = (payment) => request('/payments', { method: 'POST', body: payment })
