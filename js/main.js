import { data, loadQuotes } from './data.js';
import { updateDashboardStats, formatDate } from './utils.js';

let dashboardElements = {};

async function initDashboard() {
  cacheDashboardElements();
  await loadQuotes();
  
  if (data.quotes.length > 0) {
    displayRandomQuote();
  }
  
  renderRecentInvoices();
  renderActiveClients();
  updateStatsDisplay();
  setupEventListeners();
}

function cacheDashboardElements() {
  dashboardElements = {
    totalClients: document.getElementById('total-clients'),
    totalInvoices: document.getElementById('total-invoices'),
    totalAmount: document.getElementById('total-amount'),
    unpaidInvoices: document.getElementById('unpaid-invoices'),
    recentInvoicesBody: document.getElementById('recent-invoices'),
    activeClientsBody: document.getElementById('active-clients'),
    quoteText: document.getElementById('quote-text'),
    quoteAuthor: document.getElementById('quote-author')
  };
}

function updateStatsDisplay() {
  const stats = updateDashboardStats();
  
  if (dashboardElements.totalClients) {
    dashboardElements.totalClients.textContent = stats.totalClients;
  }
  if (dashboardElements.totalInvoices) {
    dashboardElements.totalInvoices.textContent = stats.totalInvoices;
  }
  if (dashboardElements.totalAmount) {
    dashboardElements.totalAmount.textContent = `$${stats.totalAmount.toFixed(2)}`;
  }
  if (dashboardElements.unpaidInvoices) {
    dashboardElements.unpaidInvoices.textContent = `${stats.unpaidInvoices} ($${stats.unpaidAmount.toFixed(2)})`;
  }
}

function renderRecentInvoices() {
  if (!dashboardElements.recentInvoicesBody) return;

  const recentInvoices = [...data.invoices]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recentInvoices.length === 0) {
    dashboardElements.recentInvoicesBody.innerHTML = `
      <tr>
        <td colspan="5" class="no-data">No recent invoices found</td>
      </tr>
    `;
    return;
  }

  dashboardElements.recentInvoicesBody.innerHTML = recentInvoices.map(invoice => {
    const client = data.clients.find(c => c.id === invoice.clientId);
    return `
      <tr>
        <td>${invoice.id}</td>
        <td>${client?.name || 'Unknown Client'}</td>
        <td>${formatDate(invoice.date)}</td>
        <td>$${invoice.amount.toFixed(2)}</td>
        <td>
          <span class="status-badge ${invoice.paid ? 'paid' : 'unpaid'}">
            ${invoice.paid ? 'Paid' : 'Unpaid'}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderActiveClients() {
  if (!dashboardElements.activeClientsBody) return;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const activeClients = data.clients
    .filter(client => data.invoices.some(invoice => 
      invoice.clientId === client.id && 
      new Date(invoice.date) >= thirtyDaysAgo
    ))
    .map(client => {
      const invoices = data.invoices.filter(invoice => 
        invoice.clientId === client.id &&
        new Date(invoice.date) >= thirtyDaysAgo
      );
      return { ...client, invoiceCount: invoices.length };
    })
    .sort((a, b) => b.invoiceCount - a.invoiceCount);

  if (activeClients.length === 0) {
    dashboardElements.activeClientsBody.innerHTML = `
      <tr>
        <td colspan="4" class="no-data">No active clients found</td>
      </tr>
    `;
    return;
  }

  dashboardElements.activeClientsBody.innerHTML = activeClients.map(client => `
    <tr>
      <td>
        <div class="client-name">${client.name}</div>
      </td>
      <td>
        ${client.email ? `<a href="mailto:${client.email}">${client.email}</a>` : '-'}
      </td>
      <td>${client.company || '-'}</td>
      <td>
        <span class="invoice-count">${client.invoiceCount}</span>
      </td>
    </tr>
  `).join('');
}

function displayRandomQuote() {
  if (!data.quotes?.length) {
    dashboardElements.quoteText.textContent = "Inspirational quotes coming soon...";
    dashboardElements.quoteAuthor.textContent = "";
    return;
  }

  const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
  dashboardElements.quoteText.textContent = `"${randomQuote.text}"`;
  dashboardElements.quoteAuthor.textContent = randomQuote.author ? `— ${randomQuote.author}` : "";
}

function setupEventListeners() {
  window.addEventListener('storage', () => {
    initDashboard();
  });
}

window.refreshDashboard = initDashboard;

document.addEventListener('DOMContentLoaded', initDashboard);