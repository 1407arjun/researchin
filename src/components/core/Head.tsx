import NextHead from 'next/head'

const Head = ({ title }: { title: string }) => {
  const desc = 'Page Desc'
  const endpoint = 'https://example.com'
  const domain = 'example.com'
  const siteName = 'Page Name'
  const twitterHandle = ''

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href="/logo.png" />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={`${endpoint}/logo.png`} />
      <meta property="og:url" content={endpoint} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={endpoint} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${endpoint}/logo.png`} />
    </NextHead>
  )
}

export default Head
