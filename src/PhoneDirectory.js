import React, { useEffect } from 'react';

function PhoneDirectory({ 
  initialSubscribers, 
  nameRef, 
  phoneRef, 
  addressRef, 
  tbodyRef, 
  errorRef, 
  onAdd, 
  onDelete 
}) {

  useEffect(() => {
  // Only add initial rows if the table is empty
  if (tbodyRef.current && tbodyRef.current.children.length === 0) {
    initialSubscribers.forEach(subscriber => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${subscriber.id}</td>
        <td>${subscriber.name}</td>
        <td>${subscriber.phone}</td>
        <td>${subscriber.address}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
      const deleteBtn = row.querySelector('.delete-btn');
      deleteBtn.onclick = () => onDelete(row);
      tbodyRef.current.appendChild(row);
    });
  }
}, [initialSubscribers, tbodyRef, onDelete]);

  return (
    <div className="phone-directory">
      <h2>Phone Directory</h2>

      <div className="form-container">
        <input 
          type="text" 
          ref={nameRef} 
          placeholder="Name" 
          className="input-field"
        />
        <input 
          type="text" 
          ref={phoneRef} 
          placeholder="Phone" 
          className="input-field"
        />
        <input 
          type="text" 
          ref={addressRef} 
          placeholder="Address" 
          className="input-field-address"
        />
      </div>

      <div className="button-container">
        <button onClick={onAdd} className="add-btn">Add</button>
      </div>

      <div ref={errorRef} className="error-message"></div>

      <table className="subscriber-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          {/* Rows will be added via DOM manipulation */}
        </tbody>
      </table>
    </div>
  );
}

export default PhoneDirectory;
