require('shelljs/global')
var fs = require('fs')
var path = require('path')
var r = process.cwd()
for (var i = 0; i < 17; i++) {
  let _d = path.join(r, '../frontend/dist/assets/image/tour', `loc${i}`)
  process.chdir(_d)
  exec('for i in *.jpg; do convert $i -resize 667x $i; done')
}