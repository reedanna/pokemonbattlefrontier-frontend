import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

export default class PokemonBar extends Component {

    render() {
        return (
            <>
            <Card onClick={this.props.editPokemon} fluid description="Pokemon goes here" />
            </>
        )
    }
}