import { data, saveData } from './data.js';
import { updateDashboardStats } from './utils.js';

function initClientPage() {
  renderClientList();
  setupClientForm();
  setupAddClientButton();
  setupCancelButton();
}

function setupAddClientButton() {
  const addClientBtn = document.getElementById('add-client-btn');
  const formContainer = document.getElementById('client-form-container');
  
  if (addClientBtn && formContainer) {
    addClientBtn.addEventListener('click', () => {
      document.getElementById('client-id').value = '';
      document.getElementById('client-form').reset();
      document.getElementById('form-title').textContent = 'Add New Client';
      formContainer.classList.remove('hidden');
      formContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function setupCancelButton() {
  const cancelBtn = document.getElementById('cancel-client-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      document.getElementById('client-form-container').classList.add('hidden');
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
      <td>${client.phone || '-'}</td>
      <td>
        <button class="btn edit-btn" data-id="${client.id}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn delete-btn" data-id="${client.id}">
          <i class="fas fa-trash"></i> Delete
        </button>
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
    const clientId = document.getElementById('client-id').value;
    const clientData = {
      name: document.getElementById('client-name').value,
      email: document.getElementById('client-email').value,
      company: document.getElementById('client-company').value,
      phone: document.getElementById('client-phone').value,
      notes: document.getElementById('client-notes').value
    };

    if (clientId) {
      updateClient(clientId, clientData);
    } else {
      addClient(clientData);
    }

    document.getElementById('client-form-container').classList.add('hidden');
    renderClientList();
  });
}

function addClient(clientData) {
  if (!clientData.name || !clientData.email) {
    alert('Name and email are required!');
    return;
  }

  const defaultIds = data.clients.filter(c => c.id.length <= 2).map(c => parseInt(c.id));
  const newId = defaultIds.length > 0 ? (Math.max(...defaultIds) + 1).toString() : Date.now().toString();

  const newClient = {
    id: newId,
    ...clientData
  };

  data.clients.push(newClient);
  saveData();
  updateDashboardStats();
}

function updateClient(clientId, clientData) {
  const index = data.clients.findIndex(c => c.id === clientId);
  if (index !== -1) {
    data.clients[index] = {
      ...data.clients[index],
      ...clientData
    };
    saveData();
    updateDashboardStats();
  }
}

function editClient(clientId) {
  const client = data.clients.find(c => c.id === clientId);
  if (!client) return;

  document.getElementById('client-id').value = client.id;
  document.getElementById('client-name').value = client.name;
  document.getElementById('client-email').value = client.email;
  document.getElementById('client-company').value = client.company || '';
  document.getElementById('client-phone').value = client.phone || '';
  document.getElementById('client-notes').value = client.notes || '';
  document.getElementById('form-title').textContent = 'Edit Client';
  
  document.getElementById('client-form-container').classList.remove('hidden');
  document.getElementById('client-form-container').scrollIntoView({ behavior: 'smooth' });
}

function deleteClient(clientId) {
  if (!confirm('Are you sure you want to delete this client?')) return;
  
  data.clients = data.clients.filter(c => c.id !== clientId);
  saveData();
  updateDashboardStats();
  renderClientList();
}

document.addEventListener('DOMContentLoaded', initClientPage);