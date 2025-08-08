
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
  const quoteContainer = document.getElementById('quote-container');
  const randomIndex = Math.floor(Math.random() * data.quotes.length);
  const quote = data.quotes[randomIndex];

  quoteContainer.innerHTML = `
    <div class="quote-text">"${quote.text}"</div>
    <div class="quote-author">- ${quote.author || 'Unknown'}</div>
  `;
}

document.addEventListener('DOMContentLoaded', initDashboard);