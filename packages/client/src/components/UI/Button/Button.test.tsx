import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Loader component', () => {
  it('Loader render', () => {
    render(<Button>{'btn'}</Button>)

    expect(screen.getByRole('button'))
    expect(screen.getByText('btn'))
  })
})
