const helper = require('./utils/helper')
const puppeteer = require('puppeteer')
const saveImgPath = require('path').join(__dirname, '/logimgs/')
const config = helper.loadConfig(['url', 'exepath'], '--')
config.exepath = config.exepath || 'D:\\webdriver\\chrome-win32\\chrome.exe'

start(config.exepath, config.url)

async function start(exepath, url) {
  const browser = await puppeteer.launch({
    // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
    executablePath: exepath,
    //设置超时时间
    timeout: 50000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 会打开浏览器
    headless: false
  })
  const page = await browser.newPage()
  await page.goto(url)
  //登录页
  await add_img(page, 'login')
  await page.evaluate(() => {
    document.getElementsByTagName('button')[0].click()
  })
  //   await page.tap('button')
  await add_img(page, 'index')

  //   browser.close()
}

async function add_img(page, code) {
  var imgpath = saveImgPath + code + '.png'
  helper.createFileDir(imgpath)
  await page.screenshot({
    path: imgpath
  })
}
