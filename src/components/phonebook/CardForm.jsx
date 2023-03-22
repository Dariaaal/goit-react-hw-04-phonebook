import React, { Component } from "react";
import { nanoid } from "nanoid";
import css from "./CardForm.module.css";

class CardForm extends Component {
    state = {
        name: '',
        number: '',
    }

    nameInputId = nanoid();
    numberInputId = nanoid();

    handleInputChange = e => {
        const {name, value} = e.currentTarget;
        this.setState({
          [name]: value,
        });
      };
    
    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);

        this.reset();
      };

    reset = () => {
        this.setState({name: '', number: '',})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label htmlFor={this.nameInputId} className={css.label}>
              Name
              </label>
                <input
                  type="text"
                  id={this.nameInputId}
                  name="name"
                  value={this.state.name}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                  onChange={this.handleInputChange}
                />
            <label htmlFor={this.numberInputId} className={css.label}>
              Number
            </label>
                <input 
                  type="tel"
                  id={this.numberInputId} 
                  name="number"
                  value={this.state.number}
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required 
                  onChange={this.handleInputChange}
                />
            <button type="submit" className={css.button}>Add contact</button>
          </form>
        );
    }
}

export default CardForm;