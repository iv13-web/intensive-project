import classnames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import {Link as BrowserLink} from 'react-router-dom'
import {useParams} from 'react-router-dom'

const useStyles = makeStyles(theme => {
	return {
		item: {
			margin: '0 30px',
			height: 40,
			cursor: 'pointer',
			color: theme.palette.text.hint
		},
		active: {
			color: theme.palette.primary.main
		},
		list: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-evenly',
			marginBottom: 20,
			backgroundColor: theme.palette.grey['200'],
			margin: '0 -24px',
			width: 'calc(100% + 8px)'
		}
	}
})

export default function TabsContainer({children}) {
	const s = useStyles()
	const {id, tab} = useParams()
	const selectedTab = children.findIndex(item => item.props.title.toLowerCase() === tab)

	return (
		<>
			<ul className={s.list}>
				{children.map((item, index) => {
					const tabTitle = item.props.title.toLowerCase()
					return (
						<BrowserLink
							key={index}
							to={`/movie/${id}/${tabTitle}`}
						>
							<Button
								className={classnames(s.item, {[s.active]: tabTitle === tab})}
								disableRipple
							>
								{item.props.title}
							</Button>
						</BrowserLink>
					)
				})}
			</ul>
			{children[selectedTab]}
		</>
	)
}