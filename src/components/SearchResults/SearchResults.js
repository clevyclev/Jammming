import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component{

// Rendering the TrackList component within the SearchResults pane
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
      </div>
    );
  }
}

export default SearchResults;
