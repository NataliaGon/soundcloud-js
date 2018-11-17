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
  for (songBtn of songsIconBtns) {
    songBtn.addEventListener("click", songOpenDrop);
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
        trek.img +');">\
        </div>\
        <div class="song-title">' +
        trek.title +
        '</div>\
        <span class="icon-clock"></span>\
        <span class="song-time"></span>\
        <span class="icon-heart-song-playlist icon-heart" data-mark="' +
        trek.songIdInPlaylist +
        '"data-id="' +
        trek.id +
        '"></span>\
        <div class="dropdown dropdown-in-playlist" data-mark="' +
        trek.songIdInPlaylist +
        '" data-id="' +
        trek.id +
        '">\
            <h3>Add to playlist</h3>\
            <ul class="container-for-playlists-title" data-mark="' +
        trek.songIdInPlaylist +
        '" data-id="' +
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
  for (each of dropDownSongPlaylist) {
    each.addEventListener("click", function() {
      let idToOpen = event.target.dataset.mark;
      let allDropDown = document.getElementsByClassName("dropdown-in-playlist");
      for (each of allDropDown) {
        if (each.dataset.mark == idToOpen) {
          songOpenDrop(each);
        }
      }
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

function drawPlaylistsInDropDown(songId,dropdownSong) {
  let titlesOfPlaylists = "";
  let ulTitleOfPlaylists = document.querySelector(
    `ul[data-id="${event.target.dataset.id}"]`
  );
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
        '"type="checkbox" data-id="'+event.target.dataset.id+'">' +
        each.title +
        '</li>'
      isSongInPlaylist = false;
    } else {
      titlesOfPlaylists +=
        '<li><input class="input-playlist-title" value="' +
        each.id +
        '"type="checkbox" data-id="'+event.target.dataset.id+'">' +
        each.title +
      '</li>'
    }
    ulTitleOfPlaylists.innerHTML = titlesOfPlaylists;
    dropdownSong.classList.add("display");
  }
}
function findSongToAddInPlaylist(songId,inputsValue){
    let songForPlaylist;
    for (song of songs) {
        if (song.id == songId) {
          songForPlaylist = song;
          break;
        }
      }
      pushSongInPlaylist(songForPlaylist,inputsValue,songId,);
}
function songOpenDrop() {
  const dropdownSong = document.querySelector(
    `div[data-id="${event.target.dataset.id}"]`
  );
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
    //Check if something wasn't pushed back(delete)
    findSongToAddInPlaylist(songId,inputsValue);
    deleteSongFromPlaylist(songId,inputsValue);
    inputsValue.length=0;
  } else {
    event.target.style.color = "#2196F3";
    loadPlaylists();
    drawPlaylistsInDropDown(songId, dropdownSong);   
  }
}

function deleteSongFromPlaylist(songId, playlistsId) {
  console.log(playlistsId[0]);
  let songToDelete={}
  for (i of playlists) {
    for (let j of i.songs){
      if (j.id == songId) {
        if (playlistsId.length > 0) {  
          for (k of playlistsId) {
            if (k == i.id) {
              console.log("I AM");
            } else {
              
               songToDelete = i.songs[j];
               
              i.songs.splice(songToDelete, 1);
            }
          }
        } else {
          console.log(j);
          songToDelete = i.songs.indexOf(j);
          console.log(songToDelete);
          i.songs.splice(songToDelete, 1);
          console.log(i.songs);
        }
      }
    }
  }
  savePlaylists();
}

function pushSongInPlaylist(newSongForPlaylist, playlistsId, songId) {
 var isSong=false;
  for (var i of playlistsId) {
    for (var j of playlists) {
      if (j.id == i) {
        if (j.songs.length > 0) {
          for (var k of j.songs) {
            if (k.id == songId) {
            isSong=true;
            break;
            }
           } 
        } else {
          j.songs.push(newSongForPlaylist);
        } 
        if(!isSong){
          j.songs.push(newSongForPlaylist);  
          isSong=false;
        }   
      } 
      }
    }       
  savePlaylists();
}
//Delete song function
// function songOpenDropInPlaylist(dropdownSong) {
//   var inputsValue = [];
//   if (dropdownSong.classList.contains("display")) {
//     event.target.style.color = "#D8D8D8";
//     dropdownSong.classList.remove("display");
//     var allInputs = document.getElementsByClassName("input-playlist-title");
//     let songForPlaylist;
//     for (i of allInputs) {
//       if (i.checked) {
//         inputsValue.push(i.value);
//       }
//     }
//     let songId = event.target.dataset.id;

//     for (song of songs) {
//       if (song.id == songId) {
//         songForPlaylist = song;
//         const idSongPlaylist = makeid();
//         songForPlaylist.songIdInPlaylist = idSongPlaylist;
//         break;
//       }
//     }
//     pushSongInPlaylist(songForPlaylist, inputsValue);
//   } else {
//     event.target.style.color = "#2196F3";
//     loadPlaylists();
//     const titlesOfPlaylists = playlists.map(playlist => {
//       return (
//         '<li><input class="input-playlist-title" value="' +
//         playlist.id +
//         '" type="checkbox">' +
//         playlist.title +
//         "</input></li>"
//       );
//     });
//     const titleString = titlesOfPlaylists.join("");

//     const ulTitleOfPlaylists = document.querySelector(
//       `ul[data-mark="${event.target.dataset.mark}"]`
//     );

//     ulTitleOfPlaylists.innerHTML = titleString;
//     dropdownSong.classList.add("display");
//   }
// }

