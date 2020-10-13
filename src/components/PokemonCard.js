import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class PokemonBar extends Component {

    render() {
        return (
            <>
                <Card onClick={(e) => this.props.addPokemon(this.props.species)}>
                    <Card.Content>
                        <Image src={this.props.species.sprite_url} size='tiny' floated='left' />
                        <Card.Header>
                            {this.props.species.name}
                        </Card.Header>
                        <Card.Meta>
                            {this.props.species.types.length === 1 ?
                                <>
                                    {this.props.species.types[0].name}
                                </>
                                :
                                <>
                                    {this.props.species.types[0].name}/{this.props.species.types[1].name}
                                </>
                            }
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </>
        )
    }
}