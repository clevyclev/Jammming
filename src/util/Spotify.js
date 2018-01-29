const redirectUri = 'https://clevistation-jammming.surge.sh';
const clientId = '90aa666284304f24a61fec4c17ca2cc6';
let token = '';

const Spotify = {
  async getAccessToken(){
    if (token){
      return token;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(tokenMatch && expiresInMatch){
      token = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => token = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
      }
    else{
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    },

  async search(term){
      const token = Spotify.getAccessToken();
      let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {Authorization: `Bearer ${token}`}}
      );
      let jsonResponse = await response.json();
      if (!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    },

    async savePlaylist(playlistName, trackURIs){
      if(!playlistName || !trackURIs){
        return;
      }
      let token = Spotify.getAccessToken();
      let response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {Authorization: `Bearer ${token}`}
      });
      let jsonResponse = await response.json();
      let user_ID = jsonResponse.id;
      response = await fetch(`https://api.spotify.com/v1/users/${user_ID}/playlists`, {
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      });
      jsonResponse = await response.json();
      let playlist_ID = jsonResponse.id;
      return await fetch(`https://api.spotify.com/v1/users/${user_ID}/playlists/${playlist_ID}/tracks`, {
        headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      });
    }
};
export default Spotify;
