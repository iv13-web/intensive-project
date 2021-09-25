import {Grid} from '@material-ui/core'

export default function CardContainer({children}) {

  return (
    <Grid container spacing={3}>
      {children}
    </Grid>
  )
}