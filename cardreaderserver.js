require('dotenv').config()
    
const fs = require('fs')

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

  console.log(`CitizenID: ${cid}`)
  console.log(`Gender : ${gender}`)
  io.emit(`personIdClient`, cid)

  console.log('=============================================')
  console.log('Receiving Image')
  const photo = await person.getPhoto()
  const fileStream = fs.createWriteStream(`${cid}.bmp`)
  const photoBuff = Buffer.from(photo)
  fileStream.write(photoBuff)
  fileStream.close()
  io.emit(`photoClient`, photoBuff)
})

myReader.on('device-deactivated', () => { console.log('device-deactivated') })