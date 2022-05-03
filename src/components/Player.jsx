import React from 'react'
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from 'react-icons/fa'

function Player({
  currentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  setCurrentSong,
  songs,
  setSongs,
}) {
  const activeLibraryHandler = skipSong => {
    const newSongs = songs.map(song => {
      if (song.id === skipSong.id) {
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

    setSongs(newSongs)
  }

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const getTime = time => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const dragControl = e => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  const skipTrackHandler = async direction => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)
    if (direction === 'skipForward') {
      if (currentIndex === songs.length - 1) {
        await setCurrentSong(songs[0])
        activeLibraryHandler(songs[0])
      } else {
        await setCurrentSong(songs[currentIndex + 1])
        activeLibraryHandler(songs[currentIndex + 1])
      }
    } else {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
      } else {
        await setCurrentSong(songs[currentIndex - 1])
        activeLibraryHandler(songs[currentIndex - 1])
      }
    }
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragControl}
          type='range'
        />
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className='play-control'>
        <FaAngleLeft
          onClick={() => skipTrackHandler('skipBack')}
          size='2em'
          className='skip-back'
        />
        {isPlaying ? (
          <FaPause onClick={playSongHandler} size='1.8em' className='play' />
        ) : (
          <FaPlay onClick={playSongHandler} size='1.8em' className='play' />
        )}

        <FaAngleRight
          onClick={() => skipTrackHandler('skipForward')}
          size='2em'
          className='skip-forward'
        />
      </div>
    </div>
  )
}

export default Player
