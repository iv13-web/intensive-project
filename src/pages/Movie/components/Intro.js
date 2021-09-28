import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => {
  return {
    mainWrapper: {
      display: 'flex',
    },
    image: {
      height: 450,
      marginRight: 24
    },
    textWrapper: {
      height: 450,
      boxSizing: 'border-box',
      width: '60%',
    },
    pointCell: {
      width: 80,
      verticalAlign: 'top'
    }
  }
})

const points = [
  'overview',
  'rating',
  'release',
  'runtime',
  'countries',
  'genres'
]

const createCellText = (point, separator) => (
  <Typography variant='subtitle1' color='textSecondary'>
    {separator ? point + separator : point}
  </Typography>
)

export default function Intro({data}) {
  const {poster, tagline, title} = data
  const s = useStyles()

  return (
    <div className={s.mainWrapper}>
      <img className={s.image} src={poster} alt={poster}/>
      <div className={s.textWrapper}>
        <Typography variant='h4' color='textSecondary'>
          {title}
        </Typography>
        <Typography variant='h6' color='textSecondary' gutterBottom>
          {tagline}
        </Typography>
        <table>
          <tbody>
            {points.map(point => (
              <tr key={point}>
                <td className={s.pointCell}>{createCellText(point, ':')}</td>
                <td>{createCellText(data[point])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}