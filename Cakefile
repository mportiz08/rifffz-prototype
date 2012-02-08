fs     = require 'fs'
stitch = require 'stitch'

{spawn, exec} = require 'child_process'

compileCoffee = (src, dest) ->
  coffee = spawn './node_modules/coffee-script/bin/coffee', ['-cw', '-o', dest, src]
  coffee.stdout.on 'data', (data) -> process.stdout.write data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()

buildSource = ->
  compileCoffee 'src', 'lib'

buildTests = ->
  compileCoffee 'test', 'test'

task 'build:source', "Build CoffeeScript source files", ->
  buildSource()

task 'build:tests', "Build CoffeeScript test files", ->
  buildTests()

task 'build', "Builds source and test files when the files are saved", ->
  buildSource()
  buildTests()

task 'test', "Test source files", ->
  coffee = spawn './node_modules/coffee-script/bin/coffee', ['test/library.coffee']
  coffee.stdout.on 'data', (data) -> process.stdout.write data.toString()
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()
  #mocha = spawn './node_modules/mocha/bin/mocha', ['--colors']
  #mocha.stdout.on 'data', (data) -> process.stdout.write data.toString()
  #mocha.stderr.on 'data', (data) -> process.stderr.write data.toString()

# don't use this anymore:
# the client.js file is re-generated if needed on GET requests for it
task 'client', "Build client.js file.", ->
  client = stitch.createPackage
    paths: [__dirname + '/lib/public/js/client']
  client.compile (err, src) ->
    fs.writeFile __dirname + '/lib/public/js/client.js', src, (err) ->
      throw err if err
      console.log 'Compiled client javascript package.'
