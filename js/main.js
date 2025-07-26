// Activación del slider de registro (Usuarios / Empresas)
const slider = new Swiper('.mySlider', {
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false
  },
  speed: 1500,
  navigation: {
    nextEl: '.slider-principal-next',
    prevEl: '.slider-principal-prev'
  },
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  },
  on: {
    slideChangeTransitionStart: () => {
      document.querySelectorAll('.texto-btn').forEach(el => {
        el.classList.remove('animar-texto');
      });
    },
    slideChangeTransitionEnd: () => {
      const activeSlide = document.querySelector('.swiper-slide-active');
      const texto = activeSlide.querySelector('.texto-btn');
      if (texto) {
        texto.classList.add('animar-texto');
      }
    }
  }
});

//SLIDER DE MARCAS 1

const marcasSlider1 = new Swiper('.marcas-slider-1', {
  loop: true,
  slidesPerView: 6,
  slidesPerGroup: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.slider-logos-next-1',
    prevEl: '.slider-logos-prev-1'
  },
  breakpoints: {
    // A partir de 640px de ancho
    640: {
      slidesPerView: 6
    },
    // A partir de 768px de ancho
    768: {
      slidesPerView: 6
    },
    // A partir de 1024px de ancho (desktop)
    1024: {
      slidesPerView: 18
    }
  },
});

//SLIDER DE MARCAS 1

const marcasSlider2 = new Swiper('.marcas-slider-2', {
  loop: true,
  slidesPerView: 6,
  slidesPerGroup: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.slider-logos-next-2',
    prevEl: '.slider-logos-prev-2'
  },
  breakpoints: {
    // A partir de 640px de ancho
    640: {
      slidesPerView: 6
    },
    // A partir de 768px de ancho
    768: {
      slidesPerView: 6
    },
    // A partir de 1024px de ancho (desktop)
    1024: {
      slidesPerView: 18
    }
  },
});

// BUSCADOR

const sugerencias = ["Madrid", "Barcelona", "Valencia", "28001", "08001"];
const input = document.getElementById('termino');
const sugerenciasBox = document.getElementById('sugerencias');

input.addEventListener('input', () => {
  const valor = input.value.toLowerCase();
  sugerenciasBox.innerHTML = '';

  if (valor.length > 0) {
    const filtradas = sugerencias.filter(sug =>
      sug.toLowerCase().includes(valor)
    );

    filtradas.forEach(sug => {
      const li = document.createElement('li');
      li.textContent = sug;
      li.addEventListener('click', () => {
        input.value = sug;
        sugerenciasBox.innerHTML = '';
      });
      sugerenciasBox.appendChild(li);
    });
  }
});

//MURO DE EMPRESAS

let empresas = []; // aquí se guardarán los datos del JSON
let pagina = 0; // control del scroll infinito
const porPagina = 3; // cuántas empresas mostrar por carga

// Cargar empresas desde el archivo JSON
async function cargarEmpresas() {
  const res = await fetch('empresas.json'); // archivo en la raíz del proyecto
  const datos = await res.json();

  // Las nuevas empresas van primero (últimas agregadas al principio)
  empresas = datos.reverse();

  cargarMasEmpresas(); // mostrar las primeras
}

// Mostrar más empresas al hacer scroll
function cargarMasEmpresas() {
  const contenedor = document.getElementById('resultados-empresas');
  const inicio = pagina * porPagina;
  const fin = inicio + porPagina;
  const empresasPagina = empresas.slice(inicio, fin);

  empresasPagina.forEach(empresa => {
    const card = document.createElement('div');
    card.className = 'tarjeta-empresa';
    card.innerHTML = `
    <img src="assets/img/${empresa.logo}" alt="${empresa.nombre}">
    <div class="contenido-empresa">
        <h3>${empresa.nombre}</h3>
        <p><strong>Localidad:</strong> ${empresa.localidad}</p>
        <p><strong>CP:</strong> ${empresa.codigo_postal}</p>
        <p><strong>Categoría:</strong> ${empresa.categoria}</p>
    </div>
    `;
    contenedor.appendChild(card);
  });

  pagina++;
}

// Detectar scroll cerca del final para cargar más
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    cargarMasEmpresas();
  }
});

cargarEmpresas(); // primera carga







