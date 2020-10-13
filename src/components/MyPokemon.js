import React, { Component } from 'react';
import PokemonBar from './PokemonBar.js';

export default class MyPokemon extends Component {

    render() {
        return (
            <>
            <h2>My Pokemon</h2> 
            <div className="container">
            {this.props.pokemon.map(pokemon =>
                <PokemonBar editPokemon={this.props.editPokemon} pokemon={pokemon} />
                )}
             </div>
            </>
        )
    }
}