
const data = {
  clients: JSON.parse(localStorage.getItem('clients')) || [],
  invoices: JSON.parse(localStorage.getItem('invoices')) || [],
  quotes: [] 
};

async function loadQuotes() {
  try {
    const response = await fetch('./data/quotes.json');
    if (!response.ok) throw new Error('Failed to load quotes');
    data.quotes = await response.json();
  } catch (error) {
    console.error('Error loading quotes:', error);
  }
}

function saveData() {
  localStorage.setItem('clients', JSON.stringify(data.clients));
  localStorage.setItem('invoices', JSON.stringify(data.invoices));
}

export { data, loadQuotes, saveData };