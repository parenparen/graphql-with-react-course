import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  async onSubmit(event) {
    event.preventDefault();

    const song = await this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query }]
    });

    hashHistory.push('/');
  }

  render() {
    return (
      <div>
        <Link to='/'>back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Title:</label>
          <input 
            onChange={
              event => this.setState({title: event.target.value})}
            value={this.state.title} />
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);
