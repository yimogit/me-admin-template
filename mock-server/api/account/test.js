/**
 * 用户页面 - 用户信息
 *
 * @url /user?uid=233
 *
 * GET: 请求方法及参数
 *   uid 这是请求的用户ID
 *
 * 在这里你可以写详细的说明参数的信息
 */

module.exports = function(req) {
  // express 的 req 对象
  var uid = req.query ? req.query.uid : 1

  if (!uid) {
    // 当没有用户ID时返回错误信息
    return {
      code: -1,
      msg: 'no uid'
    }
  }

  return {
    // 返回mock的用户信息，但用户id固定
    code: 0,
    data: {
      uid: +uid,
      name: '@cname',
      'age|20-30': 1,
      email: '@email',
      date: '@date'
    }
  }
}
