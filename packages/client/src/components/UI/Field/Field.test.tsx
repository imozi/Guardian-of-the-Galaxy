import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { Field } from './Field'
import userEvent from '@testing-library/user-event'

const onChange = jest.fn()
const user = userEvent.setup()

describe('Field component', () => {
	it('renders Field component', () => {
		render(
			<Field name='inputPassword' type='text' label='Password' onChange={onChange} value=""></Field>
		)

		expect(screen.getByLabelText(/Password/i))
	})

	it('onChange working', async () => {
		render(
			<Field name='inputPassword' type='text' label='Password' onChange={onChange} value=""></Field>
		)

		await user.type(screen.getByRole('textbox'), 'Galaxy')
		expect(onChange).toHaveBeenCalledTimes(6)
	})

	it('Field snapshot', () => {
		const field = render(
			<Field name='inputPassword' type='text' label='Password' onChange={onChange} value=""></Field>
		)

		expect(field).toMatchSnapshot();
	})
})