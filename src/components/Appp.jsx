import React, { useState, useEffect } from "react";
import CardForm from "./phonebook/CardForm";
import CardList from "./phonebook/CardList";
import initialContacts from "./phonebook/contacts.json";
import Filter from "./phonebook/Filter";
import { nanoid } from "nanoid";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;  
  })
}

export default function App() {
    const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
     
    const [filter, setFilter] = useState('');

    const deleteContact = contactId => {
        setContacts(contact => contact.filter(contact => contact.id !== contactId))
    }
    
    useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts])

    return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101'
          }}
        >
        <h1>Phonebook</h1>
        <CardForm onSubmit={this.formSubmitHandler}/>
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.changeFilter}/>
        <CardList contacts={visibleContacts} onDeleteContact={deleteContact}/>
        </div>
      );
}