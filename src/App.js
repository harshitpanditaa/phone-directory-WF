import React, { useRef, useState } from 'react';
import PhoneDirectory from './PhoneDirectory';
import './App.css';

function App() {
  const initialSubscribers = [
    { id: 1, name: 'Anil', phone: '1234567890', address: '123 New Delhi' },
    { id: 2, name: 'Pratibha', phone: '9876543210', address: '456 Gurugram' },
    { id: 3, name: 'Vikas', phone: '5555555555', address: '789 Ring Road' }
  ];

  const [subs, setSubs] = useState(initialSubscribers);
  const [searchText, setSearchText] = useState('');
  const [filteredSubs, setFilteredSubs] = useState(initialSubscribers);
  const [sortedSubs, setSortedSubs] = useState(initialSubscribers);
  const [sortOption, setSortOption] = useState('ID_ASC');

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const errorRef = useRef(null);
  let idCounter = useRef(4);

  // Debounced search effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText.trim()) {
        setFilteredSubs(subs);
      } else {
        setFilteredSubs(
          subs.filter(sub => sub.name.toLowerCase().includes(searchText.toLowerCase()))
        );
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, subs]);

  // Sorting effect
  React.useEffect(() => {
    let sorted = [...filteredSubs];
    switch (sortOption) {
      case 'ID_ASC':
        sorted.sort((a, b) => a.id - b.id);
        break;
      case 'ID_DESC':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'NAME_AZ':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'NAME_ZA':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setSortedSubs(sorted);
  }, [filteredSubs, sortOption]);

  const handleAdd = () => {
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const address = addressRef.current.value.trim();

    if (!name || !phone || !address) {
      errorRef.current.textContent = 'All fields are required!';
      errorRef.current.style.display = 'block';
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      errorRef.current.textContent = 'Name must contain only letters and spaces!';
      errorRef.current.style.display = 'block';
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      errorRef.current.textContent = 'Phone number must be exactly 10 digits!';
      errorRef.current.style.display = 'block';
      return;
    }

    errorRef.current.textContent = '';
    errorRef.current.style.display = 'none';

    const newSub = {
      id: idCounter.current++,
      name,
      phone,
      address
    };
    setSubs([...subs, newSub]);
    nameRef.current.value = '';
    phoneRef.current.value = '';
    addressRef.current.value = '';
  };

  const handleDelete = (id) => {
    setSubs(subs.filter(sub => sub.id !== id));
  };

  return (
    <div className="App">
      <PhoneDirectory
        subscribers={sortedSubs}
        nameRef={nameRef}
        phoneRef={phoneRef}
        addressRef={addressRef}
        errorRef={errorRef}
        onAdd={handleAdd}
        onDelete={handleDelete}
        searchText={searchText}
        setSearchText={setSearchText}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
}

export default App;
