
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
const songsIconBtns = document.getElementsByClassName('icon-heart');


function createSongsList(songs) {
    let songsHTML = '';
    for (song of songs) {
        songsHTML += '<div class="song-container" >\
        <div class="song-clip" style="background-image:url('+ song.img + ');">\
        </div>\
        <div class="song-title">'+ song.title + '</div>\
        <span class="icon-clock"></span>\
        <span class="song-time"></span>\
        <span class="icon-heart" data-id="' + song.id + '"></span>\
        <div class="dropdown" data-id="' + song.id + '">\
            <h3>Add to playlist</h3>\
            <ul class="container-for-playlists-title" data-id="' + song.id + '" ></ul>\
            <a href="#">Create playlist</a>\
            <hr/>\
        </div>\
    </div>';
    }
    songsContainer.innerHTML = songsHTML;
    for (songBtn of songsIconBtns) {
        songBtn.addEventListener('click',() => {

            const dropdownSong = document.querySelector(`div[data-id="${event.target.dataset.id}"]`);
            var inputsValue = [];
            if (dropdownSong.classList.contains('display')) {
                event.target.style.color = '#D8D8D8';
                dropdownSong.classList.remove('display');
                var allInputs = document.getElementsByClassName('input-playlist-title');
                let songsForPlaylist;
                for (i of allInputs) {
                    if (i.checked) {
                        inputsValue.push(i.value);
                    }
                }
                
                let songId = event.target.dataset.id;
                
                for (song of songs) {
                    if (song.id == songId) {
                        songsForPlaylist=song;
                        break;
                    }
                    
                }
                pushSongInPlaylist(songsForPlaylist, inputsValue);
                

            } else {
                event.target.style.color = '#2196F3';
                loadPlaylists();
                const titlesOfPlaylists = playlists.map((playlist) => {
                    return ('<li><input class="input-playlist-title" value="' + playlist.id + '" type="checkbox">' + playlist.title + '</input></li>');

                });
                var titleString = titlesOfPlaylists.join('');
                const ulTitleOfPlaylists = document.querySelector(`ul[data-id="${event.target.dataset.id}"]`);
                ulTitleOfPlaylists.innerHTML = titleString;
                dropdownSong.classList.add('display');
            }
          
        })
    }


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
    const newPlaylist = new Playlist(id, 'Untitled', 'block', 'none', []);
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
        <span class ="delete-playlist-btn" data-id="'+ each.id +'">Delete</span>\
        </span>\
       <div class="container-for-songs-in-playlist">';

    for (trek of each.songs) {
        
        playlistsHTML += '<div class="song-container" >\
        <div class="song-clip" style="background-image:url('+ trek.img + ');">\
        </div>\
        <div class="song-title">'+ trek.title + '</div>\
        <span class="icon-clock"></span>\
        <span class="song-time"></span>\
        <span class="icon-heart" data-id="' + trek.id + '"></span>\
        <div class="dropdown" data-id="' + trek.id + '">\
            <h3>Add to playlist</h3>\
            <ul class="container-for-playlists-title" data-id="' + trek.id + '" ></ul>\
            <a href="#">Create playlist</a>\
            <hr/>\
        </div>\
    </div>';
    }
    playlistsHTML += '</div></div>';

}


allPlaylistHolder.innerHTML = playlistsHTML;
savePlaylists();
titleForNav();

var a = document.getElementsByClassName('delete-playlist-btn');
    for(var i = 0; i < a.length; i++){
        var b = a[i]; 
        b.addEventListener('click', deletePlaylist) 
}
for (songBtn of songsIconBtns) {
    songBtn.addEventListener('click', songOpenDrop)
}
}
function deletePlaylist(){

    for(list of playlists){
        if (list.id == this.dataset.id){
           if (confirm("Do you really want to delete this playlist?")===true){
            const indListToDlt = playlists.indexOf(list);
            playlists.splice(indListToDlt, 1);
            savePlaylists();
            createPlaylistsList(playlists);
           }
        };
    }
}


function titleForNav() {
    const playlistsTitle = playlists.map((playlist) => {
        return ('<li class="list-title-playlist-nav">\
    <span onclick="showInput()" style="display:block"; class ="playlist-nav-span" data-id="' + playlist.id + '" >' + playlist.title + '</span>\
  </li>')
    });
    const string = playlistsTitle.join([]);
    containerPlaylistsTitle.innerHTML = string;
}

function inputLostFocus() {
    if (event.target.value.length > 0) {
        for (each of playlists) {
            if (each.id == event.target.dataset.id) {
                console.log(event.target.dataset.id);
                each.title = event.target.value;
                event.target.style.display="none";
                event.target.nextElementSibling.style.display = "block";
                each.displayInput = 'none';
                each.displaySpan = 'block';
          
                titleForNav();
                savePlaylists();
                createPlaylistsList(playlists);
            }
        }
    }
}

function showInput() {
    event.target.style.display = "none";
    event.target.previousElementSibling.style.display = "block";
    event.target.previousElementSibling.value = event.target.innerHTML;
}

function songOpenDrop(){
    const dropdownSong = document.querySelector(`div[data-id="${event.target.dataset.id}"]`);
    console.log(dropdownSong);
            var inputsValue = [];
            if (dropdownSong.classList.contains('display')) {
                event.target.style.color = '#D8D8D8';
                dropdownSong.classList.remove('display');
                var allInputs = document.getElementsByClassName('input-playlist-title');
                let songsForPlaylist;
                for (i of allInputs) {
                    if (i.checked) {
                        inputsValue.push(i.value);
                    }
                }
                
                let songId = event.target.dataset.id;
                
                for (song of songs) {
                    if (song.id == songId) {
                        songsForPlaylist=song;
                        break;
                    }
                    
                }
                pushSongInPlaylist(songsForPlaylist, inputsValue);
                

            } else {
                event.target.style.color = '#2196F3';
                loadPlaylists();
                const titlesOfPlaylists = playlists.map((playlist) => {
                    return ('<li><input class="input-playlist-title" value="' + playlist.id + '" type="checkbox">' + playlist.title + '</input></li>');

                });
                var titleString = titlesOfPlaylists.join('');
                const ulTitleOfPlaylists = document.querySelector(`ul[data-id="${event.target.dataset.id}"]`);
                ulTitleOfPlaylists.innerHTML = titleString;
                dropdownSong.classList.add('display');
            }
          

}

function pushSongInPlaylist(newSongForPlaylist, playlistsId) {
    for (i of playlistsId) {
        for (j of playlists) {
            if (j.id == i) {
                j.songs.push(song);
            }
        }
    }
    var inputsValue = [];
    console.log(playlists);
    savePlaylists();
}