import {Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      display: 'flex',
      marginTop: '10%',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: 300
    },
  }
})

export default function PagePlaceholder({image, text}) {
  const s = useStyles()

  return (
    <div className={s.wrapper}>
      {image}
      <Typography variant='h2' color='textSecondary'>
        {text}
      </Typography>
    </div>
  )
}