  
let songs=[];
let playlists=[];
let songsForPlaylist=[];


function Song(title, img, time, id ,music){
    this.title = title,
    this.img = img,
    this.time = time,
    this.id = id,
    this.music = music
};
class Playlist {
    constructor(id,title,displayInput,displaySpan,songs) {
        this.id = id,
        this.title = title,
        this.displayInput=displayInput,
        this.displaySpan=displaySpan,
        this.songs = songs
    }
};

// Functions for local storage
function savePlaylists() {
    localStorage.setItem('playlist', JSON.stringify(playlists));
}
  
function loadPlaylists() {
    if (localStorage.getItem('playlist')) {
      playlists = JSON.parse(localStorage.getItem('playlist'));
    }
  } 


function saveSongs() {
    localStorage.setItem('songs', JSON.stringify(songsForPlaylist));
}
  
function loadSongs() {
    if (localStorage.getItem('songs')) {
        songsForPlaylist = JSON.parse(localStorage.getItem('songs'));
    }
  } 
//////API 
var menuGenres=document.getElementsByClassName('menu-genre');
for (menuGenre of menuGenres){
    menuGenre.addEventListener('click', function(){getSongsAPI(this.innerText)});
}
function dataHandler(event){
    const data = JSON.parse(event.target.responseText);//response - объект DOM содержащий получ. инфо
   
    songs.length=0;
    for (each of data){
        var newSong= new Song(each.title, each.artwork_url, each.original_content_size, each.id ,'u');
        songs.push(newSong);
        createSongsList(songs);
    }
    
}
function getSongsAPI(genre){
    const url = `https://api.soundcloud.com/tracks?client_id=jHIO7kur07kyRKwzce6Ol52j1My6zV0L&limit=15&offset=0&tags=${genre}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', dataHandler);
    xhr.send();
}
