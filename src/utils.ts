const hostsToRegex = (hostPatterns: string[]): RegExp => {
  let combinedRegex = '(' + hostPatterns.join('|') + ')'
  return new RegExp(combinedRegex)
}

export const pathFromHostnameAndPath = (
  hostname: string,
  path: string
): string => {
  console.log('reslving', hostname, path)
  if ('localhost' === hostname) {
    return path
  }

  const matches = hostname.match(
    /^((?:[a-z0-9])+)\.app(?:\.dev)?\.onetrueos\.com$/
  )
  if (matches) {
    console.log('matches!')
    if (matches[1] === 'app') {
      console.log('matches app!')
      if (path.startsWith('/static/')) {
        return path
      }
      return '/app/' + path
    }
    return '/instance/' + matches[1] + path
  } else {
    console.log('does not matches!')
    const matches = hostname.match(/^app\.(?:dev\.)?onetrueos\.com$/)
    if (matches) {
      console.log('does not matches regex!')
      return '/app' + path
    }
  }

  throw new Error('unrecognized domain')
}
