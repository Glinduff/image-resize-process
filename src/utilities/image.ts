
import express from "express";
import {promises as fsPromises} from 'fs';
import { ErrorInterface } from './interfaces'
const imagesRootPath = './assets/images'
 
 
// function to check if all params have been set
export const checkParams = (req: express.Request, res : express.Response, next: express.NextFunction) : void =>  {
  const filename = req.query.filename
  const width = req.query.width
  const height = req.query.height
  const missingPamas = [{name: 'filename', param: filename}, {name: 'width', param: width}, {name: 'height', param: height }]

  if(filename == null || width == null || height == null) {
    // if any of those params dosnt exist, create a new obj from error interface
    const newError : ErrorInterface = {
      status: res.statusCode,
      errorCode: 1,
      errorMessage: `There are missing parameters in the request. You should try http://localhost:4000/api/image?filename=fjord&width=200&height=200`,
      paramsMissing: missingPamas.filter(({param}) => param === undefined).map((param) => param.name)
    }
    // and send the error obj to the user
    res.send(newError)
  }
  else {
    // if all params has been set, go to the next action
    next()
  }
}



// function to check if image exist
export const checkImageExist = async (req: express.Request, res : express.Response, next: express.NextFunction) : Promise<void> =>  {
  const imagePath = `${imagesRootPath}/${req.query.filename}.jpg`
  try {
     // try to open the image and send it
    const file = await fsPromises.open(imagePath, 'r');
    file.close()
    next();
  } catch ({message}) {
    // if the image dosnt exist create a new obj from error interface
    const newError : ErrorInterface = {
      status: res.statusCode,
      errorCode: 2,
      errorMessage: message as string
    }
    // and send the error obj to the user
    res.send(newError).end()
  }
}

// function to check if width param is a number
export const checkImageWidthParmas = (req: express.Request, res : express.Response, next: express.NextFunction) : void =>  {
  const width = req.query.width
  if(!isNaN(Number(width))) {
    // if width is a number go to the next action
    next();
  } 
  else {
    // if width isnt a number create a new obj from error interface
    const newError : ErrorInterface = {
      status: res.statusCode,
      errorCode: 3,
      errorMessage: 'Width parameter must be a number'
    }
    // and send the error obj to the user
    res.send(newError).end()
  }
}


// function to check if height param is a number
export const checkImageHeightParams = (req: express.Request, res : express.Response, next: express.NextFunction) : void =>  {
  const height = req.query.height
  if(!isNaN(Number(height))) {
    // if height is a number go to the next action
    next();
  } 
  else {
    // if height isnt a number, create a new obj from error interface
    const newError : ErrorInterface = {
      status: res.statusCode,
      errorCode: 4,
      errorMessage: 'Height parameter must be a number'
    }
    // and send the error obj to the user
    res.send(newError).end()
  }
}
