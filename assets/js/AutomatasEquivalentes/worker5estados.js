self.onmessage = function (event) {
  if (event.data === "start") {
    let automatas = [];
    // Aquí iría tu código para generar los autómatas...
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
          for (let l = 0; l < 2; l++) {
            for (let m = 0; m < 5; m++) {
              for (let n = 0; n < 5; n++) {
                for (let o = 0; o < 2; o++) {
                  for (let p = 0; p < 5; p++) {
                    for (let q = 0; q < 5; q++) {
                      for (let r = 0; r < 2; r++) {
                        for (let s = 0; s < 5; s++) {
                          for (let t = 0; t < 5; t++) {
                            for (let u = 0; u < 2; u++) {
                              for (let v = 0; v < 5; v++) {
                                for (let w = 0; w < 5; w++) {
                                  let automata1 = [i, j, k].join("");
                                  let automata2 = [l, m, n].join("");
                                  let automata3 = [o, p, q].join("");
                                  let automata4 = [r, s, t].join("");
                                  let automata5 = [u, v, w].join("");

                                  // Filtro para evitar autómatas con el mismo valor en el primer dígito de cada tercia
                                  if (
                                    automata1[0] === automata2[0] &&
                                    automata2[0] === automata3[0] &&
                                    automata3[0] === automata4[0] &&
                                    automata4[0] === automata5[0]
                                  ) {
                                    continue;
                                  }

                                  // Filtro para evitar autómatas donde todos los valores son 0 o 1
                                  let allZero = (
                                    automata1 +
                                    automata2 +
                                    automata3 +
                                    automata4 +
                                    automata5
                                  )
                                    .split("")
                                    .every((val) => val === "0");
                                  let allOne = (
                                    automata1 +
                                    automata2 +
                                    automata3 +
                                    automata4 +
                                    automata5
                                  )
                                    .split("")
                                    .every((val) => val === "1");
                                  if (allZero || allOne) {
                                    continue;
                                  }

                                  // Agrega el autómata a la lista de autómatas
                                  let automata = [
                                    automata1,
                                    automata2,
                                    automata3,
                                    automata4,
                                    automata5,
                                  ].join("");
                                  automatas.push(automata);
                                  // Si se han generado un cierto número de autómatas, envía un mensaje de vuelta al hilo principal
                                  if (automatas.length % 10000 === 0) {
                                    self.postMessage(automatas);
                                    // Limpia la lista de autómatas para liberar memoria
                                    automatas = [];
                                  }
                                }
                              }
                            }
                            // Envía cualquier autómata restante de vuelta al hilo principal
                            if (automatas.length > 0) {
                              self.postMessage(automatas);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Cuando termines de generar los autómatas, envía un mensaje de vuelta al hilo principal
  self.postMessage(automatas);
};
