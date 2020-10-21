import React, { Component } from 'react';
import PokeStats from './PokeStats.js'
import PokeAbility from './PokeAbility.js'
import { Image, Form, List, Grid, Button, Icon, Popup, Segment } from 'semantic-ui-react';
import PokeMove from './PokeMove.js';

var natureOptions = []
var abilityOptions = []
var moveOptions = []
var poke = {
    name: "",
    types: [{ name: "" }, { name: "" }],
    nature: {
        name: ""
    },
    species: {
        name: "",
        sprite_url: ""
    },
    ability: {
        name: ""
    },
    moves: []
}

export default class EditPokemon extends Component {

    constructor() {
        super()
        natureOptions = []
        abilityOptions = []
        moveOptions = []
        this.state = {
            resistances: [],
            weaknesses: [],
            immunities: [],


            name: "",
            HP: "",
            attack: "",
            special_attack: "",
            defense: "",
            special_defense: "",
            speed: "",

            changedMoves: [],
            removedMoves: [],
            removedIds: []
        }
    }

    componentDidMount() {
        poke = this.props.pokemon

        this.props.allNatures.forEach(nature => {
            natureOptions.push({ key: "n" + nature.id, text: `${nature.name} (+ ${nature.stat_raised.split('_').join(' ')}, - ${nature.stat_lowered.split('_').join(' ')})`, value: nature })
        })

        fetch(`http://localhost:3000/species/${poke.species_id}`)
            .then(response => response.json())
            .then(data => {
                data.moves.forEach(move => {
                    moveOptions.push({ key: "m" + move.id, text: move.name, value: move })
                })
                data.abilities.forEach(ability => {
                    abilityOptions.push({ key: "a" + ability.id, text: ability.name, value: ability })
                })
            });

        this.setState({
            resistances: this.calculateResistances(),
            weaknesses: this.calculateWeaknesses(),
            immunities: this.calculateImmunities(),
            name: poke.name,
            changedMoves: [],
            removedMoves: [],
            removedIds: []
        })

        this.calculateStats()
    }

    // calculates which types a Pokemon resists
    calculateResistances = () => {

        if (poke.types.length === 1) {
            return poke.types[0].resists
        }
        else {
            let strengths = poke.types[0].resists
            strengths = strengths.filter(type =>
                !poke.types[1].weak_to.includes(type) && !poke.types[1].immune_to.includes(type)
            )
            strengths = strengths.concat(poke.types[1].resists)
            strengths = strengths.filter(type =>
                !poke.types[0].weak_to.includes(type) && !poke.types[0].immune_to.includes(type)
            )
            return [...new Set(strengths)]
        }
    }

    // calculates which types a pokemon is weak to
    calculateWeaknesses = () => {

        if (poke.types.length === 1) {
            return poke.types[0].weak_to
        }
        else {
            let weaknesses = poke.types[0].weak_to
            weaknesses = weaknesses.filter(type =>
                !poke.types[1].resists.includes(type) && !poke.types[1].immune_to.includes(type)
            )
            weaknesses = weaknesses.concat(poke.types[1].weak_to)
            weaknesses = weaknesses.filter(type =>
                !poke.types[0].resists.includes(type) && !poke.types[0].immune_to.includes(type)
            )
            return [...new Set(weaknesses)]
        }
    }

    //calculates which types a pokemon is immune to
    calculateImmunities = () => {

        if (poke.types.length === 1) {
            return poke.types[0].immune_to
        }
        else {
            let immunities = poke.types[0].immune_to
            immunities = immunities.concat(poke.types[1].immune_to)
            return [...new Set(immunities)]
        }
    }

    changeName = (e, data) => {
        poke.name = data.value
        this.setState({
            name: data.value
        })
    }

    changeNature = (e, data) => {
        poke.nature = data.value
        this.calculateStats()
    }

    changeAbility = (e, data) => {
        poke.ability = data.value
        this.forceUpdate()
    }

    calculateStats = () => {
        Object.keys(this.state).forEach(stat => {
            if (poke.nature.stat_raised === stat) {
                this.setState({
                    [stat]: Math.floor(poke.species[stat] * 1.1)
                })
            }
            else if (poke.nature.stat_lowered === stat) {
                this.setState({
                    [stat]: Math.floor(poke.species[stat] * 0.9)
                })
            }
            else if (stat === "HP" || stat === "attack" || stat === "special_attack" || stat === "defense" || stat === "special_defense" || stat === "speed") {
                this.setState({
                    [stat]: Math.floor(poke.species[stat])
                })
            }
        })
    }

    changeMove = (e, data, num) => {
        if (poke.moves[num - 1]) {
            this.setState({
                removedMoves: [...this.state.removedMoves, poke.moves[num - 1]],
                changedMoves: [...this.state.changedMoves, data.value]
            }, () => {
                poke.moves[num - 1] = data.value
                this.forceUpdate()
            })
        }
        else {
            this.setState({
                changedMoves: [...this.state.changedMoves, data.value]
            }, () => {
                poke.moves[num - 1] = data.value
                this.forceUpdate()
            })
        }
    }

    savePokemon = (e) => {
        fetch(`http://localhost:3000/pokemons/${poke.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: e.target.name.value,
                ability_id: poke.ability.id,
                nature_id: poke.nature.id
            }),
        })
        this.state.changedMoves.forEach(move => {
            fetch(`http://localhost:3000/pokemon_moves`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pokemon_id: poke.id,
                    move_id: move.id
                }),
            })
        })
        if (this.state.removedMoves.length !== 0) {
            this.state.removedMoves.forEach(move => {
                fetch(`http://localhost:3000/pokemon_moves`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(pokemonMove => {
                            if (pokemonMove.pokemon_id === poke.id && pokemonMove.move_id === move.id) {
                                this.setState({
                                    removedIds: [...this.state.removedIds, pokemonMove.id]
                                }, () => {
                                    this.state.removedIds.forEach(id => {
                                        fetch(`http://localhost:3000/pokemon_moves/${id}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            }
                                        })
                                    })
                                })
                            }
                        })
                    })
            })
        }
    }


    render() {
        return (
            <>
                <Popup
                    content={<><p>Are you sure?</p><Button primary onClick={() => this.props.deletePokemon(poke)}>Yes, delete {poke.name}</Button></>}
                    on='click'
                    trigger={<Button primary icon labelPosition='right' floated='right'><Icon name='trash' />Delete</Button>} 
                    />
    
                <h2>Edit Pokemon</h2>
                <Form onSubmit={(e) => this.savePokemon(e)}>
                    <Segment clearing>
                        <Form.Group widths="equal">
                            <Form.Input name="name" defaultValue={this.state.name} size="big" onChange={this.changeName} />
                            <i>({poke.species.name})</i>
                        </Form.Group>
                        <Image src={poke.species.sprite_url} size="medium" floated="left" />
                        <List horizontal>
                            <List.Item><h2>{poke.types[0].name}</h2></List.Item>
                            {poke.types.length === 2 ?
                                <>
                                    <List.Item><h2>/</h2></List.Item>
                                    <List.Item><h2>{poke.types[1].name}</h2></List.Item>
                                </> :
                                <></>
                            }
                        </List>
                        <Grid columns='three' divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <h3>Weak To:</h3>
                                </Grid.Column>
                                <Grid.Column>
                                    <h3>Resists:</h3>
                                </Grid.Column>
                                <Grid.Column>
                                    <h3>Immune To:</h3>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <List>
                                        {this.state.weaknesses.map(type =>
                                            <List.Item>{type}</List.Item>)}
                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    <List>
                                        {this.state.resistances.map(type =>
                                            <List.Item>{type}</List.Item>)}
                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    <List>
                                        {this.state.immunities.map(type =>
                                            <List.Item>{type}</List.Item>)}
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <PokeStats
                            pokemon={poke}
                            natureOptions={natureOptions}
                            changeNature={this.changeNature}
                            HP={this.state.HP}
                            attack={this.state.attack}
                            special_attack={this.state.special_attack}
                            defense={this.state.defense}
                            special_defense={this.state.special_defense}
                            speed={this.state.speed} />

                    </Segment>

                    <PokeAbility
                        pokemon={poke}
                        abilityOptions={abilityOptions}
                        changeAbility={this.changeAbility}
                    />

                    <PokeMove
                        pokemon={poke}
                        num={1}
                        moveOptions={moveOptions}
                        changeMove={this.changeMove}
                    />

                    <PokeMove
                        pokemon={poke}
                        num={2}
                        moveOptions={moveOptions}
                        changeMove={this.changeMove}
                    />

                    <PokeMove
                        pokemon={poke}
                        num={3}
                        moveOptions={moveOptions}
                        changeMove={this.changeMove}
                    />

                    <PokeMove
                        pokemon={poke}
                        num={4}
                        moveOptions={moveOptions}
                        changeMove={this.changeMove}
                    />

                    <Popup hideOnScroll content='Changes Saved!' on='click' trigger={<Button primary type='submit' floated='right'>Save</Button>} />
                </Form>
            </>
        )
    }
}