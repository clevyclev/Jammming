const redirectUri = 'https://clevistation-jammming.surge.sh';
const clientId = '90aa666284304f24a61fec4c17ca2cc6';
let token = '';

//Implementing the Spotify API
const Spotify = {
  //Getting the user's token from Spotify
  getToken(){
      if(token) return token;
      const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if(tokenMatch && expiresInMatch){
        token = tokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => token = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return token;
      }else{
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    },

//Sending a search for a song to the API
  async search(term){
    const accessToken = Spotify.getToken();
    let fetchURL = 'https://api.spotify.com/v1/search';
    fetchURL += '?q=' + term;
    fetchURL += '&type=track';
    return fetch(fetchURL, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(
      response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    )
    .then(
      jsonResponse => {
        if(jsonResponse.tracks.items) {
          console.log(jsonResponse.tracks);
          console.log(jsonResponse.tracks.items);
          let returnedTracks = jsonResponse.tracks.items.map( track => ({
            id: track.id,
            trackName: track.name,
            artistName: track.artists[0].name,
            albumName: track.album.name,
            uri: track.uri,
            previewURL: track.preview_url
          }));
          if (typeof returnedTracks !== "undefined" && returnedTracks !== null) {
            return returnedTracks;
          }
        }
      }
    );
  },

//Saving the new playlist to the user's Spotify
    async savePlaylist(playlistName, trackURIs){
      if(!playlistName || !trackURIs.length){
        return;
      }
      const accessToken = Spotify.getToken();
      let response = await fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': `Bearer ${accessToken}`}
      });
      let jsonResponse = await response.json();
      let user_ID = jsonResponse.id;
      response = await fetch(`https://api.spotify.com/v1/users/${user_ID}/playlists`, {
        headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      });
      jsonResponse = await response.json();
      let playlist_ID = jsonResponse.id;
      return await fetch(`https://api.spotify.com/v1/users/${user_ID}/playlists/${playlist_ID}/tracks`, {
        headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      });
    }
};

export default Spotify;
