import SearchBar from "../Components/SearchBar/SearchBar";

const CLIENT_ID = '165167bfcf5942508af17ba9f47dfbe8';
const REDIRECT_URI = 'http://localhost:3000/';
const accessToken = '';
const expiresIn;

const Spotify = {
    getAccessToken(){
        if(accessToken!=''){
            return accessToken;
        }
        const url = window.location.href;
        accessToken = url.match(/access_token=([^&]*)/);
        expiresIn = url.match(/expires_in=([^&]*)/);
        window.setTimeout(()=> accessToken = '', expiresIn*1000);
        window.history.pushState('Access Token', null, '/');
        if(accessToken == ''){
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },

    Search(term){
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse.tracks){
                return jsonResponse.tracks.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                });
            }
            return [];
        });
    }

}

export default Spotify;