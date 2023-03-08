import { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Title, Container } from './Phonebook/PhoneBook.styled';
import ContactForm from './Phonebook/ContactForm';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';

const KEY = 'contacts';
const savedContacts = JSON.parse(localStorage.getItem(KEY));

export function App() {
  const [contacts, setContacts] = useState(savedContacts || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = value => {
    if (contacts.find(({ name }) => name === value.name)) {
      alert(`${value.name} is already in contacts`);
      return;
    }
    setContacts(prev => [...prev, value]);
  };

  const showContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const deleteContact = contactId =>
    setContacts(contacts.filter(({ id }) => id !== contactId));

  const onChangeHandler = e => setFilter(e.target.value);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSave={value => addContact(value)} />
      <Title>Contacts</Title>
      <Filter handleChange={onChangeHandler} />
      <ContactList contacts={showContacts()} deleteContact={deleteContact} />
      <GlobalStyle />
    </Container>
  );
}
