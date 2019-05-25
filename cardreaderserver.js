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
  const nameTH = await person.getNameTH()
  const nameEN = await person.getNameEN()

  console.log(`CitizenID: ${cid}`)
  // io.emit(`personIdClient`, cid)

  console.log('=============================================')
  console.log('Receiving Image')
  const photo = await person.getPhoto()
  const fileStream = fs.createWriteStream(`${cid}.bmp`)
  const photoBuff = Buffer.from(photo)
  fileStream.write(photoBuff)
  fileStream.close()
  // io.emit(`photoClient`, photoBuff)
  io.emit(`personClient`, { id: cid, name_th: nameTH, name_en: nameEN, photo: photoBuff })
})

myReader.on('device-deactivated', () => { console.log('device-deactivated') })