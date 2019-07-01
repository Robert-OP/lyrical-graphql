import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: {
          id
        }
      })
      .then(() => this.props.data.refetch());
  }

  render() {
    return (
      <div>
        {this.props.data.loading ? (
          <h1>Loading...</h1>
        ) : (
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>Lyrical App</h4>
            </li>
            {this.props.data.songs.map(({ id, title }) => (
              <li key={id} className="collection-item">
                <Link to={`/songs/${id}`}>{title}</Link>
                <i
                  className="material-icons"
                  onClick={() => this.onSongDelete(id)}
                >
                  delete
                </i>
              </li>
            ))}
          </ul>
        )}
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));
