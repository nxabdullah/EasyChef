import React from 'react'
import Comments from '../components/recipe/Comments'
import Details from '../components/recipe/Details'
import { useParams } from 'react-router-dom';

function Recipe() {

  const { id } = useParams();

  return (
    <>
      {`${id}`}
      <Details recipe_id={id}/>
      <Comments recipe_id={id}/>
    </>

  )
}

export default Recipe