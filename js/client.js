import { data, saveData } from './data.js';
import { updateDashboardStats } from './utils.js';

function initClientPage() {
  renderClientList();
  setupClientForm();
  setupAddClientButton(); 
}

function setupAddClientButton() {
  const addClientBtn = document.getElementById('add-client-btn');
  const clientForm = document.getElementById('client-form');
  const clientFormContainer = document.getElementById('client-form-container'); 
  
  if (addClientBtn && clientForm) {
    addClientBtn.addEventListener('click', () => {
      clientForm.reset();
       clientFormContainer.classList.remove('hidden'); // show the section
      clientFormContainer.scrollIntoView({ behavior: 'smooth' })
    });
  }
}

function renderClientList() {
  const clientsList = document.getElementById('clients-list');
  if (!clientsList) return;

  clientsList.innerHTML = data.clients.map(client => `
    <tr>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.company || '-'}</td>
      <td>
        <button class="edit-btn" data-id="${client.id}">Edit</button>
        <button class="delete-btn" data-id="${client.id}">Delete</button>
      </td>
    </tr>
  `).join('');

 
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => editClient(btn.dataset.id));
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteClient(btn.dataset.id));
  });
}

function setupClientForm() {
  const form = document.getElementById('client-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const clientData = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      notes: formData.get('notes')
    };
    
    addClient(clientData);
    form.reset();
    form.classList.add('hidden'); 
    renderClientList();
  });
}

function addClient(clientData) {
  if (!clientData.name || !clientData.email) {
    alert('Name and email are required!');
    return;
  }

  const newClient = {
    id: Date.now().toString(),
    ...clientData
  };

  data.clients.push(newClient);
  saveData();
  updateDashboardStats();
}


function editClient(clientId) {
  const client = data.clients.find(c => c.id === clientId);
  if (!client) return;

  const form = document.getElementById('client-form');
  if (!form) return;


  form.elements['name'].value = client.name;
  form.elements['email'].value = client.email;
  form.elements['company'].value = client.company || '';
  form.elements['phone'].value = client.phone || '';
  form.elements['notes'].value = client.notes || '';

  form.classList.remove('hidden');
  form.scrollIntoView({ behavior: 'smooth' });
}

function deleteClient(clientId) {
  if (!confirm('Are you sure you want to delete this client?')) return;
  
  data.clients = data.clients.filter(c => c.id !== clientId);
  saveData();
  updateDashboardStats();
  renderClientList();
}

document.addEventListener('DOMContentLoaded', initClientPage);   
