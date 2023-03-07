import { useState } from 'react';
import { nanoid } from 'nanoid';
import { AddContactForm, FormInput, FormLabel } from './PhoneBook.styled';

export default function ContactForm({ onSave }) {
  let [name, setName] = useState('');
  let [number, setNumber] = useState('');

  const onChangeHandler = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const saveNewContact = e => {
    e.preventDefault();
    onSave({
      id: nanoid(),
      name,
      number,
    });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <AddContactForm onSubmit={saveNewContact}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={onChangeHandler}
          required
        />
      </FormLabel>

      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={onChangeHandler}
          required
        />
      </FormLabel>
      <button type="submit">Add contact</button>
    </AddContactForm>
  );
}

// export default class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.props.onSave({
//       id: nanoid(),
//       name: this.state.name,
//       number: this.state.number,
//     });
//     this.reset();
//   };

//   onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

//   reset = () => this.setState({ name: '', number: '' });

//   render() {
//     return (
//       <AddContactForm onSubmit={this.onSubmit}>
//         <FormLabel>
//           Name
//           <FormInput
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             value={this.state.name}
//             onChange={this.onChangeHandler}
//             required
//           />
//         </FormLabel>

//         <FormLabel>
//           Number
//           <FormInput
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             value={this.state.number}
//             onChange={this.onChangeHandler}
//             required
//           />
//         </FormLabel>
//         <button type="submit">Add contact</button>
//       </AddContactForm>
//     );
//   }
// }
