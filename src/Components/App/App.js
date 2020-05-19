import React from 'react';
import './App.css';
import SearchBar from ',,/SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state.searchResults = [{
      name: '',
      artist: '',
      album: '',
      id: ''
    }]
    this.state.playlistName = 'Test';
    this.state.playlistTracks = [{
      name: 'pt1',
      artist: 'pt2',
      album: 'pt3',
      id: 'pt4'
    }];
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.push(track)
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
