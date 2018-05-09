//Menu
const explore = document.getElementById('explore');
const playlist = document.getElementById('playlist');

explore.addEventListener('click', function () {
    window.location.hash = '#explore';
    playlistContainer.style.display = "none";
    main.style.display = "block";
    getSongsAPI('hip-hop');
});

playlist.addEventListener('click', function () {
    window.location.hash = '#playlist';
    main.style.display = "none";
    playlistContainer.style.display = "flex";
    loadPlaylists();
    createPlaylistsList(playlists);
});

//Main
const songsContainer = document.getElementById('songs-container');
const main = document.getElementById('main');
const playlistContainer = document.getElementById('playlists-page');

function createSongsList(songs) {
    let songsHTML = '';
    for (song of songs) {
        songsHTML += '<div class="song-container" >\
        <div class="song-clip" style="background-image:url('+ song.img + ');">\
        </div>\
        <div class="song-title">'+ song.title + '</div>\
        <span class="icon-clock"></span>\
        <span class="song-time"></span>\
        <span class="icon-heart"></span>\
    </div>';
    }
    songsContainer.innerHTML = songsHTML;
}
getSongsAPI('hip-hop');

//Playlist

const addPlaylistBtn = document.getElementById('add-playlist-btn');
const containerPlaylistsTitle = document.getElementById('conteiner-for-playlists-title');
const playlistInputs = document.getElementsByClassName('playlist-input');
const playlistNavSpans = document.getElementsByClassName('playlist-nav-span');
const allPlaylistHolder = document.getElementById('all-playlists-holder');

addPlaylistBtn.addEventListener('click', () => {
    const id = makeid();
    const newPlaylist = new Playlist(id, 'Untitled', 'block', 'none');
    playlists.push(newPlaylist);
    createPlaylistsList(playlists);
  
})

 

function createPlaylistsList(playlists) {
    let playlistsHTML = '';
    for (each of playlists) {
        playlistsHTML += '<div class="one-playlist-object">\
        <span class="playlist-title">\
        <input autofocus="true" style="display:'+ each.displayInput + '";  onfocusout="inputLostFocus()" type="text" data-id="' + each.id + '"  class="playlist-input" placeholder="Untitled">\
        <span onclick="showInput()" style="display:'+ each.displaySpan + '"; class ="playlist-nav-span" data-id="' + each.id + '" >' + each.title + '</span>\
        </span>\
       <div class="container-for-songs-in-playlist"></div>\
    </div>';
    }
    allPlaylistHolder.innerHTML = playlistsHTML;
    savePlaylists();
    titleForNav();
    
}

function titleForNav(){
    const playlistsTitle=playlists.map((playlist)=>{return ('<li class="list-title-playlist-nav">\
    <span onclick="showInput()" style="display:block"; class ="playlist-nav-span" data-id="' + playlist.id + '" >' + playlist.title + '</span>\
  </li>')}); 
   const string= playlistsTitle.join([ ]);
   containerPlaylistsTitle.innerHTML=string;
}

function inputLostFocus() {
    if (event.target.value.length > 0) {
        for (each of playlists) {
            if (each.id == event.target.dataset.id) {
                each.title = event.target.value;
                each.displayInput = 'none';
                each.displaySpan = 'block';
                titleForNav();
            }
        }
    }
}

function showInput() {
    event.target.style.display = "none";
    event.target.previousElementSibling.style.display = "block";
    event.target.previousElementSibling.value = event.target.innerHTML;
}

