const CLIENT_ID = '165167bfcf5942508af17ba9f47dfbe8';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken = '';
let expiresIn;

const Spotify = {
    getAccessToken() {
        if (accessToken !== '') {
            return accessToken;
        }
        const url = window.location.href;
        accessToken = url.match(/access_token=([^&]*)/);
        expiresIn = url.match(/expires_in=([^&]*)/);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        if (accessToken === '') {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
        return accessToken;
    },

    Search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
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
    },

    savePlaylist(playlistName,trackURIs) {
        if (playlistName === '' || trackURIs === '') {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID = '';
        fetch('https://api.spotify.com/v1/me', {
            'headers': headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id;
        })

        let playlist_id;
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            'headers': headers,
            'method': 'POST',
            'body': 'application/json'
        }).then(response => {
            response.name = playlistName;
            return response.json();
        }).then(jsonResponse => {
            playlist_id = jsonResponse.id;
        })

        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}/tracks`, {
            'headers': headers,
            'method': 'POST',
            'body': 'application/json'
        }).then(response => {
            response.URIs = trackURIs;
            return response.json();
        }).then(jsonResponse => {
            playlist_id = jsonResponse.id;
        })
    }
}

export default Spotify;