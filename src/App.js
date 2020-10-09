import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import MyPokemon from './components/MyPokemon.js'
import NewPokemon from './components/NewPokemon.js'
import LoggedOut from './components/LoggedOut.js'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      allPokemon: [],
      activeUser: "",
      myPokemon: [1, 2, 3],
      editingPokemon: false
    }
  }

  editPokemon = () => {
    this.setState({
      editingPokemon: true
    })
  }

  stopEditingPokemon = () => {
    this.setState({
      editingPokemon: false
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
            <p>editing Pokemon</p>
          :
          <>
          <Route exact path="/mypokemon" render={() => (
            <MyPokemon pokemon={this.state.myPokemon} editPokemon={this.editPokemon} />
          )} />
          <Route exact path="/newpokemon" render={() => (
            <NewPokemon />
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

