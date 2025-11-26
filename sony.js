const API = "http://localhost:3000/api/sony";

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarEstadisticas();
});

// ============================
// VARIABLES
// ============================
const contenedor = document.getElementById("contenedor");
const formAgregar = document.getElementById("formSony");
const formEditar = document.getElementById("formEditar");
const buscadorInput = document.getElementById("buscador");
const categoriasContainer = document.querySelector(".categorias");
let productos = [];
let editID = "";

// ============================
// CARGAR PRODUCTOS
// ============================
async function cargarProductos() {
    contenedor.innerHTML = "";
    try {
        const res = await fetch(API);
        const data = await res.json();
        productos = data.productos;

        if (productos.length === 0) {
            contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        productos.forEach(p => {
            contenedor.innerHTML += `
                <div class="card">
                    <img src="${p.imagen}" alt="${p.producto}">
                    <h3>${p.producto}</h3>
                    <p><strong>Precio:</strong> $${p.precio}</p>
                    <p><strong>Stock:</strong> ${p.stock}</p>
                    <div class="card-buttons">
                        <button class="btn-editar" onclick="abrirModal(
                            '${p._id}',
                            '${p.producto}',
                            ${p.precio},
                            ${p.stock},
                            '${p.imagen}'
                        )">Editar</button>
                        <button class="btn-eliminar" onclick="eliminarProducto('${p._id}')">Eliminar</button>
                    </div>
                </div>
            `;
        });

        actualizarEstadisticas();
        cargarCategorias();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// ============================
// AGREGAR PRODUCTO
// ============================
formAgregar.addEventListener("submit", async e => {
    e.preventDefault();
    const nuevo = {
        producto: document.getElementById("producto").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        imagen: document.getElementById("imagen").value
    };

    try {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo)
        });
        formAgregar.reset();
        cargarProductos();
    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
});

// ============================
// MODAL EDICIÓN
// ============================
function abrirModal(id, producto, precio, stock, imagen) {
    document.getElementById("modal").style.display = "flex";
    editID = id;
    document.getElementById("edit-producto").value = producto;
    document.getElementById("edit-precio").value = precio;
    document.getElementById("edit-stock").value = stock;
    document.getElementById("edit-imagen").value = imagen;
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

// ============================
// EDITAR PRODUCTO
// ============================
formEditar.addEventListener("submit", async e => {
    e.preventDefault();
    const actualizado = {
        producto: document.getElementById("edit-producto").value,
        precio: Number(document.getElementById("edit-precio").value),
        stock: Number(document.getElementById("edit-stock").value),
        imagen: document.getElementById("edit-imagen").value
    };

    try {
        await fetch(`${API}/${editID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actualizado)
        });
        cerrarModal();
        cargarProductos();
    } catch (error) {
        console.error("Error al editar producto:", error);
    }
});

// ============================
// ELIMINAR PRODUCTO
// ============================
async function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto definitivamente?")) return;

    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        cargarProductos();
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}

// ============================
// BUSCADOR POR NOMBRE
// ============================
const buscador = document.getElementById("buscador");
buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();
    const cards = contenedor.querySelectorAll(".card");
    cards.forEach(card => {
        const nombre = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = nombre.includes(filtro) ? "flex" : "none";
    });
});

// ============================
// CATEGORÍAS
// ============================
function cargarCategorias() {
    if (!categoriasContainer) return;

    const categoriasUnicas = [...new Set(productos.map(p => p.producto))];
    categoriasContainer.innerHTML = "";

    categoriasUnicas.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.classList.add("btn-categoria");
        btn.addEventListener("click", () => filtrarCategoria(cat));
        categoriasContainer.appendChild(btn);
    });
}

function filtrarCategoria(categoria) {
    const cards = contenedor.querySelectorAll(".card");
    cards.forEach(card => {
        const nombre = card.querySelector("h3").textContent;
        card.style.display = nombre === categoria ? "flex" : "none";
    });
}

// ============================
// ESTADÍSTICAS RÁPIDAS
// ============================
function actualizarEstadisticas() {
    const total = productos.length;
    const enStock = productos.filter(p => p.stock > 0).length;
    const sinStock = total - enStock;

    const stats = document.querySelector(".stats-container");
    if (!stats) return;

    stats.innerHTML = `
        <div class="stat">
            <h3>${total}</h3>
            <p>Total de Productos</p>
        </div>
        <div class="stat">
            <h3>${enStock}</h3>
            <p>En Stock</p>
        </div>
        <div class="stat">
            <h3>${sinStock}</h3>
            <p>Sin Stock</p>
        </div>
    `;
}
