require('dotenv').config()

const { Reader } = require('thaismartcardreader.js')

const io = require('socket.io').listen(process.env.SOCKER_PORT || 3002)
const myReader = new Reader()

myReader.on('device-activated', async (event) => {
  console.log('device-activated')
  console.log(event)
})

myReader.on('error', async (err) => {
  console.log(err)
})

myReader.on('card-inserted', async person => {
  const cid = await person.getCid()
  const gender = await person.getGender()
  const photo = await person.getPhoto()
  console.log(`CitizenID: ${cid}`)
  console.log(`Gender : ${gender}`)
  io.emit(`personIdClient`, cid)
  // io.emit(`personIdClient`, photo)
})

myReader.on('device-deactivated', () => { console.log('device-deactivated') })