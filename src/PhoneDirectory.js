import React from 'react';

function PhoneDirectory({
  subscribers,
  nameRef,
  phoneRef,
  addressRef,
  errorRef,
  onAdd,
  onDelete,
  searchText,
  setSearchText,
  sortOption,
  setSortOption
}) {
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Name"
          className="input-field"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="input-field"
        >
          <option value="ID_ASC">Sort by: ID Asc</option>
          <option value="ID_DESC">Sort by: ID Desc</option>
          <option value="NAME_AZ">Name A→Z</option>
          <option value="NAME_ZA">Name Z→A</option>
        </select>
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
        <tbody>
          {subscribers.map(sub => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.phone}</td>
              <td>{sub.address}</td>
              <td>
                <button className="delete-btn" onClick={() => onDelete(sub.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PhoneDirectory;
