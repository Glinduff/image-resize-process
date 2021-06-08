import express from "express";
import sharp from 'sharp'

import {ImageInterface, ErrorInterface } from '../../utilities/interfaces'
import {checkParams,  checkImageExist, checkImageWidthParmas, checkImageHeightParams} from '../../utilities/image'
import {checkThumbExist} from '../../utilities/thumb'

const imagesRootPath = './assets/images'
const thumbRootPath = './assets/thumb'
 

const image = express.Router()
const middleswares = [checkParams,  checkImageExist, checkImageWidthParmas, checkImageHeightParams, checkThumbExist]

image.get('/', middleswares, (req: express.Request, res : express.Response) : void =>  {
  
  // create a new obj from image interface
  const image : ImageInterface = {
    name: req.query.filename as string, 
    width: Number(req.query.width) as number, 
    height : Number(req.query.height) as number
  } 

  // init sharp functions
  sharp(`${imagesRootPath}/${image.name}.jpg`)
    // resize the image
    .resize(image.width, image.height)
    // save the image in to the thumbnail path
    .toFile(`${thumbRootPath}/${req.query.filename}_${req.query.width}_${req.query.height}_thumb.jpg`, (err)  => {
      if(err === null) {
        // if we didnt get an error, send the resized image to the user
        res.sendFile(`${thumbRootPath}/${image.name}_${image.width}_${image.height}_thumb.jpg`, {root: '.'})
      }
      else {
         // if sharp proccess fail, create a new obj from error interface
        const newError : ErrorInterface = {
          status: res.statusCode,
          errorCode: 6,
          errorMessage: err.message
        }
        // and send the error obj to the user
        res.send(newError)
      }
    })
})

export default image;
