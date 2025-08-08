import { data, saveData } from './data.js';
import { formatDate, calculateDueDate } from './utils.js';

function initInvoicePage() {
  renderInvoiceList();
  setupInvoiceForm();
  populateClientDropdown();
  setupAddInvoiceButton();
  setupCancelButton();
  setDefaultDate();
}

function setDefaultDate() {
  const dateInput = document.getElementById('invoice-date');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }
}

function setupAddInvoiceButton() {
  const addBtn = document.getElementById('add-invoice-btn');
  const formContainer = document.getElementById('invoice-form-container');
  
  if (addBtn && formContainer) {
    addBtn.addEventListener('click', () => {
      document.getElementById('invoice-form').reset();
      setDefaultDate();
      document.getElementById('form-title').textContent = 'Create New Invoice';
      formContainer.classList.remove('hidden');
      formContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function setupCancelButton() {
  const cancelBtn = document.getElementById('cancel-invoice-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      document.getElementById('invoice-form-container').classList.add('hidden');
    });
  }
}

function renderInvoiceList() {
  const invoicesList = document.getElementById('invoices-list');
  if (!invoicesList) return;

  invoicesList.innerHTML = data.invoices.length === 0 ? `
    <tr>
      <td colspan="6" class="no-invoices">No invoices found</td>
    </tr>
  ` : data.invoices.map(invoice => {
    const client = data.clients.find(c => c.id === invoice.clientId);
    return `
      <tr data-id="${invoice.id}">
        <td>${invoice.id}</td>
        <td>${client?.name || 'Unknown Client'}</td>
        <td>${formatDate(invoice.date)}</td>
        <td>$${invoice.amount.toFixed(2)}</td>
        <td class="status ${invoice.paid ? 'paid' : 'unpaid'}">
          ${invoice.paid ? 'Paid' : 'Unpaid'}
        </td>
        <td class="actions">
          ${!invoice.paid ? `
            <button class="btn btn-sm mark-paid-btn" data-id="${invoice.id}">
              <i class="fas fa-check"></i> Mark Paid
            </button>
          ` : ''}
          <button class="btn btn-sm btn-danger delete-btn" data-id="${invoice.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Add event listeners
  document.querySelectorAll('.mark-paid-btn').forEach(btn => {
    btn.addEventListener('click', () => markAsPaid(btn.dataset.id));
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteInvoice(btn.dataset.id));
  });
}

function setupInvoiceForm() {
  const form = document.getElementById('invoice-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientSelect = document.getElementById('invoice-client');
    const clientId = clientSelect.value;
    
    if (!clientId) {
      alert('Please select a client');
      return;
    }

    const invoiceData = {
      clientId,
      date: document.getElementById('invoice-date').value,
      title: document.getElementById('invoice-title').value,
      description: document.getElementById('invoice-description').value,
      amount: parseFloat(document.getElementById('invoice-amount').value),
      paid: false,
      dueDate: calculateDueDate(document.getElementById('invoice-date').value)
    };

    addInvoice(invoiceData);
    document.getElementById('invoice-form-container').classList.add('hidden');
    renderInvoiceList();
  });
}

function populateClientDropdown() {
  const select = document.getElementById('invoice-client');
  if (!select) return;

  select.innerHTML = `
    <option value="">Select a client</option>
    ${data.clients.map(client => 
      `<option value="${client.id}">${client.name}</option>`
    ).join('')}
  `;
}

function addInvoice(invoiceData) {
  if (!invoiceData.clientId || !invoiceData.date || !invoiceData.amount) {
    alert('Client, date and amount are required!');
    return;
  }

  const newInvoice = {
    id: `INV-${Date.now().toString().slice(-6)}`,
    ...invoiceData
  };

  data.invoices.push(newInvoice);
  saveData();
}

function markAsPaid(invoiceId) {
  const invoice = data.invoices.find(i => i.id === invoiceId);
  if (invoice) {
    invoice.paid = true;
    saveData();
    renderInvoiceList();
  }
}

function deleteInvoice(invoiceId) {
  if (!confirm('Are you sure you want to delete this invoice?')) return;
  
  data.invoices = data.invoices.filter(i => i.id !== invoiceId);
  saveData();
  renderInvoiceList();
}

document.addEventListener('DOMContentLoaded', initInvoicePage);