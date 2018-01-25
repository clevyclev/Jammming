import React from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../src/util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
      {
        name:
        artist:
        album:
      },
      {
        name:
        artist:
        album:
      },
      {
        name:
        artist:
        album:
      }
    ],
    playlistName: 'My Playlist',
    playlistTracks: [
      {
        name:
        artist:
        album:
      },
      {
        name:
        artist:
        album:
      },
      {
        name:
        artist:
        album:
      }
    ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
