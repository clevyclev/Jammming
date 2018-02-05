import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }

//Implementing the search funtionality in the search button
  search(){
    this.props.onSearch(this.state.term);
  }

//Handling the search value input
  handleTermChange(event){
    this.setState({term: event.target.value});
  }

//Adding functionality for pressing the return key
  handleOnKeyUp(event){
  if(event.keyCode === 13){
    this.props.onSearch(this.state.term);
    }
  }

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleOnKeyUp}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
