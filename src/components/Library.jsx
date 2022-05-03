import React from 'react'
import LibrarySong from './LibrarySong'

function Library({
  currentSong,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map(song => (
          <LibrarySong
            currentSong={song}
            key={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
