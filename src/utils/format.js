// popular page study de forma dinamica
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

// transformar os assuntos em texto
function getSubject(subjectNumber){
    // subtrai pq o primeiro elemento é zero, + garante q é um numero
    const position = +subjectNumber - 1
    return subjects[position]
}

// converter horas em minutos
function convertHoursToMinutes(time){
    // [hour, minutes] forma de declarar duas variaveis
    const [hour, minutes] = time.split(":")
    // Number garante q retorna um numero
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}