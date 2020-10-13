import React, { Component } from 'react';
import { Image, Form, List, Grid } from 'semantic-ui-react';

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

            HP: "",
            attack: "",
            special_attack: "",
            defense: "",
            special_defense: "",
            speed: ""

        }
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

    componentDidMount() {
        poke = this.props.pokemon

        this.props.allNatures.forEach(nature => {
            natureOptions.push({ key: nature.id, text: nature.name, value: nature })
        })

        fetch(`http://localhost:3000/species/${poke.species_id}`)
            .then(response => response.json())
            .then(data => {
                data.moves.forEach(move => {
                    moveOptions.push({ key: move.id, text: move.name, value: move })
                })
                data.abilities.forEach(ability => {
                    abilityOptions.push({ key: ability.id, text: ability.name, value: ability })
                })
            });

        this.setState({
            resistances: this.calculateResistances(),
            weaknesses: this.calculateWeaknesses(),
            immunities: this.calculateImmunities(),
            HP: poke.species.HP,
            attack: poke.species.attack,
            special_attack: poke.species.special_attack,
            defense: poke.species.defense,
            special_defense: poke.species.special_defense,
            speed: poke.species.speed
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
        console.log(poke.nature)

        Object.keys(this.state).forEach(stat => {
            if (poke.nature.stat_raised === stat) {
                this.setState({
                    stat: poke.species.stat * 1.1
                })
            }
            else if (poke.nature.stat_lowered === stat) {
                this.setState({
                    stat: poke.species.stat * 0.9
                })
            }
        })
    }

    changeMove1 = (e, data) => {
        console.log(data.value)
        poke.moves[0] = data.value
        this.forceUpdate()
    }

    changeMove2 = (e, data) => {
        console.log(data.value)
        poke.moves[1] = data.value
        this.forceUpdate()
    }

    changeMove3 = (e, data) => {
        console.log(data.value)
        poke.moves[2] = data.value
        this.forceUpdate()
    }

    changeMove4 = (e, data) => {
        console.log(data.value)
        poke.moves[3] = data.value
        this.forceUpdate()
    }


    render() {
        console.log(poke.moves[0])
        return (
            <>
                <h2>Edit Pokemon</h2>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Input name="name" value={poke.name} size="big" />
                        <i>({poke.species.name})</i>
                    </Form.Group>
                    <Image src={poke.species.sprite_url} size="medium" floated="left" />
                    <List bulleted horizontal>
                        <List.Item>{poke.types[0].name}</List.Item>
                        <List.Item>{poke.types[1].name}</List.Item>
                    </List>
                    <Grid columns='three' divided>
                        <Grid.Row>
                            <Grid.Column>
                                <b>Weak To:</b>
                            </Grid.Column>
                            <Grid.Column>
                                <b>Resists:</b>
                            </Grid.Column>
                            <Grid.Column>
                                <b>Immune To:</b>
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

                    {/* <Grid columns='2' divided>
                        <Grid.Column>
                            <List>
                                <List.Item><b>HP:</b> {this.state.HP}</List.Item>
                                <List.Item><b>Attack:</b> {this.state.attack}</List.Item>
                                <List.Item><b>Special Attack:</b> {this.state.special_attack}</List.Item>
                                <List.Item><b>Defense:</b> {this.state.defense}</List.Item>
                                <List.Item><b>Special Defense:</b> {this.state.special_defense}</List.Item>
                                <List.Item><b>Speed:</b> {this.state.speed}</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Select
                                fluid
                                label='Nature'
                                options={natureOptions}
                                placeholder={poke.nature.name}
                                defaultValue={poke.nature}
                                onChange={this.changeNature}
                            />
                        </Grid.Column>
                    </Grid> */}

                    <Grid columns='2'>
                        <Grid.Column>
                            <Form.Select
                                fluid
                                label='Ability'
                                options={abilityOptions}
                                placeholder={poke.ability.name}
                                defaultValue={poke.ability}
                                onChange={this.changeAbility}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <p>{poke.ability.effect}</p>
                        </Grid.Column>
                    </Grid>


                    {/* move 1 */}
                    <Grid celled columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[0] ?
                                    <Form.Select
                                        fluid
                                        label='Move 1'
                                        options={moveOptions}
                                        placeholder={poke.moves[0].name}
                                        value={poke.moves[0]}
                                        onChange={this.changeMove1}
                                    /> :
                                    <Form.Select
                                        fluid
                                        label='Move 1'
                                        options={moveOptions}
                                        placeholder="Pick a move"
                                        onChange={this.changeMove1}
                                    />
                                }
                            </Grid.Column>
                            <Grid.Column>
                                {poke.moves[0] ?
                                    <p>{poke.moves[0].other_effects}</p>
                                    :
                                    <p></p>}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[0] ?
                                    <List>
                                        <List.Item>{poke.moves[0].type.name}</List.Item>
                                        <List.Item>{poke.moves[0].category}</List.Item>
                                        <List.Item>{poke.moves[0].bp}</List.Item>
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
                                    {poke.moves[0] ?
                                        <>
                                            {poke.moves[0].type.strong_against.map(type =>
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
                                    {poke.moves[0] ?
                                        <>
                                            {poke.moves[0].type.weak_against.map(type =>
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
                                    {poke.moves[0] ?
                                        <>
                                            {poke.moves[0].type.no_effect_against.map(type =>
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

                    {/* move 2 */}
                    <Grid celled columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[1] ?
                                    <Form.Select
                                        fluid
                                        label='Move 2'
                                        options={moveOptions}
                                        placeholder={poke.moves[1].name}
                                        value={poke.moves[1]}
                                        onChange={this.changeMove2}
                                    /> :
                                    <Form.Select
                                        fluid
                                        label='Move 2'
                                        options={moveOptions}
                                        placeholder="Pick a move"
                                        onChange={this.changeMove2}
                                    />
                                }
                            </Grid.Column>
                            <Grid.Column>
                                {poke.moves[1] ?
                                    <p>{poke.moves[1].other_effects}</p>
                                    :
                                    <p></p>}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[1] ?
                                    <List>
                                        <List.Item>{poke.moves[1].type.name}</List.Item>
                                        <List.Item>{poke.moves[1].category}</List.Item>
                                        <List.Item>{poke.moves[1].bp}</List.Item>
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
                                    {poke.moves[1] ?
                                        <>
                                            {poke.moves[1].type.strong_against.map(type =>
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
                                    {poke.moves[1] ?
                                        <>
                                            {poke.moves[1].type.weak_against.map(type =>
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
                                    {poke.moves[1] ?
                                        <>
                                            {poke.moves[1].type.no_effect_against.map(type =>
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

                    {/* move 3 */}
                    <Grid celled columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[2] ?
                                    <Form.Select
                                        fluid
                                        label='Move 3'
                                        options={moveOptions}
                                        placeholder={poke.moves[2].name}
                                        value={poke.moves[2]}
                                        onChange={this.changeMove3}
                                    /> :
                                    <Form.Select
                                        fluid
                                        label='Move 3'
                                        options={moveOptions}
                                        placeholder="Pick a move"
                                        onChange={this.changeMove3}
                                    />
                                }
                            </Grid.Column>
                            <Grid.Column>
                                {poke.moves[2] ?
                                    <p>{poke.moves[2].other_effects}</p>
                                    :
                                    <p></p>}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[2] ?
                                    <List>
                                        <List.Item>{poke.moves[2].type.name}</List.Item>
                                        <List.Item>{poke.moves[2].category}</List.Item>
                                        <List.Item>{poke.moves[2].bp}</List.Item>
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
                                    {poke.moves[2] ?
                                        <>
                                            {poke.moves[2].type.strong_against.map(type =>
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
                                    {poke.moves[2] ?
                                        <>
                                            {poke.moves[2].type.weak_against.map(type =>
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
                                    {poke.moves[2] ?
                                        <>
                                            {poke.moves[2].type.no_effect_against.map(type =>
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

                    {/* move 4 */}
                    <Grid celled columns='equal'>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[3] ?
                                    <Form.Select
                                        fluid
                                        label='Move 4'
                                        options={moveOptions}
                                        placeholder={poke.moves[3].name}
                                        value={poke.moves[3]}
                                        onChange={this.changeMove4}
                                    /> :
                                    <Form.Select
                                        fluid
                                        label='Move 4'
                                        options={moveOptions}
                                        placeholder="Pick a move"
                                        onChange={this.changeMove4}
                                    />
                                }
                            </Grid.Column>
                            <Grid.Column>
                                {poke.moves[3] ?
                                    <p>{poke.moves[3].other_effects}</p>
                                    :
                                    <p></p>}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {poke.moves[3] ?
                                    <List>
                                        <List.Item>{poke.moves[3].type.name}</List.Item>
                                        <List.Item>{poke.moves[3].category}</List.Item>
                                        <List.Item>{poke.moves[3].bp}</List.Item>
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
                                    {poke.moves[3] ?
                                        <>
                                            {poke.moves[3].type.strong_against.map(type =>
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
                                    {poke.moves[3] ?
                                        <>
                                            {poke.moves[3].type.weak_against.map(type =>
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
                                    {poke.moves[3] ?
                                        <>
                                            {poke.moves[3].type.no_effect_against.map(type =>
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
                </Form>
            </>
        )
    }
}