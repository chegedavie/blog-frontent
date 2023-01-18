export const randomColor = (accent=100) => {
    accent/=100
  const RandomUntil = until => {
    return Math.round(Math.random() * until)
  }
  const R = RandomUntil(75)
  const G = RandomUntil(150)
  const B = RandomUntil(75)

  return `rgba(${R+' '+G+' '+B+'/'+accent})`
}

export function shortenStr (title, length) {
  const words = title.split(' ')
  const padding=(words.length>length)?'...':''
  words.length = length
  return words.join(' ')+padding
}