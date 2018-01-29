import React from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlist;
    if(!tracks.find(obj => obj.id === track.id)){
      tracks.push(track);
      this.setState({playlist: tracks});
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

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlist: []
      });
    });
  }

  search(term){
    Spotify.search(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}  onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
