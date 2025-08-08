import { data, saveData } from './data.js';
import { updateDashboardStats } from './utils.js';

function initClientPage() {
  renderClientList();
  setupClientForm();
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
}

function setupClientForm() {
  const form = document.getElementById('client-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const clientData = Object.fromEntries(formData.entries());
    
    if (form.dataset.editing) {
      updateClient(form.dataset.editing, clientData);
    } else {
      addClient(clientData);
    }
    
    form.reset();
    renderClientList();
  });
}

function addClient(clientData) {
  clientData.id = Date.now().toString();
  data.clients.push(clientData);
  saveData();
}

function updateClient(clientId, clientData) {
  const index = data.clients.findIndex(c => c.id === clientId);
  if (index !== -1) {
    data.clients[index] = { ...data.clients[index], ...clientData };
    saveData();
  }
}

document.addEventListener('DOMContentLoaded', initClientPage);