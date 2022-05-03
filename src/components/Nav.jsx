import React from 'react'
import { FaMusic } from 'react-icons/fa'

function Nav({ libraryStatus, setLibraryStatus }) {
  return (
    <nav>
      <h1>Muzic</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <FaMusic />
      </button>
    </nav>
  )
}

export default Nav
