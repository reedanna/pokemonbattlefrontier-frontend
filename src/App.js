import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import MyPokemon from './components/MyPokemon.js'
import NewPokemon from './components/NewPokemon.js'
import LoggedOut from './components/LoggedOut.js'
import EditPokemon from './components/EditPokemon.js'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      allPokemon: [],
      activeUser: "",
      myPokemon: [],
      editingPokemon: false,
      activePokemon: "",
      allNatures: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/species')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allPokemon: data
        })
      });

    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        this.setState({
          activeUser: data[0],
          myPokemon: data[0].pokemons
        })
      });

      fetch('http://localhost:3000/natures')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allNatures: data
        })
      });
  }

  editPokemon = (pokemon) => {
    this.setState({
      editingPokemon: true,
      activePokemon: pokemon
    })
  }

  stopEditingPokemon = () => {
    this.setState({
      editingPokemon: false
    })
  }

  addPokemon = (species) => {
    fetch('http://localhost:3000/pokemons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: species.name,
        species_id: species.id,
        user_id: this.state.activeUser.id,
        nature_id: 1,
        ability_id: species.abilities[0].id
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          myPokemon: [...this.state.myPokemon, data],
          editingPokemon: true,
          activePokemon: data
        })
      })
  }

  render() {
    return (
      <>
        <Header />
        <Router>
          <Menu>
            <NavLink to="/mypokemon">
              <Menu.Item onClick={this.stopEditingPokemon} link>
                My Pokemon
             </Menu.Item>
            </NavLink>


            <NavLink to="/newpokemon">
              <Menu.Item onClick={this.stopEditingPokemon} link >
                New Pokemon
              </Menu.Item>
            </NavLink>


            <NavLink to="/login">
              <Menu.Item onClick={this.stopEditingPokemon} link >
                Logout
              </Menu.Item>
            </NavLink>
          </Menu>

          <Container>
            {this.state.editingPokemon ?
              <EditPokemon pokemon={this.state.activePokemon} allNatures={this.state.allNatures} savePokemon={this.savePokemon} />
              :
              <>
                <Route exact path="/mypokemon" render={() => (
                  <MyPokemon pokemon={this.state.myPokemon} editPokemon={this.editPokemon} />
                )} />
                <Route exact path="/newpokemon" render={() => (
                  <NewPokemon species={this.state.allPokemon} addPokemon={this.addPokemon} />
                )} />
                <Route exact path="/login" render={() => (
                  <LoggedOut />
                )} />
              </>
            }
          </Container>


        </Router>
      </>
    )
  }
}

