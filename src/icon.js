import sharp from 'sharp'

const icon1Set = {
  columns: 10,
  rows: 2,
  left: 30,
  top: 560,
  colspan: 21,
  rowspan:21,
  iconSize: 100,
}

for (let i = 0; i < icon1Set.columns; i++) {
  for(let j = 8; j < 10; j++) {
    // const j = 1
      sharp('./resources/iconset/1.jpg')
      .extract({
        left: icon1Set.left + (icon1Set.iconSize + icon1Set.colspan) * i,
        top: icon1Set.top + 121*j +2,//+ 728 + 121 + 121 + 121,
        width: icon1Set.iconSize,
        height: icon1Set.iconSize,
      })
      .webp({quality: 100})
      .toFile(`./temp/${j}_${i}.webp`, (err, info) => {
        if (!err) {
          console.log(`切割成功`)
        } else {
          console.log(err, info)
        }
      })
  }
}
