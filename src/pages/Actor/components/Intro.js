import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {createCellText} from '../../Movie/components/Intro'

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
  'birthday',
  'deathday',
  'birthplace',
  'biography',
]

export default function Intro({data}) {
  const s = useStyles()
  const {photo, name} = data

  return (
    <div className={s.mainWrapper}>
      <img className={s.image} src={photo} alt={name}/>
      <div className={s.textWrapper}>
        <Typography variant='h4' color='textSecondary' gutterBottom>
          {name}
        </Typography>
        <table>
          <tbody>
          {ROW_TITLES.map(rowTitle => (
            <tr key={rowTitle}>
              <td className={s.pointCell}>
                {createCellText(rowTitle, ':')}
              </td>
              <td>
                {createCellText(data[rowTitle] || '-')}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
