//Menu
const explore = document.getElementById("explore");
const playlist = document.getElementById("playlist");

explore.addEventListener("click", function() {
  window.location.hash = "#explore";
  playlistContainer.style.display = "none";
  main.style.display = "block";
  getSongsAPI("hip-hop");
});

playlist.addEventListener("click", function() {
  window.location.hash = "#playlist";
  main.style.display = "none";
  playlistContainer.style.display = "flex";
  loadPlaylists();
  createPlaylistsList(playlists);
});

//Main
const songsContainer = document.getElementById("songs-container");
const main = document.getElementById("main");
const playlistContainer = document.getElementById("playlists-page");
const songsIconBtns = document.getElementsByClassName(
  "icon-heart-song-explore"
);

function createSongsList(songs) {
  let songsHTML = "";
  for (song of songs) {
    songsHTML +=
      '<div class="song-container" >\
        <div class="song-clip" style="background-image:url(' +
      song.img +
      ');">\
        </div>\
        <div class="song-title">' +
      song.title +
      '</div>\
        <span class="icon-clock"></span>\
        <span class="song-time"></span>\
        <span class="icon-heart-song-explore icon-heart" data-id="' +
      song.id +
      '"></span>\
        <div class="dropdown" data-id="' +
      song.id +
      '">\
            <h3>Add to playlist</h3>\
            <ul class="container-for-playlists-title" data-id="' +
      song.id +
      '" ></ul>\
            <a href="#">Create playlist</a>\
            <hr/>\
        </div>\
    </div>';
  }
  songsContainer.innerHTML = songsHTML;
  let comeFromPlayList = false;
  for (songBtn of songsIconBtns) {
    songBtn.addEventListener("click", function() {
        console.log(songBtn);
      songOpenDrop(comeFromPlayList);
    });
  }
}
getSongsAPI("hip-hop");

//Playlist

const addPlaylistBtn = document.getElementById("add-playlist-btn");
const containerPlaylistsTitle = document.getElementById(
  "conteiner-for-playlists-title"
);
const playlistInputs = document.getElementsByClassName("playlist-input");
const playlistNavSpans = document.getElementsByClassName("playlist-nav-span");
const allPlaylistHolder = document.getElementById("all-playlists-holder");

addPlaylistBtn.addEventListener("click", () => {
  const id = makeid();
  const newPlaylist = new Playlist(id, "Untitled", "block", "none", []);
  playlists.push(newPlaylist);
  createPlaylistsList(playlists);
});

function createPlaylistsList(playlists) {
  let playlistsHTML = "";
  for (each of playlists) {
    playlistsHTML +=
      '<div class="one-playlist-object">\
        <span class="playlist-title">\
        <input autofocus="true" style="display:' +
      each.displayInput +
      '";  onfocusout="inputLostFocus()" type="text" data-id="' +
      each.id +
      '"  class="playlist-input" placeholder="Untitled">\
        <span onclick="showInput()" style="display:' +
      each.displaySpan +
      '"; class ="playlist-nav-span" data-id="' +
      each.id +
      '" >' +
      each.title +
      '</span>\
        <span class ="delete-playlist-btn" data-id="' +
      each.id +
      '">Delete</span>\
        </span>\
       <div class="container-for-songs-in-playlist">';

    for (trek of each.songs) {
      playlistsHTML +=
        '<div class="song-container" >\
        <div class="song-clip" style="background-image:url(' +
        trek.img +
        ');">\
        </div>\
        <div class="song-title">' +
        trek.title +
        '</div>\
        <span class="icon-clock"></span>\
        <span class="song-time"></span>\
        <span class="icon-heart-song-playlist icon-heart"\
       data-id="' +
        trek.id +
        '"></span>\
        <div class="dropdown dropdown-in-playlist" \
        data-id="' +
        trek.id +
        '">\
            <h3>Add to playlist</h3>\
            <ul class="container-for-playlists-title ul-in-playlist" data-id="' +
            trek.id +
            '" ></ul>\
            <a href="#">Create playlist</a>\
            <hr/>\
        </div>\
    </div>';
    }
    playlistsHTML += "</div></div>";
  }

  allPlaylistHolder.innerHTML = playlistsHTML;
  savePlaylists();
  titleForNav();
  const dropDownSongPlaylist = document.getElementsByClassName(
    "icon-heart-song-playlist"
  );
  
  let comeFromPlayList = true;
  for (songBtn of dropDownSongPlaylist) {
    songBtn.addEventListener("click", function(){
      songOpenDrop(comeFromPlayList);
    });
  }

  var a = document.getElementsByClassName("delete-playlist-btn");
  for (var i = 0; i < a.length; i++) {
    var b = a[i];
    b.addEventListener("click", deletePlaylist);
  }
}

function deletePlaylist() {
  for (list of playlists) {
    if (list.id == this.dataset.id) {
      if (confirm("Do you really want to delete this playlist?") === true) {
        const indListToDlt = playlists.indexOf(list);
        playlists.splice(indListToDlt, 1);
        savePlaylists();
        createPlaylistsList(playlists);
      }
    }
  }
}

function titleForNav() {
  const playlistsTitle = playlists.map(playlist => {
    return (
      '<li class="list-title-playlist-nav">\
    <span onclick="showInput()" style="display:block"; class ="playlist-nav-span" data-id="' +
      playlist.id +
      '" >' +
      playlist.title +
      "</span>\
  </li>"
    );
  });
  const string = playlistsTitle.join([]);
  containerPlaylistsTitle.innerHTML = string;
}

function inputLostFocus() {
  if (event.target.value.length > 0) {
    for (each of playlists) {
      if (each.id == event.target.dataset.id) {
        each.title = event.target.value;
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "block";
        each.displayInput = "none";
        each.displaySpan = "block";

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

function drawPlaylistsInDropDown(songId, dropdownSong, comeFromPlayList) {
 
  let titlesOfPlaylists = "";
  let ulTitleOfPlaylists;
  if (comeFromPlayList) {
    ulTitleOfPlaylists='';
    console.log(ulTitleOfPlaylists);
    ulTitleOfPlaylists = document.querySelector(
      `ul.ul-in-playlist[data-id="${event.target.dataset.id}"]`
    );
  
  } else {
    ulTitleOfPlaylists='';
    ulTitleOfPlaylists = document.querySelector(
      `ul[data-id="${event.target.dataset.id}"]`
    );
  }
  let isSongInPlaylist = false;
  for (each of playlists) {
    for (item of each.songs) {
      if (songId == item.id) {
        isSongInPlaylist = true;
        break;
      }
    }
    //check is song is in playlist and we have to make checked
    if (isSongInPlaylist == true) {
      titlesOfPlaylists +=
        '<li><input checked="checked" class="input-playlist-title"  value="' +
        each.id +
        '"type="checkbox" data-id="' +
        event.target.dataset.id +
        '">' +
        each.title +
        "</li>";
      isSongInPlaylist = false;
    } else {
      titlesOfPlaylists +=
        '<li><input class="input-playlist-title" value="' +
        each.id +
        '"type="checkbox" data-id="' +
        event.target.dataset.id +
        '">' +
        each.title +
        "</li>";
    }
  }
  ulTitleOfPlaylists.innerHTML = titlesOfPlaylists;
  console.log(ulTitleOfPlaylists);
  dropdownSong.classList.add("display");
}
function findSongToAddInPlaylist(songId, inputsValue) {
  let songForPlaylist;
  for (song of songs) {
    if (song.id == songId) {
      songForPlaylist = song;
      break;
    }
  }
  handleNewSong(songForPlaylist, inputsValue, songId);
}
function songOpenDrop(comeFromPlayList) {
  let dropdownSong;
  if (comeFromPlayList) {
    dropdownSong = document.querySelector(
      `.dropdown-in-playlist[data-id="${event.target.dataset.id}"]`
    );
  } else {
    dropdownSong = document.querySelector(
      `div[data-id="${event.target.dataset.id}"]`
    );
  }
  const allInputs = document.querySelectorAll(
    `input[data-id="${event.target.dataset.id}"]`
  );
  let songId = event.target.dataset.id;
  let inputsValue = [];

  if (dropdownSong.classList.contains("display")) {
    event.target.style.color = "#D8D8D8";
    dropdownSong.classList.remove("display");
    for (i of allInputs) {
      if (i.checked) {
        inputsValue.push(i.value);
      }
    }
    findSongToAddInPlaylist(songId, inputsValue);
    inputsValue.length = 0;
  } else {
    event.target.style.color = "#2196F3";
    loadPlaylists();
    drawPlaylistsInDropDown(songId, dropdownSong, comeFromPlayList);
  }
}

function deleteSongFromPlaylist(song, songsArray) {
  const songIndex = songsArray.indexOf(song);
  songsArray.splice(songIndex, 1);
  savePlaylists();
}

function pushSongInPlaylist(song, songsArray) {
  songsArray.push(song);
  savePlaylists();
}
function handleNewSong(songForPlaylist, inputsValue, songId) {
  if (inputsValue.length == 0) {
    for (let playlist of playlists) {
      let isSong = isSongInPlaylist(songId, playlist);
      if (isSong) {
        deleteSongFromPlaylist(songForPlaylist, playlist.songs);
      }
    }
  } else {
    for (let playlist of playlists) {
      let isSong = isSongInPlaylist(songId, playlist);
      let isPlaylistInInputs = false;

      for (let inputId of inputsValue) {
        if (playlist.id == inputId) {
          isPlaylistInInputs = true;
        }
        if (playlist.id == inputId && !isSong) {
          pushSongInPlaylist(songForPlaylist, playlist.songs);
        }
      }
      if (!isPlaylistInInputs && isSong) {
        deleteSongFromPlaylist(songForPlaylist, playlist.songs);
      }
    }
  }
}
function isSongInPlaylist(songId, playlist) {
  let isSong = false;
  for (let song of playlist.songs) {
    if (song.id == songId) {
      isSong = true;
    }
  }
  return isSong;
}

