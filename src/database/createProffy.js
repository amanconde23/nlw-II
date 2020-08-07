// na funcao, precisa ter todas essas coisas: db, e  {proffyValue, ...}
module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    // inserir dados na tabela proffys
    // aguarda a execução do db (nao precisa mais do then)
    // o js executa em linha, portanto, aguarde exec de uma linha para seguir para a prox
    // await so consegue usar em uma funcao q tiver na frente o async
    // ${proffyValue.name}, variavel
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    const class_id = insertedClass.lastID

    // inserir dados na tabela class_schedule
    // map -> retorna um array com qtos dados tiverem [??, ??, ...]
    // como se fosse um for (insert into class_schedule(){}), (insert into class_schedule(){}), (insert into class_schedule(){}), .....
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })
    
    // aqui executa todos os db.runs() das class_schedules
    // promise.all retorna um array de mtas promessas
    await Promise.all(insertedAllClassScheduleValues)
}