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
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.push(track)
    });
  }
  removeTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(item => item!=track)
      })
    }
  }
  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }
  savePlaylist(){
    const trackURIs;
    //tO be done
  }
  search(term){
    console.log(term);
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
