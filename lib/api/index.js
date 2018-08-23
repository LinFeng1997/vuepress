const fs = require('fs-extra')
const path = require('path')
const mdPath = path.resolve(__dirname, '../app/.temp/online.md')

function writeMarkdown (content) {
  fs.writeFileSync(mdPath, content)
  return 'write success'
}

function initMarkdownFile () {
  if (!fs.pathExistsSync(mdPath)) {
    fs.writeFileSync(mdPath, '')
    console.log('init markdownFIle')
  }
  console.log('markdownFIle exist')
  return fs.readFileSync(mdPath, 'utf-8')
}

exports.writeMarkdown = writeMarkdown
exports.initMarkdownFile = initMarkdownFile
