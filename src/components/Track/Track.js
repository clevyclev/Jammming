import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

//Each track should have the ability to be added to the new playlist
  addTrack(){
    this.props.onAdd(this.props.track);
  }

//Likewise, each track should have functionality to be removed from the playlist
  removeTrack(){
    this.props.onRemove(this.props.track);
  }

//Toggling between adding if not yet in the new playlist and removing if already in the playlist
  renderAction(){
    if(this.props.onRemove){
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }
    else{
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.trackName}</h3>
          <p>{this.props.track.artistName} | {this.props.track.albumName}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
