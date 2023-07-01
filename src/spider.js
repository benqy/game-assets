import { urls } from './data.js'
import axios from 'axios'
import fs from 'fs'

const getFileNameFromUrl = (url) => {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1].split('?')[0].replace(/.*-zagorulko-/,'').replace(/.*-zahorulko-/,'')
}

const fails = []

const downloadImage = async (url) => {
  const imagePath = getFileNameFromUrl(url)
  try{
  const res = await axios.get(url, {
    proxy: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 7890,
    },
    responseType: 'arraybuffer', // 特别注意，需要加上此参数
  });

//   console.log(res.data);
  fs.writeFileSync(`./download/${imagePath}`, res.data);
}catch(ex){
  console.log(ex.toString())
  fails.push(url)

}
  // instance.get({
  //   url,
  //   config:{
  //     responseType: 'arraybuffer',
  //   }
  // }).then((response) => {
  //   // console.log(response.data)
  //   new Promise((resolve, reject) => {
  //     response.data
  //       .pipe(fs.createWriteStream(imagePath))
  //       .on('finish', () => resolve())
  //       .on('error', (e) => reject(e))
  //   })
  // })
}

const spider = async () => {
  // const imageUrls = urls.splice(i, n)
  for(let i = 0; i < urls.length; i++){
    await downloadImage(urls[i])
    console.log(`${i}: ${urls[i]}`)
  }
  console.log(fails)
}

spider()
// spider(400)
// spider(500)
