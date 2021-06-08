import express from "express";
import image from './api/image'

const routes = express.Router()

// Route for image
routes.use('/image', image)

export default routes;