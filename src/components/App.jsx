import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Title, Container } from './Phonebook/PhoneBook.styled';
import ContactForm from './Phonebook/ContactForm';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';

const inititalContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(inititalContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
  }, []);

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

// class Appy extends Component {
//   state = {
//     contacts: [
//       { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
//       { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
//       { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
//       { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (savedContacts) {
//       this.setState({ contacts: savedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = value => {
//     if (this.state.contacts.find(({ name }) => name === value.name)) {
//       alert(`${value.name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => {
//       return {
//         contacts: [...prevState.contacts, value],
//       };
//     });
//   };

//   deleteContact = contactId =>
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//     }));

//   showContacts = () =>
//     this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
//     );

//   onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

//   render() {
//     return (
//       <Container>
//         <Title>Phonebook</Title>
//         <ContactForm onSave={value => this.addContact(value)} />
//         <Title>Contacts</Title>
//         <Filter handleChange={this.onChangeHandler} />
//         <ContactList
//           contacts={this.showContacts()}
//           deleteContact={this.deleteContact}
//         />
//         <GlobalStyle />
//       </Container>
//     );
//   }
// }
