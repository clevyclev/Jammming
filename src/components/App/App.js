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
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this)
  }

  addTrack(track){
    if(!this.state.playlistTracks.includes(track.id)){
      this.state.playlistTracks.push(track);
    }
  }

  removeTrack(track){
    let tracks = this.state.playlist;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlist: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}  onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
