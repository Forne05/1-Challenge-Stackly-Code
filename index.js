
function filtrar() { 
    const valorInput = document.getElementById("input-busqueda").value;
    const BASE_URL = 'https://quote-garden.herokuapp.com/api/v3/quotes?author=' + valorInput;;
    
    obtenerCitas(BASE_URL);
}

function aleatorio() { 
    const BASE_URL = 'https://quote-garden.herokuapp.com/api/v3/quotes/random';
    document.getElementById("input-busqueda").value = '';

    obtenerCitas(BASE_URL);
}


function obtenerCitas(apiURL) { 
  
  const  url = apiURL || 'https://quote-garden.herokuapp.com/api/v3/quotes';
  
  cargando(true);

  fetch(url)
  .then(respuesta => respuesta.json())
  .then(datos => {
    
    pintarCitas(datos.data); 

  }).catch(() => alert('Ocurrio un error al obtener informacion'));
}

function pintarCitas(citas) { 
   
    let plantilla = '';
    const contenedorElement = document.getElementById("contenedor-citas");
    
    contenedorElement.innerHTML = '';
    
    if(citas && citas.length) {

        contenedorElement.classList.remove('una-columna');
        citas.map((cita)=> { 
            
            plantilla += "<div class='citas'>" 
                            +
                            "<button class='boton'>" + cita.quoteGenre + "</button>"
                            +
                            "<div class='contenido-citas'>"
                            + 
                            "<p>"+ cita.quoteText +"</p>"
                            +
                            "</div>"
                            +
                        "</div>";
        });
    } else {
        contenedorElement.classList.add('una-columna');
        plantilla = '<p>No se encontraron resultados</p>';
    }
    
    contenedorElement.innerHTML = plantilla;
    
    cargando(false);
}

function cargando(mostrar) { 
    document.getElementById('cargando').style.display = mostrar ? 'block' : 'none';
}