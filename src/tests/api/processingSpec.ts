
import sharp from 'sharp'


import {ImageInterface  } from '../../utilities/interfaces'

const imagesRootPath = './assets/images'
const thumbRootPath = './assets/thumb'

const expectImage = {
  format: 'jpeg',
  width: 200,
  height: 200,
  channels: 3,
  premultiplied: false,
  size: 6915
}

describe('Testing process image', () => {
  it('Check if image process ends', async () => {
    const image : ImageInterface = {
      name: 'fjords',
      width: 200,
      height : 200
    } 
     await sharp(`${imagesRootPath}/fjord.jpg`)
      .resize(image.width, image.height)
      .toFile(`${thumbRootPath}/${image.name}_${image.width}_${image.height}_thumb.jpg`)
      .then((info) => {
        expect(info).toEqual(expectImage)
      })
  })

})