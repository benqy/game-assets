import { urls } from './data.js'
import axios from 'axios'

const getFileNameFromUrl = (url) => {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1]
}

const downloadImage = (url) => {
  const imagePath = getFileNameFromUrl(url)
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imagePath))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e))
      })
  )
}

const spider = async () => {
  const imageUrls = urls.splice(0, 2)
  let example_image_1 = await downloadImage(
    imageUrls[0]
  )

  console.log(example_image_1.status) // true
  console.log(example_image_1.error) // ''

  // let example_image_2 = await download_image(
  //   'https://example.com/does-not-exist.png',
  //   'example-2.png'
  // )

  // console.log(example_image_2.status) // false
  // console.log(example_image_2.error) // 'Error: Request failed with status code 404'

  // let example_image_3 = await download_image(
  //   'https://example.com/test-3.png',
  //   'example-3.png'
  // )

  // console.log(example_image_3.status) // true
  // console.log(example_image_3.error) // ''
}

spider()