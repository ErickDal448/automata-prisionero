document.querySelector('form').addEventListener('submit', function(event) {
    // Prevenir la recarga de la página
    event.preventDefault();

    // Obtener el valor del botón de opción seleccionado
    var selectedOption = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    var numDigits = parseInt(selectedOption.charAt(selectedOption.length - 1));

    // Generar todas las cadenas binarias posibles con esa longitud
    var numCombinations = Math.pow(2, numDigits);
    var binaryCombinations = [];
    for (var i = 0; i < numCombinations; i++) {
        var binaryString = i.toString(2);
        while (binaryString.length < numDigits) {
            binaryString = '0' + binaryString;
        }
        binaryCombinations.push(binaryString);
    }

    // Crear una lista ordenada para mostrar las combinaciones
    var ol = document.createElement('ol');
    ol.className = 'list-group list-group-numbered';

    // Agregar cada combinación como un elemento de la lista
    binaryCombinations.forEach(function(combination) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = combination;
        ol.appendChild(li);
    });

    // Limpiar el div de respuesta y agregar la lista ordenada
    var divRespuesta = document.querySelector('.divRespuesta');
    divRespuesta.innerHTML = '';
    divRespuesta.appendChild(ol);
});