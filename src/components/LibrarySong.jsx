import React from 'react'

function LibrarySong({
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
}) {
  const songSelectHandler = async () => {
    await setCurrentSong(currentSong)
    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play()
        })
      }
    }
    audioRef.current.play()
    const newSongs = songs.map(song => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })

    await setSongs(newSongs)
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${currentSong.active && 'selected'}`}
    >
      <img src={currentSong.cover} alt={currentSong.name} />
      <div className='song-description'>
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
