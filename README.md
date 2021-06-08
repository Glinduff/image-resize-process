# Resize image  

Express api for resize images


## Installation

Use npm to install dependencies

```bash
npm install
```

## Usage

```bash
npm run build  # start the project at port 4000
npm run jasmine  # testing endpoints and image process
npm run build  # build de project
```


## Endpoint Testing

```bash
http://localhost:4000/api/image # check status code 200
http://localhost:4000/api/image?filename=fjord&width=800&height=200 #check if params (filename, width and height) exist
http://localhost:4000/api/image?filename=fjord&width=800&height=200 #check if image exist
http://localhost:4000/api/image?filename=fjord&width=800&height=200 #check if image width is number
http://localhost:4000/api/image?filename=fjord&width=800&height=200 #check if image height is number
```


## Utilities

```bash
utilities/ image # middlewares for checking params
utilities/ thumb # middleware for check if thumbnail exist, send to the user and avoid reprocessing
utilities/ interfaces # image and error interfaces for create new objects 
```