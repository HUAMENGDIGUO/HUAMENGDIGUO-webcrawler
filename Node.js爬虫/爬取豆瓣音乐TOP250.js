var fs = require('fs')
var request = require('sync-request')
var cheerio = require('cheerio')

class Music {
    constructor() {
        // 分别是歌曲名/歌手名/评分/封面图片链接/年份/类型/评论人数
        this.songName = ''
        this.singerName = ''
        this.score = 0
        this.coverUrl = ''
        this.year = 0
        this.type = ''
        this.comments = ''
    }
}

var is_space = function(s) {
    if (s.length == 0) {
        return false
    }
    for (var i = 0; i < s.length; i++) {
        if (s[i] != ' ') {
            return false
            break
        }
    }
    return true
}

var strip_left = function(s) {
    if (is_space(s) == true) {
        return ''
    }
    for (var i = 0; i < s.length; i++) {
        if (s[i] != ' ') {
            result = i
            break
        }
    }
    return s.slice(result, s.length)
}

var strip_right = function(s) {
    if (is_space(s) == true) {
        return ''
    }
    for (var i = s.length - 1; i >= 0; i--) {
        if (s[i] != ' ') {
            result = i + 1
            break
        }
    }
    return s.slice(0, result)
}

var strip = function(s) {
    return strip_right(strip_left(s))
}

var log = console.log.bind(console)

var musicFromDiv = (div) => {
    var e = cheerio.load(div)
    // 创建一个音乐类的实例并且获取数据
    var music = new Music()

    var title = e('.nbg').attr('title')
    music.songName = title.split(' - ')[1]
    music.singerName = title.split(' - ')[0]
    music.score = e('.rating_nums').text()

    var nbg = e('.nbg')
    music.coverUrl = nbg.find('img').attr('src')

    var yearAndType = e('div > p')
    var y = yearAndType.text().split('/')[1]
    music.year = strip(String(y).split('-')[0])
    music.type = yearAndType.text().split('/')[4]

    var comment = e('.star > .pl')
    var c = comment.text().split('\n')[2]
    music.comments = String(c).slice(28)

    return music
}

var cachedUrl = (url) => {
    // 1. 确定缓存的文件名
    var cacheFile = 'cached_html/' + url.split('?')[1] + '.html'
    // 2. 检查缓存文件是否存在
    // 如果存在就读取缓存文件
    // 如果不存在就下载并且写入缓存文件
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        var data = fs.readFileSync(cacheFile)
        return data
    } else {
        // 用 GET 方法获取 url 链接的内容
        var r = request('GET', url)
        var body = r.getBody('utf-8')

        fs.writeFileSync(cacheFile, body)
        return body
    }
}

var musicFromUrl = (url) => {
    var body = cachedUrl(url)
    var e = cheerio.load(body)

    var musicDivs = e('.item')
    // 循环处理 25 个 .item
    var music = []
    for (var i = 0; i < musicDivs.length; i++) {
        var div = musicDivs[i]
        var m = musicFromDiv(div)
        music.push(m)
    }
    return music
}

var saveMusic = (music) => {
    var s = JSON.stringify(music, null, 2)
    // 把 json 格式字符串写入到 文件 中
    var fs = require('fs')
    var path = '爬取豆瓣音乐TOP250.txt'
    fs.writeFileSync(path, s)
}

var downloadCovers = (music) => {
    // 使用 request 库来下载图片
    var request = require('request')
    for (var i = 0; i < music.length; i++) {
        var m = music[i]
        var url = m.coverUrl
        // 保存图片的路径
        var path = 'covers/' + m.songName + '.jpg'
        // 下载图片
        request(url).pipe(fs.createWriteStream(path))
    }
}

var __main = () => {
    // 主函数
    var music = []
    for (var i = 0; i < 10; i++) {
        var start = i * 25
        var url = `https://music.douban.com/top250?start=${start}`
        var musicInPage = musicFromUrl(url)
        music = [...music, ...musicInPage]
    }
    saveMusic(music)
    downloadCovers(music)
}

__main()
