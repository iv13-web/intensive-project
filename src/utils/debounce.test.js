import {debounce} from './debounce'

jest.useFakeTimers("modern")

it('func should execute just once', () => {
	const func = jest.fn()
	const debouncedFunc = debounce(func, 500)
	debouncedFunc()
	jest.advanceTimersByTime(250)
	debouncedFunc()
	jest.runAllTimers()

	expect(func).toBeCalledTimes(1)
})
