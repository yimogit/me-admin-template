/**
 * 登录
 *
 * @url /common/upload
 * POST
 */
module.exports = {
  status: 1,
  data: {
    fileName: '@integer(0).jpg',
    filePath: '@image(200x200)',
    fileUrl: '@image(200x200)'
  }
}
