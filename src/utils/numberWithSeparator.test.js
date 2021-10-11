import {numberWithSeparator} from './numberWithSeparator'

it('split number with separator', () => {
	expect(numberWithSeparator(1000000)).toEqual('1 000 000')
	expect(numberWithSeparator(1000000.456)).toEqual('1 000 000.456')
	expect(numberWithSeparator(1000000, '-')).toEqual('1-000-000')
})
