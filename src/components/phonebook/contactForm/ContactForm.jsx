// import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import action from '../../../redux/phonebook/actions';
import styles from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');
  const name = useSelector(state => state.form.name);
  const number = useSelector(state => state.form.number);
  const dispatch = useDispatch();

  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        dispatch(action.nameValue(value));
        break;

      case 'number':
        dispatch(action.numberValue(value));
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      name,
      number,
    });

    resetName();
    resetNumber();
  };

  const resetName = () => {
    dispatch(action.nameValue(''));
  };

  const resetNumber = () => {
    dispatch(action.numberValue(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.lableName} htmlFor={inputNameId}>
        Name
        <input
          className={styles.inputForm}
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={inputNameId}
        />
      </label>
      <label className={styles.lableName} htmlFor={inputNumberId}>
        Number
        <input
          className={styles.inputForm}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={inputNumberId}
        />
      </label>

      <button className={styles.addBtn} type="submit">
        add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
