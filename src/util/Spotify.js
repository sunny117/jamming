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
    }

}

export default Spotify;