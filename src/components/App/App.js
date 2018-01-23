import React from 'react';
import './App.css';

import SearchResults from '../src/components/SearchResults/SearchResults';
import Playlist from '../src/components/Playlist/Playlist';
import SearchBar from '../src/components/SearchBar/SearchBar';
import Spotify from '../src/util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <!-- Add a SearchResults component -->
            <!-- Add a Playlist component -->
          </div>
        </div>
      </div>
    );
  }
}
