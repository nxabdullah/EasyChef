import React from 'react'
import Search from '../components/landing/Search.jsx'

/*
  Plan:
    The search query and filters are going to be stored as state
    Everytime the user change them, the recipe cards should update accordingly

    Initially, there will be no query (that's okay, because empty query results in
    all recipes sorted by popularity).
*/

function Landing() {
  return (
    <div>
        <Search />

        {/* List of Recipe cards being displayed here*/}
    </div>
  )
}

export default Landing
