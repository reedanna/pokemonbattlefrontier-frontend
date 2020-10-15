import React, { Component } from 'react';
import { List, Form, Grid, Progress } from 'semantic-ui-react';

export default class PokeStats extends Component {
    render() {
        return (
            <Grid columns='2' divided>
                <Grid.Column>
                    <List>
                        <List.Item><b>HP:</b> <Progress progress='value' value={this.props.HP} total={200} size='medium' color='green' /></List.Item>
                        <List.Item><b>Attack:</b> <Progress progress='value' value={this.props.attack} total={200} size='medium' color='red' /></List.Item>
                        <List.Item><b>Special Attack:</b> <Progress progress='value' value={this.props.special_attack} total={200} size='medium' color='pink' /></List.Item>
                        <List.Item><b>Defense:</b> <Progress progress='value' value={this.props.defense} total={200} size='medium' color='blue' /></List.Item>
                        <List.Item><b>Special Defense:</b> <Progress progress='value' value={this.props.special_defense} total={200} size='medium' color='violet' /></List.Item>
                        <List.Item><b>Speed:</b> <Progress progress='value' value={this.props.speed} total={200} size='medium' color='yellow' /></List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <h3>Nature:</h3>
                    <Form.Select
                        fluid
                        options={this.props.natureOptions}
                        placeholder={this.props.pokemon.nature.name}
                        defaultValue={this.props.pokemon.nature}
                        onChange={this.props.changeNature}
                    />
                </Grid.Column>
            </Grid>

        )
    }
}