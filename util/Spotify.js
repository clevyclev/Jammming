import React from 'react';

const redirectUri = 'http://localhost:3000/';
const clientId = '90aa666284304f24a61fec4c17ca2cc6';

let token = '';

const Spotify = {
  getAccessToken(){
    if (token){
      return token;
    }
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiryMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(tokenMatch && expiryMatch){
      token = tokenMatch;
      const expiresIn = Number(expiryMatch[1]);
      window.setTimeout(() => token = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
      }
    else{
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    }
  };

export default Spotify;
