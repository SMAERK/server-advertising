
export const removeCharacter = (text: string) => {
    text.replace(/\n/g, "");
    return eliminarSaltosDeLinea(text)
}


function eliminarSaltosDeLinea(texto: string): string {
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === "\\" && texto[i + 1] === "n") {
            resultado += " ";
            i++; // Saltar al siguiente carácter después de "n"
        } else {
            resultado += texto[i];
        }
    }
    return resultado;
}