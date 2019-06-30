import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
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
            {this.props.data.songs.map(song => (
              <li key={song.id} className="collection-item">
                {song.title}
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

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
