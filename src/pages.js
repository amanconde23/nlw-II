const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

// eh no req q o express vai pegar as requisicoes feitas na pag(envio de dados do form, etc)
function pageLanding(req, res){
    // return res.sendFile(__dirname + "/views/index.html")
    // como o local da pasta já foi configurado no nunjucks, só coloca nome do arquivo
    return res.render("index.html")
}

// {proffys está mandando o objeto proffys para a page Study}
async function pageStudy(req, res){
    // pega os dados enviados (url) do form
    const filters = req.query

    // se vier vazio, só mostra a pagina study, sem resultados
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }

    // converter horas em minutos (esta em format.js)
    const timeToMinutes = convertHoursToMinutes(filters.time)

    // onde apresentar os resultados do exists, pode mostrar o resto dos dados (proffys e classes)
    // ${filters.weekday} dado q vem do formulario se for texto, precisa ser dentro de aspas
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = class_id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `
    // conexao com banco
    // caso haja erro na consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
    }
    
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')
    // req.query (para esconder os dados da url, usa req.body) - precisa fazer alteracao no sever.js
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    // weekday eh um array, portanto da pra fazer um map
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes (req.body.time_from[index]),
            time_to: convertHoursToMinutes (req.body.time_to[index])
        }
    })

    try {
        // cadastrar no banco
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        // mostrar a pagina study com os resultados filtrados
        let queryString = "?subject=" + req.body.subject
        // queryString = queryString é igual a queryString +=
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}