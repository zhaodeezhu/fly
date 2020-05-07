const Colors = require('colors/safe')

Colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

const selfConsole  = function(content:any, color: string = 'green') {
  console.log(color)
  const a = Colors.green
  console.log(a(content))
}

module.exports = selfConsole