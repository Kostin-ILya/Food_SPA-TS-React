import { render } from '@testing-library/react'
import { UserProfile } from '../MainLayout/Aside/UserProfile/UserProfile'

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  isLoading: false,
}

describe('UserProfile', () => {
  it('renders the user profile with name and email', () => {
    const { getByText, getByAltText } = render(<UserProfile {...mockUser} />)

    expect(getByText(mockUser.name)).toBeInTheDocument()
    expect(getByText(mockUser.email)).toBeInTheDocument()
    expect(getByAltText('avatar')).toBeInTheDocument()
  })

  it('shows a spinner when isLoading is true and name is not present', () => {
    const { queryByText, getByAltText, container } = render(
      <UserProfile isLoading={true} />
    )

    expect(queryByText(mockUser.name)).not.toBeInTheDocument()
    expect(getByAltText('avatar')).toBeInTheDocument()
    expect(container.querySelector('.spinner')).toBeInTheDocument()
  })
})
