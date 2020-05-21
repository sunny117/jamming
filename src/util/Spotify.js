const CLIENT_ID = '165167bfcf5942508af17ba9f47dfbe8';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;
let expiresIn;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const url = window.location.href;
        accessToken = url.match(/access_token=([^&]*)/);
        expiresIn = url.match(/expires_in=([^&]*)/);
        if (accessToken && expiresIn) {
            accessToken = accessToken[1];
            expiresIn = Number(expiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },

    Search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        id: track.id,
                        uri: track.uri
                    }
                });
            }
            return [];
        });
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                });
            });
        });
    }
}

export default Spotify;