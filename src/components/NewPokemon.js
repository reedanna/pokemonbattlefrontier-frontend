import React, { Component } from 'react';
import { Card, Input, Dropdown, Segment } from 'semantic-ui-react';
import PokemonCard from './PokemonCard.js'

export default class NewPokemon extends Component {

    constructor() {
        super()
        this.state = {
            typeOptions: [],
            nameFilter: '',
            typeFilter: ''
        }
    }

    componentDidMount() {
        if (this.state.typeOptions.length === 0) {
            fetch('https://pbf-backend.herokuapp.com/types')
                .then(response => response.json())
                .then(data => {
                    this.state.typeOptions.push({key: "t0", text: "All", value: ""})
                    data.forEach(type => {
                        this.state.typeOptions.push({ key: "t" + type.id, text: type.name, value: type.name })
                    })
                });
        }
    }

    filterPokemonByName = (e, data) => {
        this.setState({ nameFilter: data.value })
    }

    filterPokemonByType = (e, data) => {
        this.setState({ typeFilter: data.value })
    }

    render() {
        return (
            <>
                <Segment compact floated='right' secondary>
                    <Input
                        action={
                            <Dropdown button basic floating options={this.state.typeOptions} placeholder='Type' onChange={this.filterPokemonByType} />
                        }
                        icon='search'
                        iconPosition='left'
                        placeholder='Search...'
                        onChange={this.filterPokemonByName}
                    />
                </Segment>
                <h2>Choose New Pokemon</h2>
                <div className="container">
                    <Card.Group itemsPerRow='4'>
                        {this.props.species.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()) && pokemon.types.some(type => type.name.includes(this.state.typeFilter))).map(pokemon =>
                            <PokemonCard addPokemon={this.props.addPokemon} species={pokemon} key={pokemon.id} />
                        )}
                    </Card.Group>
                </div>
            </>
        )
    }
}