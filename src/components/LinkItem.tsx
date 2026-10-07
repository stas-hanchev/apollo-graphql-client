import type { Link } from '../graphql/types'
import { timeAgo } from '../utils/timeAgo'
import { Host, Index, Meta, StyledLinkItem, Title } from '../styled/LinkItem.styled'

interface Props {
  link: Link
  index: number
}

function getHost(url: string): string | null {
  try {
    return new URL(url).host
  } catch {
    return null
  }
}

function LinkItem({ link, index }: Props) {
  const host = getHost(link.url)

  return (
    <StyledLinkItem disableGutters>
      <Index>{index}.</Index>
      <div>
        <Title href={link.url} target="_blank" rel="noreferrer" underline="hover">
          {link.description}
        </Title>{' '}
        {host && <Host>({host})</Host>}
        <Meta>
          by {link.postedBy?.name ?? 'unknown'} ·{' '}
          <time dateTime={link.createdAt} title={new Date(link.createdAt).toLocaleString()}>
            {timeAgo(link.createdAt)}
          </time>
        </Meta>
      </div>
    </StyledLinkItem>
  )
}

export default LinkItem
