
const defaultClients = [
  {
    id: "1",
    name: "Farida Noori",
    email: "farida.n@gamil.com",
    company: "Herat Spice Traders",
    phone: "+93 79 234 5678",
    notes: "Regular customer"
  },
  {
    id: "2",
    name: "Ahmad Shah",
    email: "ahmad.shah@gmail.com",
    company: "Kabul Carpet Exporters",
    phone: "+93 70 123 4568",
    notes: "Prefers communication in Dari"
  },
  {
    id: "3",
    name: "Mohammad Zaman",
    email: "mohaadzaman6@gmail.com",
    company: "Mazar-e-Sharif Logistics",
    phone: "+93 78 345 6789",
    notes: "Cash payments preferred"
  },
  {
    id: "4",
    name: "Laila Mohammadi",
    email: "laila.m@gmail.com",
    company: "Empowered Youth ",
    phone: "+93 78 667 7910",
    notes: "Monthly contracts"
  },
  {
    id: "5",
    name: "Hamid Karzai",
    email: "h.karzai@afgbiz.com",
    company: "Kandahar Agricultural Co",
    phone: "+93 70 567 8901",
    notes: "Seasonal client"
  },
  {
    id: "6",
    name: "Farwa Rahmani",
    email: "farwarah@gmail.com",
    company: "KIL Group",
    phone: "+93 77 873 0909",
    notes: "Tech services"
  },
  {
    id: "7",
    name: "Narges Lessani",
    email: "narges45@gmail.com",
    company: "Lessani Online Shop",
    phone: "+93 79 095 3424",
    notes: "VIP Cilent"
  }
];

const defaultInvoices = [
  {
    id: "INV-1001",
    clientId: "1",
    date: "2025-08-02",
    title: "Website Design",
    description: "Homepage redesign",
    amount: 200,
    paid: true,
    dueDate: "2025-08-14"
  },
  {
    id: "INV-1002",
    clientId: "2",
    date: "2025-07-20",
    title: "SEO Services",
    description: "Monthly SEO package",
    amount: 200,
    paid: false,
    dueDate: "2025-08-05"
  },
  {
    id: "INV-1003",
    clientId: "3",
    date: "2025-08-06",
    title: "Layout Design ",
    description: "Product Layout Design",
    amount: 400,
    paid: true,
    dueDate: "2025-08-20"
  },
  {
    id: "INV-1004",
    clientId: "4",
    date: "2025-07-26",
    title: "Consulting",
    description: "Business strategy session",
    amount: 100,
    paid: false,
    dueDate: "2025-08-03"
  }, 

  {
    id: "INV-1005",
    clientId: "5",
    date: "2025-07-29",
    title: "Web design",
    description: "Wireframe using Figma",
    amount: 200,
    paid: True,
    dueDate: "2025-08-11"
  }, 

  {
    id: "INV-1006",
    clientId: "6",
    date: "2025-05-24",
    title: "Flyer Desisn",
    description: "Design a Flyer using photoshop",
    amount: 100,
    paid: True,
    dueDate: "2025-06-03"
  }, 

  {
    id: "INV-1007",
    clientId: "7",
    date: "2025-07-22",
    title: "Logo Design",
    description: "Design a logo using their color scheme",
    amount: 100,
    paid: false,
    dueDate: "2025-08-22"
  }
];


const data = {
  clients: JSON.parse(localStorage.getItem('clients')) || defaultClients,
  invoices: JSON.parse(localStorage.getItem('invoices')) || defaultInvoices,
  quotes: [] 
};

async function loadQuotes() {
  try {
    const response = await fetch('/data/quotes.json');
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