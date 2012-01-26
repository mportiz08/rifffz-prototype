fs     = require 'fs'
stitch = require 'stitch'

{spawn, exec} = require 'child_process'

task 'build', "Build CoffeeScript source files", ->
  coffee = spawn 'coffee', ['-cw', '-o', 'lib', 'src']
  coffee.stdout.on 'data', (data) -> process.stdout.write data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'build-tests', "Build CoffeeScript test files", ->
  coffee = spawn 'coffee', ['-cw', '-o', 'test', 'test']
  coffee.stdout.on 'data', (data) -> process.stdout.write data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'test', "Test source files", ->
  mocha = spawn './node_modules/mocha/bin/mocha', ['--colors']
  mocha.stdout.on 'data', (data) -> process.stdout.write data.toString()
  mocha.stderr.on 'data', (data) -> process.stderr.write data.toString()

task 'client', "Build client.js file.", ->
  client = stitch.createPackage
    paths: [__dirname + '/lib/public/js/client']
  client.compile (err, src) ->
    fs.writeFile __dirname + '/lib/public/js/client.js', src, (err) ->
      throw err if err
      console.log 'Compiled client javascript package.'
