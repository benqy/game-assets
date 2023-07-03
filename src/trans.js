import sharp from 'sharp'

// const icon1Set = {
//   columns: 10,
//   rows: 2,
//   left: 30,
//   top: 560,
//   colspan: 21,
//   rowspan:21,
//   iconSize: 100,
// }

for (let i = 0; i < 13; i++) {
    sharp(`./download/${i}.jpg`)
    .resize({width:400})
    .webp({quality: 100})
    .toFile(`./temp/${i}.webp`, (err, info) => {
      if (!err) {
        console.log(`切割成功`)
      } else {
        console.log(err, info)
      }
    })
}
