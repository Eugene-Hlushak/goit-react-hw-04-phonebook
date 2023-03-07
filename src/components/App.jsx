import { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Title, Container } from './Phonebook/PhoneBook.styled';
import ContactForm from './Phonebook/ContactForm';
import Filter from './Phonebook/Filter';
import ContactList from './Phonebook/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = value => {
    if (this.state.contacts.find(({ name }) => name === value.name)) {
      alert(`${value.name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, value],
      };
    });
  };

  deleteContact = contactId =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));

  showContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSave={value => this.addContact(value)} />
        <Title>Contacts</Title>
        <Filter handleChange={this.onChangeHandler} />
        <ContactList
          contacts={this.showContacts()}
          deleteContact={this.deleteContact}
        />
        <GlobalStyle />
      </Container>
    );
  }
}
