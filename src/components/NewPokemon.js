import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import PokemonCard from './PokemonCard.js'

export default class NewPokemon extends Component {

    render() {
        return (
            <>
            <h2>Choose New Pokemon</h2> 
            <div className="container">
                <Card.Group itemsPerRow='4'>
            {this.props.species.map(pokemon =>
                <PokemonCard addPokemon={this.props.addPokemon} species={pokemon} key={pokemon.id}/>
                )}
                </Card.Group>
             </div>
            </>
        )
    }
}