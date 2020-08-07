// importar modulo
const Database = require('sqlite-async')

function execute(db){
    // .exec funcionalidade ja pronta, q executa a query
    // criar tabelas do db
    // proffy_id INTEGER eh a chave estrangeira, um prof pode ter mais de uma classe
    // class_id INTEGER uma classe pode ter mais de um horario (chave estrangeira)
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );   
        
        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );
        
        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)

}

// abrir banco de dados (onde)
// abre o db, entao faca (funcao execute)
// module.exports exporta (possibilitando usar em outros arquivos com require)
// o open demora um pouco, por isso usa then, só depois do open ele faz o execute
// deve fazer a exportacao para usar o database
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)
