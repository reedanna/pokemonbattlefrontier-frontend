import React, { Component } from 'react';
import { Segment, Form, Grid, List } from 'semantic-ui-react';

export default class PokeMove extends Component {
    render() {
        return (
            <Segment>
                <Grid celled='internally' columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.pokemon.moves[this.props.num - 1] ?
                                <>
                                    <h3>Move {this.props.num}:</h3>
                                    <Form.Select
                                        fluid
                                        name={`move${this.props.num}`}
                                        options={this.props.moveOptions}
                                        placeholder={this.props.pokemon.moves[this.props.num - 1].name}
                                        value={this.props.pokemon.moves[this.props.num - 1]}
                                        onChange={(e, data) => this.props.changeMove(e, data, this.props.num)}
                                    />
                                </> :
                                <>
                                    <h3>Move {this.props.num}:</h3>
                                    <Form.Select
                                        fluid
                                        name={`move${this.props.num}`}
                                        options={this.props.moveOptions}
                                        placeholder="Pick a move"
                                        onChange={(e, data) => this.props.changeMove(e, data, this.props.num)}
                                    />
                                </>
                            }
                        </Grid.Column>
                        <Grid.Column>
                            {this.props.pokemon.moves[this.props.num - 1] ?
                                <p>{this.props.pokemon.moves[this.props.num - 1].other_effects}</p>
                                :
                                <p></p>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.pokemon.moves[this.props.num - 1] ?
                                <List>
                                    <List.Item>{this.props.pokemon.moves[this.props.num - 1].type.name}</List.Item>
                                    <List.Item>{this.props.pokemon.moves[this.props.num - 1].category}</List.Item>
                                    {this.props.pokemon.moves[this.props.num - 1].bp ?
                                        <List.Item>{this.props.pokemon.moves[this.props.num - 1].bp} BP</List.Item>
                                        : <List.Item></List.Item>}
                                </List>
                                :
                                <List>
                                    <List.Item>Type</List.Item>
                                    <List.Item>Category</List.Item>
                                    <List.Item>BP</List.Item>
                                </List>
                            }
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item><b>2x damage to:</b></List.Item>
                                {this.props.pokemon.moves[this.props.num - 1] ?
                                    <>
                                        {this.props.pokemon.moves[this.props.num - 1].type.strong_against.map(type =>
                                            <List.Item>{type}</List.Item>)}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item><b>0.5x damage to:</b></List.Item>
                                {this.props.pokemon.moves[this.props.num - 1] ?
                                    <>
                                        {this.props.pokemon.moves[this.props.num - 1].type.weak_against.map(type =>
                                            <List.Item>{type}</List.Item>)}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item><b>0x damage to:</b></List.Item>
                                {this.props.pokemon.moves[this.props.num - 1] ?
                                    <>
                                        {this.props.pokemon.moves[this.props.num - 1].type.no_effect_against.map(type =>
                                            <List.Item>{type}</List.Item>)}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}