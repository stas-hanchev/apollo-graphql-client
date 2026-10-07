import styled from 'styled-components'

export const SearchForm = styled.form`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`
