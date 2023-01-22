import siteMetadata from '@/data/siteMetadata'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import dynamic from 'next/dynamic'

interface Props {
  frontMatter: CoreContent<Blog>
}

const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }: Props) => {
  const comment = siteMetadata?.comment
  if (!comment || Object.keys(comment).length === 0) return <></>
  return (
    <div id="comment">
      {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && <GiscusComponent />}
    </div>
  )
}

export default Comments
