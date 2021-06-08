import axios from 'axios'

const API_PATH = 'http://localhost:4000/api'

describe('Testing endpoint image file', () => {
  
  it('Check if params are ok', async () => {
    const errorCode = await (await axios.get(`${API_PATH}/image?filename=fjord&width=800&height=200`)).data.errorCode
    expect(errorCode).not.toBe(1)
  })
  
  it('Check if image exist', async () => {
    const errorCode = await (await axios.get(`${API_PATH}/image?filename=fjord&width=800&height=200`)).data.errorCode
    expect(errorCode).not.toBe(2)
  })

  it('Check if image width is number', async () => {
    const errorCode = await (await axios.get(`${API_PATH}/image?filename=fjord&width=200&height=200`)).data.errorCode
    expect(errorCode).not.toBe(3)
  })

  it('Check if image height is number', async () => {
    const errorCode = await (await axios.get(`${API_PATH}/image?filename=fjord&width=200&height=200`)).data.errorCode
    expect(errorCode).not.toBe(4)
  })

})