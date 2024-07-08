const tareaInput = document.querySelector("#nuevaTarea"); //textbox
const btnAgregar = document.querySelector("#agregarTarea");//boton
const listaDeTareas = document.querySelector("#listaTareas"); //tareas

const cuentaTareas = document.querySelector("#cuentaTareas");
const tareasRealizadas=document.querySelector("#tareasRealizadas");

const tareas = []
let indiceArreglo = 0; //indice de arreglo
let cuentaRealizadas=0; //Almacena número de elementos con el valor "realizada=true"

btnAgregar.addEventListener("click", () => {
                                            const tarea = tareaInput.value;
                                            if (tarea.trim() !== "") {
                                                tareas.push(
                                                                {id: indiceArreglo
                                                                , tarea: tarea
                                                                , realizada:false //Campo estado completado o realizado
                                                                }
                                                            )
                                                tareaInput.value = ""
                                                renderizarTareas();
                                            }else {
                                              alert("Debe ingresar nombre de tarea distinto de vacio")
                                            }
                                            });
const eliminarTarea = function (id){
        const index = tareas.findIndex((ele) => ele.id == id);
        tareas.splice(index, 1);
        renderizarTareas();
}

const incrementarNumero = function (id) {
    let checkbox = document.querySelector("#check"+id);
    const tareaEncontrada = tareas.find( tarea => tarea.id === id) //buscar el ID en el arreglo

    tareaEncontrada.realizada = checkbox.checked;
    actualizarTotalesTareas();
}

const actualizarTotalesTareas = function (){
    //total de tareas
    cuentaTareas.innerHTML = `Total: <strong>${tareas.length}</strong>`;
    indiceArreglo++;

    //actualizar tareas realizadas por filtro=true
    const tareasFiltradas = tareas.filter(
    (tarea) => tarea.realizada === true
    );
    tareasRealizadas.innerHTML = `Realizadas: <strong>${tareasFiltradas.length}</strong>`;
    cuentaRealizadas=tareasFiltradas.length;
}

const renderizarTareas = function (){
    let html = ""
    for (let tarea of tareas) {
    html += `<tr>
                <td>${tarea.id}</td>
                <td>${tarea.tarea}</td>
                <td> <input type="checkbox" id="check${tarea.id}" ${(tarea.realizada) ? 'checked' :'unchecked'} onclick="incrementarNumero(${tarea.id})"> </td>
                <td><button class="cls-button-transparente cls-eliminar-rojo" onclick="eliminarTarea(${tarea.id})">X</button></td>
            </tr>`
    }
    listaDeTareas.innerHTML = html;
    actualizarTotalesTareas();
}

const cargaInicialTareas = function (){
  let elementoTarea = {
                        id: 16
                        ,tarea: 'Hacer mercado'
                        ,realizada:true //Campo estado completado o realizado
                      }
  tareas.push(elementoTarea);

  elementoTarea =     {
                        id: 60
                        ,tarea: 'Estudiar para la prueba'
                        ,realizada:false //Campo estado completado o realizado
                      }
  tareas.push(elementoTarea);

  elementoTarea =     {
                        id: 24
                        ,tarea: 'Sacar a pasear a Tobby'
                        ,realizada:false //Campo estado completado o realizado
                      }
  tareas.push(elementoTarea);
  renderizarTareas();
}

cargaInicialTareas();