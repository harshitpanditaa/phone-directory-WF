import React, { useRef } from 'react';
import PhoneDirectory from './PhoneDirectory';
import './App.css';

function App() {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const tbodyRef = useRef(null);
  const errorRef = useRef(null);
  let idCounter = useRef(4); // Starting after initial 3 rows

  // Initial subscriber data
  const initialSubscribers = [
    { id: 1, name: 'John Doe', phone: '1234567890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', phone: '9876543210', address: '456 Oak Ave' },
    { id: 3, name: 'Bob Johnson', phone: '5555555555', address: '789 Pine Rd' }
  ];

  const handleAdd = () => {
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const address = addressRef.current.value.trim();

    // Validation
    if (!name || !phone || !address) {
      errorRef.current.textContent = 'All fields are required!';
      errorRef.current.style.display = 'block';
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      errorRef.current.textContent = 'Phone number must be exactly 10 digits!';
      errorRef.current.style.display = 'block';
      return;
    }

    // Clear error message
    errorRef.current.textContent = '';
    errorRef.current.style.display = 'none';

    // Create new row (DOM manipulation)
    const newRow = document.createElement('tr');
    const currentId = idCounter.current++;

    newRow.innerHTML = `
      <td>${currentId}</td>
      <td>${name}</td>
      <td>${phone}</td>
      <td>${address}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    // Attach delete handler
    const deleteBtn = newRow.querySelector('.delete-btn');
    deleteBtn.onclick = () => handleDelete(newRow);

    // Append to tbody
    tbodyRef.current.appendChild(newRow);

    // Clear form
    nameRef.current.value = '';
    phoneRef.current.value = '';
    addressRef.current.value = '';
  };

  const handleDelete = (row) => {
    row.remove();
  };

  return (
    <div className="App">
      <PhoneDirectory
        initialSubscribers={initialSubscribers}
        nameRef={nameRef}
        phoneRef={phoneRef}
        addressRef={addressRef}
        tbodyRef={tbodyRef}
        errorRef={errorRef}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
