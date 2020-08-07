// chamada do servidor express
// ()depois do express executa a funcao express
// listen é uma funcionalidade(dentro a porta q executara o servidor)
const express = require('express')
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

// configurar nunjucks (fala q pasta esta os arquivos html)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})


server
// por padrao do express, o req.body nao funciona, por isso precisa da config abaixo
// receber dados do req.body do pages.js (function pageGiveClasses)
.use(express.urlencoded({extended: true}))
// configurando pasta public como raiz(img, css, são arquivos estáticos)
.use(express.static("public"))

// configurar rotas
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// criado uma funcao saveClasses no pages.js
.post("/save-classes", saveClasses)

// porta q ira rodar servidor
.listen(5000)