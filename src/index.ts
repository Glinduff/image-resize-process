import express from "express"
import routes from "./routes/index";

const app = express()
const port = 4000;

app.use('/api', routes)

app.listen(port, () : void => {
  console.log('server start!!')
})