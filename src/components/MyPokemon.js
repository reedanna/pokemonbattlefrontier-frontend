import React, { Component } from 'react';
import PokemonBar from './PokemonBar.js';

export default class MyPokemon extends Component {

    render() {
        return (
            <>
                {this.props.activeUser !== undefined ?
                    <h2>{this.props.activeUser.name}'s Pokemon</h2>
                    : <h2>My Pokemon</h2>
                }
                {this.props.pokemon.length > 0 ?
                    <div className="container">
                        {this.props.pokemon.map(pokemon =>
                            <PokemonBar editPokemon={this.props.editPokemon} pokemon={pokemon} />
                        )}
                    </div>
                    : 
                    <p>None yet. Click "New Pokemon" to choose one!</p>
                }

            </>
        )
    }
}