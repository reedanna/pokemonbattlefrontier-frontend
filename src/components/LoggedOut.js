import React, { Component } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

export default class LoggedOut extends Component {

    render() {
        return (
            <>
            <h1>Welcome!</h1>
            <Segment placeholder textAlign='center'>
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <h2>Login</h2>
                <Form onSubmit={(e) => this.props.login(e)}>
                  <Form.Input
                    icon='user'
                    name='username'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                  />
                  <Form.Input
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    label='Password'
                    type='password'
                  />
        
                  <Button type='submit' content='Login' primary />
                </Form>
              </Grid.Column>
        
              <Grid.Column>
                  <h2>Sign Up</h2>
              <Form onSubmit={(e) => this.props.signup(e)}>
                  <Form.Input
                    icon='user'
                    name='username'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                  />
                  <Form.Input
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    label='Password'
                    type='password'
                  />
                  <Form.Input
                    icon='lock'
                    name='passwordConfirm'
                    iconPosition='left'
                    label='Confirm Password'
                    type='password'
                  />
        
                  <Button type='submit' content='Sign Up' primary />
                </Form>
              </Grid.Column>
            </Grid>
        
            <Divider vertical>Or</Divider>
          </Segment>
          </>
        )
    }
}