const music = require('../model/music')


var all = {
    path: '/api/music/all',
    method: 'get',
    func: function(request, response) {
        var ms = music.all()
        var r = JSON.stringify(ms)
        response.send(r)
    }
}

var routes = [
    all,
]

module.exports.routes = routes
