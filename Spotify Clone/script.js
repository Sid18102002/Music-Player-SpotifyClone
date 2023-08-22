console.log("Welcome to Spotify");

//ALL VARIABLES
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let myVolumeLevel = document.getElementById('myVolumeLevel');
let vol = document.getElementById('vol');
const currentTimeLeft = document.getElementById('currentTimeLeft');
const currentTimeRight = document.getElementById('currentTimeRight');

//ALL SONGS ARRAY
let songs = [
    {songName: "Borderline - Tame Imapala", filePath : "songs/1.mp3", coverPath: "covers/1.jpg", duration: "03:57"},
    {songName: "Get Lucky - Daft Punk", filePath : "songs/2.mp3", coverPath: "covers/2.jpg", duration: "04:08"},
    {songName: "Out of Time - The Weeknd", filePath : "songs/3.mp3", coverPath: "covers/3.jpg", duration: "03:34"},
    {songName: "Smokin' out the window - Bruno Mars", filePath : "songs/4.mp3", coverPath: "covers/4.jpg", duration: "03:20"},
    {songName: "Without Me - Eminem", filePath : "songs/5.mp3", coverPath: "covers/5.jpg", duration: "04:57"},
    {songName: "Little Dark Age - MGMT", filePath : "songs/6.mp3", coverPath: "covers/6.jpg", duration: "04:59"},
    {songName: "Homicide - Logic", filePath : "songs/7.mp3", coverPath: "covers/7.jpg", duration: "03:57"},
]

//SETTING UP THE SONGS 
songItems.forEach((element, i)=>
{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


//UPDATING PROGRESSBAR
audioElement.addEventListener('timeupdate', ()=>
{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

//UPDATING TIME AS PER PROGRESSBAR
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//UPDATING VOLUME
myVolumeLevel.addEventListener('change', () => {
    // Convert the volume slider value to a value between 0 and 1
    const volumeValue = myVolumeLevel.value / 100;
    audioElement.volume = volumeValue;
    if(volumeValue==0)
    {
        vol.src = 'mutelogo.jpg';
    }
    else
    {
        vol.src = 'volumelogo.jpg';
    }
});

//MAKING ALL SONGITEMS AS PLAY
const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//CLICKING ON MASTEPLAY
masterPlay.addEventListener('click', ()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)  //IF MASTERPLAY IS PAUSED
    {
        audioElement.play();
        songItemPlay[songIndex].classList.remove('fa-play-circle');
        songItemPlay[songIndex].classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else                                                    //IF MASTERPLAY IS PLAYING
    {
        audioElement.pause();
        songItemPlay[songIndex].classList.remove('fa-pause-circle');
        songItemPlay[songIndex].classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//CLICKING NEXT
next.addEventListener('click', ()=>
{
    makeAllPlays();
    if(songIndex>=6)
    {
        songIndex=0;
    }
    else
    {
        songIndex += 1;
    }
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
   //gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//CLICKING PREVIOUS
previous.addEventListener('click', ()=>
{
    makeAllPlays();
    if(songIndex<=0)
    {
        songIndex=6;
    }
    else
    {
        songIndex -= 1;
    }
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    //gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


//UPATING LEFT AND RIGHT TIMESTAMP AS PER THE CURRENT SONG PLAYING 
audioElement.addEventListener('timeupdate', () => 
{
    // Update current timestamp on the left
    const currentTime = formatTime(audioElement.currentTime);
    currentTimeLeft.textContent = currentTime;
    currentTimeRight.textContent = songs[songIndex].duration;
})

// Helper function to format time in MM:SS format
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

//FOR VOLUME MUTE
let isMuted = false;
vol.addEventListener('click', () => {
    if (isMuted) {
        // Unmute the audio
        audioElement.volume = myVolumeLevel.value / 100;
        isMuted = false;
        vol.src = 'volumelogo.jpg';
    } else {
        // Mute the audio
        audioElement.volume = 0;
        isMuted = true;
        vol.src = 'mutelogo.jpg';
    }
})

//PLAYING A SONG BY CLICKING ON SONGITEM LOGO
let isPlaying = false;
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);

        if (isPlaying && clickedIndex === songIndex) {
            // Clicked on the same song that is currently playing, toggle play/pause
            if (audioElement.paused || audioElement.currentTime <= 0) {
                // Resume playing
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                songItemPlay[songIndex].classList.remove('fa-play-circle');
                songItemPlay[songIndex].classList.add('fa-pause-circle');
            } else {
                // Pause
                audioElement.pause();
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                songItemPlay[songIndex].classList.remove('fa-pause-circle');
                songItemPlay[songIndex].classList.add('fa-play-circle');
            }
        } else {
            // Play a new song
            isPlaying = true;
            songIndex = clickedIndex;
            makeAllPlays();
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            songItemPlay[songIndex].classList.remove('fa-play-circle');
            songItemPlay[songIndex].classList.add('fa-pause-circle');
        }
    });
});

audioElement.addEventListener('ended', () => {
    // Song ended, reset variables
    isPlaying = false;
    makeAllPlays();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
});