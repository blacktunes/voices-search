const jsonList = require.context('@/data', false, /.json$/).keys().map(item => {
  return item.substring(2)
})

let Voices = []

jsonList.forEach(name => {
  const voice = require(`@/data/${name}`)
  Voices = [...Voices, ...voice]
})

export {
  Voices
}
