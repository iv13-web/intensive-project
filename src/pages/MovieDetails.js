import {useParams} from 'react-router-dom/cjs/react-router-dom'

export default function MovieDetails() {
  const {id} = useParams()

  return (
    <h1>{id}</h1>
  )
}