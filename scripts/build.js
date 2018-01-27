'use strict'

const pkg = require('../package.json')
const fs = require('fs')
const mkdirp = require('mkdirp')
const sass = require('node-sass')

const file = pkg.packName
const fileName = `./src/${file}.scss`
const dist = 'dist'
const includePaths = []

console.log('⚡️  Building some Awesome CSS!')

// Default .css compile
sass.render({
  file: fileName,
  includePaths: includePaths
}, function(error, result) {
  if (error) {
    console.error(error)
    return process.exit(1)
  }
  else {
    mkdirp(`./${dist}`)
    fs.writeFile(`./${dist}/${file}.css`, result.css, function(err){
      if (!err) {
        return console.log(`   ${file}.css created.`)
      }
    })
  }
})

// Minified .css compile
sass.render({
  file: fileName,
  includePaths: includePaths,
  outputStyle: 'compressed'
}, function(error, result) {
  if (error) {
    console.error(error)
    return process.exit(1)
  }
  else {
    mkdirp(`./${dist}`)
    fs.writeFile(`./${dist}/${file}.min.css`, result.css, function(err){
      if (!err) {
        return console.log(`   ${file}.min.css created.`)
      }
    })
  }
})
