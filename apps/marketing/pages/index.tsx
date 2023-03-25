import Image from 'next/image'

import { attributes, react as HomeContent } from '../content/about.md'

export default function Index() {
  const { title, heroImage } = attributes
  return (
    <div className="bg-gray-50 prose">
      {title}
      <Image src={heroImage} layout="fill" />
      <HomeContent />
    </div>
  )
}
