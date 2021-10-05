import {Paper, Typography, withStyles} from '@material-ui/core'
import {ToggleButtonGroup} from '@material-ui/lab'

const StyledToggleButtonGroup = withStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.divider}`,
  },
  grouped: {
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    }
  }
}))(ToggleButtonGroup)

export default function SelectFilterWrapper({children, onChange, value}) {

  return (
    <div>
      <Typography variant='h6' color='primary' gutterBottom>
        Select genres
      </Typography>
      <Paper elevation={0}>
        <StyledToggleButtonGroup
          size="small"
          value={value}
          onChange={onChange}
          aria-label="text alignment"
        >
          {children}
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  )
}
