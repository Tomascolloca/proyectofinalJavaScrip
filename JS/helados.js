const helados = [
    {
      id: 1,
      titulo: "Torta helada de dulce de leche",
    
      precio: 1200,
    },
    {
      id: 2,
      titulo: "Barrita XL menta granizada",
   
      precio: 750,
    },
    {
      id: 3,
      titulo: "Volcan de Chocolate",
     
      precio: 1530,
    },
    {
      id: 4,
      titulo: "Almendrado Vainilla",
     
      precio: 1530,
    },
    {
      id: 5,
      titulo: "Copa de Frutilla JS",
   
      precio: 500,
    },
    {
      id: 6,
      titulo: "Tiramisu",
    
      precio: 2500,
    },
    {
      id: 7,
      titulo: "Cookies Helada",
     
      precio: 970,
    },
    {
      id: 8,
      titulo: "Limon",
    
      precio: 1000,
    },

    {
        id: 9,
        titulo: "Sambayon",
      
        precio: 1100,
      },
  ];
  
  //obtencion de elementos
const agregarBotones = document.querySelectorAll(".boton-item");
const carritoContenedor = document.querySelector(".carrito-items");
const carritoTotal = document.querySelector(".carritoprecio-total");

//carrito guardar
let carrito = [];
// Cargar productos guardados en el Session Storage
if (sessionStorage.getItem("carrito")) {
  carrito = JSON.parse(sessionStorage.getItem("carrito"));
  actualizarCarritoUI();
}
// Función para agregar un producto al carrito
function agregarItemAlCarrito(id) {
  const itemExistente = carrito.find((item) => item.id === id);
  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    const helado = helados.find((helado) => helado.id === id);
    carrito.push({ ...helado, cantidad: 1 });
  }
  actualizarCarritoUI();
  guardarCarritoEnSessionStorage();
}

// Función para eliminar un producto del carrito
function eliminarItemDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarritoUI();
  guardarCarritoEnSessionStorage();
}

//interfaz del carrito
function actualizarCarritoUI() {
  carritoContenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    const mensajeCarritoVacio = document.createElement("div");
    mensajeCarritoVacio.textContent = "El carrito está vacío";
    carritoContenedor.appendChild(mensajeCarritoVacio);
  } else {
    carrito.forEach((item) => {
      const carritoItem = document.createElement("div");
      carritoItem.classList.add("carrito-item");
      carritoItem.innerHTML = `
        <span class="carrito-item-titulo">${item.titulo}</span>
        <div class="selector-cantidad">
          <!-- Código SVG omitido para ahorrar espacio -->
        </div>
        <span class="carrito-item-precio">$${item.precio * item.cantidad}</span>
      `;

      carritoContenedor.appendChild(carritoItem);
      total += item.precio * item.cantidad;
    });

    carritoTotal.textContent = `$${total}`;
  }
}

// Session Storage
function guardarCarritoEnSessionStorage() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

//  eventos botones "Agregar al carrito"
agregarBotones.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    const id = helados[index].id;
    agregarItemAlCarrito(id);
  });
});

// Pagar
const botonPagar = document.querySelector(".btn-pagar");

// evento al "Pagar"
botonPagar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("No hay ninguna orden en el carrito");
  } else {
    alert("¡Pedido realizado con éxito!");
    carrito = [];
    guardarCarritoEnSessionStorage();
    actualizarCarritoUI();
    carritoTotal.textContent = "$0";
  }
});