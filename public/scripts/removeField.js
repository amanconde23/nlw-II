document.querySelector('#remove-time').addEventListener('click', removeField)

function removeField(){
    const removeItem = document.querySelector(".schedule-item")
    document.querySelector("#schedule-items").remove(removeItem)
}