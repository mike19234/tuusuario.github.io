document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(carouselTrack.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentSlideIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width; // Obtiene el ancho de un slide

    // Función para posicionar los slides
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // Función para mover el track a un slide específico
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('active');
        targetSlide.classList.add('active');
    };

    // Función para actualizar los puntos (dots)
    const updateDots = (currentIndex) => {
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Generar puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.slideIndex = index;
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            moveToSlide(carouselTrack, slides[currentSlideIndex], slides[currentSlideIndex]);
            updateDots(currentSlideIndex);
        });
    });

    // Inicializar el primer slide y dot como activo
    slides[0].classList.add('active');
    updateDots(0);

    // Navegación con botón Siguiente
    nextButton.addEventListener('click', () => {
        const currentSlide = carouselTrack.querySelector('.carousel-slide.active');
        let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlide = slides[nextSlideIndex];

        moveToSlide(carouselTrack, currentSlide, nextSlide);
        currentSlideIndex = nextSlideIndex;
        updateDots(currentSlideIndex);
    });

    // Navegación con botón Anterior
    prevButton.addEventListener('click', () => {
        const currentSlide = carouselTrack.querySelector('.carousel-slide.active');
        let prevSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Asegura que no sea negativo
        const prevSlide = slides[prevSlideIndex];

        moveToSlide(carouselTrack, currentSlide, prevSlide);
        currentSlideIndex = prevSlideIndex;
        updateDots(currentSlideIndex);
    });

    // Opcional: Carrusel automático
    let autoPlayInterval;
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            nextButton.click(); // Simula un clic en el botón siguiente
        }, 5000); // Cambia cada 5 segundos
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Pausar auto-play al pasar el ratón por encima
    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);

    // Iniciar auto-play al cargar
    startAutoPlay();

    // Actualizar el ancho del slide al redimensionar la ventana
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        // Reposicionar todos los slides con el nuevo ancho
        slides.forEach((slide, index) => {
            slide.style.left = newSlideWidth * index + 'px';
        });
        // Mover al slide actual con el nuevo ancho
        carouselTrack.style.transform = 'translateX(-' + slides[currentSlideIndex].style.left + ')';
    });
});