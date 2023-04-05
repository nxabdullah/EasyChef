import { useState, useEffect } from 'react'
import axios from 'axios'
import { RECIPE_COMMENTS_ENDPOINT } from '../../config/constants'
import CustomCard from '../shared/CustomCard'
import CommentsPost from './CommentsPost'
import CommentsView from './CommentsView'

function Comments({ recipe_id }) {

    // comments will be stored in this state
    // it should be passed down to the components
    const [comments, setComments] = useState(null)

    // We need to load the comments using the recipe id => RECIPE_COMMENTS_ENDPOINT(recipe_id)



  return (
    <CustomCard>
        <CommentsPost />
        <CommentsView />
    </CustomCard>
  )
}

export default Comments