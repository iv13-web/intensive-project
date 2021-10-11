import SelectFilterWrapper from '../pages/ExtendedSearch/components/SelectFilterWrapper'
import {Button} from '@material-ui/core'

export default {
	title: 'SelectFilterWrapper',
	component: SelectFilterWrapper,
	argTypes: {
		numberOfChildren: {type: 'number', defaultValue: 14}
	}
}

export const Standard = ({numberOfChildren, args}) => (
	<SelectFilterWrapper {...args}>
		{[...Array(numberOfChildren).keys()].map(el => (
			<Button style={{flexGrow: 1}}>{el}</Button>
		))}
	</SelectFilterWrapper>
)
