var test = require('tape')

var request = require('./')

test('try a CORS GET', function (t) {
  var url = 'https://www.googleapis.com/plus/v1/activities'
  request(url, function(err, resp, body) {
    t.equal(resp.statusCode, 400)
    t.equal(!!resp.body.match(/Required parameter/), true)
    t.end()
  })
})

test('json true', function (t) {
  var url = 'https://www.googleapis.com/plus/v1/activities'
  request({url: url, json: true}, function(err, resp, body) {
    t.equal(body.error.code, 400)
    t.end()
  })
})

test('binary data', function (t) {
  var url = 'https://www.googleapis.com/plus/v1/activities'
  request({url: url, encoding: null}, function(err, resp, body) {
    t.ok(body instanceof(ArrayBuffer), 'Body is an array buffer')
    t.ok(body.byteLength > 0, 'Body byteLength should be > 0')
    t.end()
  })
})
