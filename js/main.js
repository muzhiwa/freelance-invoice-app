
import { data, loadQuotes } from './data.js';
import { updateDashboardStats, formatDate } from './utils.js';

async function initDashboard() {
  await loadQuotes();
  

  if (data.quotes.length > 0) {
    displayRandomQuote();
  }
  
  renderRecentInvoices();
  renderActiveClients();
  updateStatsDisplay();
}

function displayRandomQuote() {
  const quoteTextEl = document.getElementById('quote-text');
  const quoteAuthorEl = document.getElementById('quote-author');

  if (!data.quotes?.length) {
    quoteTextEl.textContent = "Inspirational quotes coming soon...";
    quoteAuthorEl.textContent = "";
    return;
  }

 
  const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

  quoteTextEl.textContent = `"${randomQuote.text}"`;
  quoteAuthorEl.textContent = randomQuote.author ? `— ${randomQuote.author}` : "";
}

document.addEventListener('DOMContentLoaded', initDashboard);