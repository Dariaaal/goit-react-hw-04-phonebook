import React, { Component } from "react";
import CardForm from "./phonebook/CardForm";
import CardList from "./phonebook/CardList";
import initialContacts from "./phonebook/contacts.json";
import Filter from "./phonebook/Filter";
import { nanoid } from "nanoid";

export class App extends Component {

  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      }))
  }

  formSubmitHandler = data =>{

    if (this.dublicateContact(data)) {
      return alert (`${data.name} is already in contacts` )
    }
      const contact = {
        id: nanoid(),
        ...data
      }
    
      this.setState(prevState => ({
        contacts:[contact, ...prevState.contacts]
      }))
    }
    
  dublicateContact = data => {
     return this.state.contacts.find(item => item.name ===data.name)
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
  }

  getVisibleContacts = () => {
    const {contacts, filter} = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter),
      );
  }

  render(){
    const {filter} = this.state;
    const visibleContacts = this.getVisibleContacts();

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
      <CardList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
      </div>
    );
  }
};

