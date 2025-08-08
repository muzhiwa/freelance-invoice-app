
import { data, loadQuotes } from './data.js';
import { updateDashboardStats, formatDate } from './utils.js';


let dashboardElements = {};

function initDashboard() {
  cacheDashboardElements();
  loadQuotes().then(() => {
    refreshDashboard();
    setupEventListeners();
  });
}

function cacheDashboardElements() {
  dashboardElements = {
    totalClients: document.getElementById('total-clients'),
    totalInvoices: document.getElementById('total-invoices'),
    totalAmount: document.getElementById('total-amount'),
    unpaidInvoices: document.getElementById('unpaid-invoices'),
    recentInvoices: document.getElementById('recent-invoices'),
    activeClients: document.getElementById('active-clients'),
    quoteText: document.getElementById('quote-text'),
    quoteAuthor: document.getElementById('quote-author')
  };
}

function refreshDashboard() {
  const stats = updateDashboardStats();
  
  // Update stats cards
  if (dashboardElements.totalClients) dashboardElements.totalClients.textContent = stats.totalClients;
  if (dashboardElements.totalInvoices) dashboardElements.totalInvoices.textContent = stats.totalInvoices;
  if (dashboardElements.totalAmount) dashboardElements.totalAmount.textContent = `$${stats.totalRevenue.toFixed(2)}`;
  if (dashboardElements.unpaidInvoices) dashboardElements.unpaidInvoices.textContent = stats.unpaidInvoices;

  
  renderRecentInvoices();
  
  
  renderActiveClients();
  
  
  showRandomQuote();
}


function setupEventListeners() {
  window.addEventListener('storage', () => {
   
    refreshDashboard();
  });
}


window.refreshDashboard = refreshDashboard;

document.addEventListener('DOMContentLoaded', initDashboard);