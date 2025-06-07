const db = new Dexie ("personasDB");
db.version(1).stores({
    personas: "++id, nombre, apellido, anioNacimiento" 
});

document.getElementById("guardar").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const anioNacimiento = parseInt(document.getElementById("anioNacimiento").value);

    if (!nombre || !apellido || !anioNacimiento) {
        alert("¡Todos los campos son obligatorios!");
        return;
    }
    await db.personas.add({ nombre, apellido, anioNacimiento });
    alert("¡Persona registrada correctamente!");
    mostrarPersonas();
});
function calcularEdad(anioNacimiento) {
    const anioActual = new Date().getFullYear();
    return anioActual - anioNacimiento;
}

async function mostrarPersonas() {
    const personas = await db.personas.toArray();
    const listaHTML = personas.map(persona => `
        <p>
            ${persona.nombre} ${persona.apellido} - 
            Edad: ${calcularEdad(persona.anioNacimiento)} años
        </p>
    `).join("");
    document.getElementById("listaPersonas").innerHTML = listaHTML;
}

mostrarPersonas();