import React, { useState, useRef } from 'react'
import Library from './components/Library'
import Nav from './components/Nav'
import Player from './components/Player'
import Song from './components/Song'
import data from './data'
import './styles/app.scss'

function App() {
  const audioRef = useRef(null)

  const [libraryStatus, setLibraryStatus] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })

  const [songs, setSongs] = useState(data)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)

  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime, duration })
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)
    if (currentIndex === songs.length - 1) {
      await setCurrentSong(songs[0])
    } else {
      await setCurrentSong(songs[currentIndex + 1])
    }
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div className={`App ${libraryStatus && 'libary-active '}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default App
