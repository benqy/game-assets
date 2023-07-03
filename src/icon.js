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
  // for(let j = 0; j < icon1Set.columns; j++) {
    const j = 9
    sharp('./src/assets/icons.png')
      // .extract({
      //   left: icon1Set.left + j * icon1Set.span,
      //   top: icon1Set.top + i * icon1Set.span,
      //   width: icon1Set.iconSize,
      //   height: icon1Set.iconSize,
      // })
      // .toFile(`./src/assets/icon1-${i * icon1Set.columns + j}.png`)
      sharp('./resources/iconset/1.jpg')
      .extract({
        left: icon1Set.left + (icon1Set.iconSize + icon1Set.colspan) * i,
        top: icon1Set.top + 728 + 121 + 121 + 121,
        width: icon1Set.iconSize,
        height: icon1Set.iconSize,
      })
      .toFile(`./temp/${j}_${i}.png`, (err, info) => {
        if (!err) {
          console.log(`切割成功`)
        } else {
          console.log(err, info)
        }
      })
  // }
}
