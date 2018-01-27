const fs = require('fs')
const pkg = require('../package.json')

const homepage = function() {
  if (pkg.homepage) {
    return ' ('+ pkg.homepage +')'
  }
  else {
    return ''
  }
}

const banner = ['/**',
  ' * '+ pkg.name +' v'+ pkg.version + homepage(),
  ' * '+ pkg.description,
  ' * Licensed under '+ pkg.license,
  ' */',
  ''].join('\n')

const dir = './dist/'

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err)
    process.exit(1)
  }

  files.forEach((file, index) => {
    fs.readFile(dir + file, 'utf-8', function(err, data) {
      if (err) {
        return console.log(err)
      }

      data = banner + data

      fs.writeFile(dir + file, data, 'utf-8', function(err) {
        if (err) {
          return console.log(err)
        }
      })
    })
  })
})
