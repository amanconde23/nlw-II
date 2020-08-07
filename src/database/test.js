const Database = require('./db')
const createProffy = require('./createProffy')
// executou o db e a query no db.js, then faz oq está nessa pag
// () => {} funcao anonima
// db é o then q esta retornando
Database.then(async (db) => {
    // inserir dados
    proffyValue = {
        name: 'Amanda Conde',
        avatar: 'https://avatars2.githubusercontent.com/u/25211305?s=460&u=2b098bc7ef1029a993dbdaff348e6888f66a0d66&v=4',
        whatsapp: '981644171',
        bio: 'Professora de Matemática'
    }

    classValue = {
        subject: 7,
        cost: '60'
        // o proffy_id vira pelo banco de dados
    }

    // [{}] array, usado qdo tem mais de um objeto
    classScheduleValues = [
        // class_id vem pelo banco de dados
        {
            weekday: 1,
            time_from: 720,
            time_to: 1200
        },
        {
            weekday: 0,
            time_from: 220,
            time_to: 500
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // consultar dados
    const selectedProffys = await db.all("Select * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classe de um determinado prof e trazer junto os dados do prof (unir duas tabelas)
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horario q a pessoa trabalha e das 8 - 18
    // o horario do time_from (8) precisa ser menor ou igual ao horario solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 0
        AND class_schedule.time_from <= 220
        AND class_schedule.time_to > 220
    `)
    // console.log(selectClassesSchedules)


})