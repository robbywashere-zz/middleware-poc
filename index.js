
let helmet = require('helmet')

let express = require('express')

let directory = []

let app = express()

let oldUse = app.use

app.use = function(... args){
  for (let fn of args) {
    if (typeof fn === "function" && typeof fn.name !== "undefined") {
      let name = fn.name
      if (name.length === 0) {
        name = 'ANONYMOUS' 
      }
      directory.push(name)
    }
  }
  return oldUse.apply(app, arguments)
}




app.use('/secure',function lillyAuth(){
  console.log('I am lilly auth!')
})

app.use('/whatever',helmet())

app.use('/anon',function(){})

console.log(directory)

