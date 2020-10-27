import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import MyPokemon from './components/MyPokemon.js'
import NewPokemon from './components/NewPokemon.js'
import EditPokemon from './components/EditPokemon.js'
import LoggedOut from './components/LoggedOut.js'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import { withCookies } from 'react-cookie';

class App extends Component {

  constructor() {
    super();
    this.state = {
      allPokemon: [],
      activeUser: undefined,
      myPokemon: [],
      editingPokemon: false,
      activePokemon: "",
      allNatures: []
    }
  }

  componentDidMount() {
    fetch('https://pbf-backend.herokuapp.com/species')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allPokemon: data
        })
      });

    fetch('https://pbf-backend.herokuapp.com/natures')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allNatures: data
        })
      });

    if (this.props.cookies.get('user')) {
      this.setState({
        activeUser: this.props.cookies.get('user')
      })
      this.getMyPokemon(this.props.cookies.get('user'))
    }
  }

  getMyPokemon = (user) => {
    fetch(`https://pbf-backend.herokuapp.com/users/${user.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          myPokemon: data.pokemons
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
    fetch('https://pbf-backend.herokuapp.com/pokemons', {
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
          editingPokemon: true,
          activePokemon: data
        })
        this.getMyPokemon(this.state.activeUser)
      })
  }

  deletePokemon = (pokemon) => {
    fetch('https://pbf-backend.herokuapp.com/pokemon_moves')
      .then(response => response.json())
      .then(data => {
        if (data.length !== 0) {
          data.forEach(pokemonMove => {
            if (pokemonMove.pokemon_id === pokemon.id) {
              fetch(`https://pbf-backend.herokuapp.com/pokemon_moves/${pokemonMove.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }
              })
                .then(data => {
                  fetch(`https://pbf-backend.herokuapp.com/pokemons/${pokemon.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  })
                    .then(data => {
                      this.getMyPokemon(this.state.activeUser)
                      window.location.href = "/mypokemon";
                    })
                })
            }
          })
        }
        else {
          fetch(`https://pbf-backend.herokuapp.com/pokemons/${pokemon.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(data => {
              this.getMyPokemon(this.state.activeUser)
              window.location.href = "/mypokemon";
            })
        }
      })
  }

  login = (e) => {
    e.preventDefault()

    fetch("https://pbf-backend.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
    })
      .then(r => r.json())
      .then(response => {
        if (response.user) {
          localStorage.setItem("token", response.jwt)
          this.props.cookies.set('user', response.user)
          this.setState({ activeUser: response.user })
          this.getMyPokemon(response.user)
          window.location.href = "/mypokemon";
        }
        else {
          alert(response.message)
        }
      })

    e.target.reset()
  }

  signup = (e) => {
    e.preventDefault()


    if (e.target.password.value === e.target.passwordConfirm.value) {
      fetch("https://pbf-backend.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name: e.target.username.value, password: e.target.password.value })
      })
        .then(r => r.json())
        .then(response => {
          if (response.status === "created") {
            this.setState({ activeUser: response.user })
            localStorage.setItem("token", response.jwt)
            this.props.cookies.set('user', response.user)
            window.location.href = "/mypokemon";
          }
          else {
            alert(response.error)
          }
        })
    }
    else {
      alert("Passwords do not match.")
    }

    e.target.reset()
  }

  logout = () => {
    this.stopEditingPokemon()
    this.props.cookies.remove('user')
    this.setState({
      activeUser: undefined,
      myPokemon: []
    })
  }

  render() {
    return (
      <>
        <Header activeUser={this.state.activeUser} />
        <Router>
          {this.state.activeUser !== undefined ?
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
                <Menu.Item onClick={this.logout} link >
                  Logout
              </Menu.Item>
              </NavLink>
            </Menu>
            : <> </>}

          <Segment clearing padded>
            {this.state.editingPokemon ?
              <EditPokemon pokemon={this.state.activePokemon} allNatures={this.state.allNatures} savePokemon={this.savePokemon} deletePokemon={this.deletePokemon} cookies={this.props.cookies} />
              :
              <>

                <Route exact path="/">
                  {this.props.cookies.get('user') ? <Redirect to="/mypokemon" /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/mypokemon" render={() => (
                  <MyPokemon pokemon={this.state.myPokemon} editPokemon={this.editPokemon} activeUser={this.state.activeUser} cookies={this.props.cookies} />
                )} />
                <Route exact path="/newpokemon" render={() => (
                  <NewPokemon species={this.state.allPokemon} addPokemon={this.addPokemon} cookies={this.props.cookies} />
                )} />
                <Route exact path="/login" render={() => (
                  <LoggedOut login={this.login} signup={this.signup} cookies={this.props.cookies} />
                )} />
              </>
            }
          </Segment>
        </Router>
      </>
    )
  }
}

export default withCookies(App);

