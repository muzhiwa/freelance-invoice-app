import { data } from './data.js';

function formatDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}


function calculateDueDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 30);
  return formatDate(date);
}


function updateDashboardStats() {
  const totalAmount = data.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const unpaidInvoices = data.invoices.filter(invoice => !invoice.paid).length;
  
  return {
    totalClients: data.clients.length,
    totalInvoices: data.invoices.length,
    totalAmount,
    unpaidInvoices
  };
}

export { formatDate, calculateDueDate, updateDashboardStats };