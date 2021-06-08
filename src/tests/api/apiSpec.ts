import axios from 'axios'

const API_PATH = 'http://localhost:4000/api'

describe('Testing endpoint', () => {

  it('Get api images endpoint 200', async () => {
    const statusCode = await (await axios.get(`${API_PATH}/image`)).request.res.statusCode
    expect(statusCode).toBe(200)
  })
  
})