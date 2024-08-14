(function() {
    let english, spanish;

    document.addEventListener('DOMContentLoaded', function () {
        // Inicializa las variables con los elementos correspondientes a cada idioma
        english = document.querySelectorAll("[data-lang='english']");
        spanish = document.querySelectorAll("[data-lang='spanish']");
        // Selecciona el checkbox para el cambio de idioma
        const checkbox = document.querySelector('input[type="checkbox"]');  
        toggleLanguage(checkbox.checked ? 'english' : 'spanish');
        // Añade un listener para el cambio de idioma
        checkbox.addEventListener('change', function () {
            toggleLanguage(checkbox.checked ? 'english' : 'spanish');
        });
    });

    // Función para alternar el idioma
    function toggleLanguage(language) {
        applyFadeInAnimation();
        english.forEach(el => {
            el.classList.toggle('hidden', language !== 'english');
            el.setAttribute('aria-hidden', language !== 'english');
        });
        spanish.forEach(el => {
            el.classList.toggle('hidden', language !== 'spanish');
            el.setAttribute('aria-hidden', language !== 'spanish');
        });
    }

    // Función para aplicar la animación de fade-in
    function applyFadeInAnimation() {
        const elements = document.querySelectorAll("#short, #work, #contact, #profile, [data-lang='english'], [data-lang='spanish']");
        elements.forEach(el => {
            el.classList.remove("fade-in");
            void el.offsetWidth;
            if (!el.classList.contains("hidden")) {
                el.classList.add("fade-in");
            }
        });
    }

    // Delegación de eventos para los botones
    document.querySelector(".buttons").addEventListener("click", (event) => {
        const targetButton = event.target.closest('button');
        if (targetButton) {
            const sections = {
                "work-button": "work",
                "contact-button": "contact",
                "profile-button": "profile"
            };
            const targetSection = sections[targetButton.id];

            if (targetSection) {
                resetSectionVisibility();
                moveButtonsUp();
                showSection(targetSection);
            }
        }
    });

    // Función para ocultar todas las secciones
    function resetSectionVisibility() {
        document.getElementById("short").classList.add("hidden");
        document.getElementById("work").classList.add("hidden");
        document.getElementById("contact").classList.add("hidden");
        document.getElementById("contact").classList.add("hidden");
        document.getElementById("profile").classList.add("hidden");
    }

    // Función para mostrar una sección específica con animación
    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.classList.remove("hidden");
        section.classList.add("fade-in");
    }

    // Función para mover los botones hacia arriba
    function moveButtonsUp() {
        const buttonsSection = document.querySelector(".buttons");
        buttonsSection.classList.add("moved-up");
    }

    // Rotación de texto para los íconos sociales
    const TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
        const that = this;

        this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = this.isDeleting ? 150 : 300;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => that.tick(), delta);
    };

    window.onload = function() {
        const elements = document.getElementsByClassName('txt-rotate');
        for (let i = 0; i < elements.length; i++) {
            const toRotate = elements[i].getAttribute('data-rotate');
            const period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
    };

    // Genera el PDF
    document.getElementById('downloadCV').addEventListener('click', () => {
        const element = document.getElementById('pdf');
        const opt = {
            margin: [10, 10, 10, 10],
            filename: 'JJMontalbanResume.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { 
                scale: 3, 
                useCORS: true, 
                backgroundColor: '#ffffff'
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
            pdf.setPage(1);  
            // Crear el texto de contacto
            const contactInfo = "Joaquín Jurado Montalban / (+34) 661 694 574 / jjmontalban@gmail.com";
    
            const pageWidth = pdf.internal.pageSize.getWidth();
            const textWidth = pdf.getTextWidth(contactInfo);
            const xPosition = (pageWidth - textWidth) / 2;
    
            pdf.text(contactInfo, xPosition, 7); 
    
        }).save();
    });
    
    
    
    
    
    
    

})();
