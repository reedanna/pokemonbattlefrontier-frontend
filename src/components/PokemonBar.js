import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

export default class PokemonBar extends Component {

    render() {
        return (
            <>
                <Card onClick={() => this.props.editPokemon(this.props.pokemon)} fluid >
                    <Card.Content>
                        <Image src={this.props.pokemon.species.sprite_url} size='tiny' floated='left' />
                        <Card.Header >
                            {this.props.pokemon.name} <i>({this.props.pokemon.species.name})</i>
                        </Card.Header>
                        <Icon name='angle right' size='huge' />
                    </Card.Content>
                </Card>
            </>
        )
    }
}