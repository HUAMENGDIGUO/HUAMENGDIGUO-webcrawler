var fs = require('fs')

var musicFilePath = 'db/music.json'

const loadMusic = () => {
    const content = fs.readFileSync(musicFilePath, 'utf8')
    const ms = JSON.parse(content)
    return ms
}

var m = {
    data: loadMusic()
}

m.all = function() {
    var ms = this.data
    return ms
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = m
