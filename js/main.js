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

//SLIDER DE MARCAS

const logoSlider = new Swiper('.swiperLogos', {
  loop: true,
  slidesPerView: 6,
  slidesPerGroup: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.slider-logos-next',
    prevEl: '.slider-logos-prev'
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






