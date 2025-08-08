import { data, saveData } from './data.js';
import { formatDate, calculateDueDate } from './utils.js';

function initInvoicePage() {
  renderInvoiceList();
  setupInvoiceForm();
  populateClientDropdown();
}

function renderInvoiceList() {
  const invoicesList = document.getElementById('invoices-list');
  if (!invoicesList) return;

  invoicesList.innerHTML = data.invoices.map(invoice => {
    const client = data.clients.find(c => c.id === invoice.clientId);
    return `
      <tr>
        <td>${invoice.id}</td>
        <td>${client?.name || 'Unknown'}</td>
        <td>${formatDate(invoice.date)}</td>
        <td>$${invoice.amount.toFixed(2)}</td>
        <td class="${invoice.paid ? 'paid' : 'unpaid'}">
          ${invoice.paid ? 'Paid' : 'Unpaid'}
        </td>
      </tr>
    `;
  }).join('');
}

function setupInvoiceForm() {
  const form = document.getElementById('invoice-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const invoiceData = Object.fromEntries(formData.entries());
    
    addInvoice({
      ...invoiceData,
      amount: parseFloat(invoiceData.amount),
      paid: false,
      dueDate: calculateDueDate(invoiceData.date)
    });
    
    form.reset();
    renderInvoiceList();
  });
}

function addInvoice(invoiceData) {
  invoiceData.id = `INV-${Date.now().toString().slice(-6)}`;
  data.invoices.push(invoiceData);
  saveData();
}

function populateClientDropdown() {
  const select = document.getElementById('client-select');
  if (!select) return;

  select.innerHTML = data.clients.map(client => 
    `<option value="${client.id}">${client.name}</option>`
  ).join('');
}

document.addEventListener('DOMContentLoaded', initInvoicePage);