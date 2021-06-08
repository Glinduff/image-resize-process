import express from "express";
import {promises as fsPromises} from 'fs';
import { ImageInterface } from './interfaces'
const thumbRootPath = './assets/thumb'
 
export const checkThumbExist = async (req: express.Request, res : express.Response, next: express.NextFunction) : Promise<void> =>  {
  
  // new image
  const image : ImageInterface = {
    name: req.query.filename as string, 
    width: Number(req.query.width) as number, 
    height : Number(req.query.height) as number
  } 

  // thumbails path
  const thumbImagPath= `${thumbRootPath}/${image.name}_${image.width}_${image.height}_thumb.jpg`

  try {
    // try to check if thumbnail exist and open the thumbnail and send the image to the user
    const file =  await fsPromises.open(thumbImagPath, 'r');
    res.sendFile(thumbImagPath, {root: '.'})
    file.close()
  } catch (error) {
    // if the thumbnail dosnt exist go to the next action
    next();
  }
  
}
