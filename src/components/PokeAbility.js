import React, { Component } from 'react';
import { Segment, Form, Grid } from 'semantic-ui-react';

export default class PokeAbility extends Component {
    render() {
        return (
            <Segment>
                <Grid columns='2'>
                    <Grid.Column>
                        <h3>Ability:</h3>
                        <Form.Select
                            fluid
                            name="ability"
                            options={this.props.abilityOptions}
                            placeholder={this.props.pokemon.ability.name}
                            defaultValue={this.props.pokemon.ability}
                            onChange={this.props.changeAbility}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <p>{this.props.pokemon.ability.effect}</p>
                    </Grid.Column>
                </Grid>
            </Segment>

        )
    }
}