var fs = require('fs')
var marked = require('marked')
var { exec, execSync } = require('child_process')
var public = `${__dirname}/public`
var source = `${__dirname}/source`
function rsyncStatic(){
    exec('rsync -a --exclude _posts/ --exclude _templates/ source/ public/')
}

rsyncStatic()

var junk = fs.readdirSync(`${source}/blog`).forEach(htmlpost)

function htmlpost(path){
    var link = path.split('.')[0]
    var markdown = fs.readFileSync(`${source}/blog/${path}`,'utf8')
    var html = marked(markdown)
    var dir = `${public}/${link}` 
    if (!fs.existsSync(dir)) execSync(`mkdir -p ${dir}`)
    fs.writeFileSync(`${dir}/index.html`, `<html>${html}</html>`)
}