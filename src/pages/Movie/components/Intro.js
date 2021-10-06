import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => {
  return {
    mainWrapper: {
      display: 'flex',
      marginBottom: 80,
      minHeight: 450
    },
    image: {
      height: 450,
      marginRight: 24
    },
    textWrapper: {
      boxSizing: 'border-box',
      width: '60%',
    },
    pointCell: {
      width: 96,
      verticalAlign: 'top',
      maxHeight: 160,
      overflow: 'hidden'
    }
  }
})

const ROW_TITLES = [
  'overview',
  'rating',
  'release',
  'runtime',
  'countries',
  'companies',
  'genres',
  'budget',
  'revenue',
]

const createCellText = (title, separator) => (
  <Typography variant='subtitle1' color='textSecondary'>
    {separator ? title + separator : title}
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
            {ROW_TITLES.map(rowTitle => (
              <tr key={rowTitle}>
                <td className={s.pointCell}>{createCellText(rowTitle, ':')}</td>
                <td>{createCellText(data[rowTitle])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}