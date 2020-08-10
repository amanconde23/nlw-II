// procurar o botao
// qdo clicar no botao, executar uma acao
document.querySelector('#add-time').addEventListener('click', checkIfTimeIsEmpty)
//qual acao?
function cloneField(){
    // duplicar campos. que campos? depois q pegar esse campo, executa acao de cloneNode(clonar nodulo - html)
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
    // pegar os campos limpar. q campos?
    const fields = newFieldContainer.querySelectorAll('input')
    // para cada input (fields), inserir valor vazio
    // for(i=0; i < fields.length; i++){
    //     fields[i].value = ""
    // }
    // ou
    fields.forEach(function(field){
        field.value = ""
    })
    // colocar no documento. onde? appendChild adiciona um filho ao pai (schedule-items -> adiciona um schedule-item)
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}

function checkIfTimeIsEmpty(){
    const fields = document.querySelector('input[type="time"]')
    if(fields.value == ""){
        alert ('Favor preencher um horário antes de adicionar um novo campo')
    }else{
        cloneField()
    }

}