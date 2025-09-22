(function() {
    function closeSection() {
        resetSectionVisibility();
        document.getElementById("short").classList.remove("hidden");
        document.getElementById("contact").classList.remove("hidden");
    }
    window.closeSection = closeSection;

    function resetSectionVisibility() {
        document.getElementById("short").classList.add("hidden");
        document.getElementById("work").classList.add("hidden");
        document.getElementById("contact").classList.add("hidden");
    }

    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove("hidden");
        }
    }

    document.body.addEventListener("click", function (e) {
        // show detail view
        if (e.target.classList.contains("ver-detalle")) {
            const caseId = e.target.getAttribute("data-case");
            const detalle = document.getElementById("detalle-" + caseId);

            if (detalle) {
                detalle.classList.remove("hidden");
                setTimeout(() => detalle.classList.add("visible"), 10);

                e.target.classList.add("hidden");
            }
        }

        // return to summary view
        if (e.target.classList.contains("cerrar-detalle")) {
            document.querySelectorAll(".detalle-caso.visible").forEach(el => {
                el.classList.remove("visible");
                setTimeout(() => el.classList.add("hidden"), 400);
            });

            document.querySelectorAll(".ver-detalle").forEach(btn => btn.classList.remove("hidden"));
        }
    });

    function assignWorkButton() {
        const workButtons = document.querySelectorAll('.work-button');
        workButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                resetSectionVisibility();
                showSection("work");
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Inicializa idioma desde localStorage
        const toggle = document.getElementById('toggle-language');
        const savedLang = localStorage.getItem('lang') || 'es';

        function switchLanguage(lang) {
            const spanishElements = document.querySelectorAll('[data-lang="spanish"]');
            const englishElements = document.querySelectorAll('[data-lang="english"]');
            const leftLabel = document.querySelector('.lang-left');
            const rightLabel = document.querySelector('.lang-right');

            const show = (elements) => {
                elements.forEach(el => el.classList.add('lang-visible'));
            };

            const hide = (elements) => {
                elements.forEach(el => {
                    el.classList.remove('lang-visible');
                    setTimeout(() => {
                        el.style.display = 'none';
                    }, 400);
                });
            };

            const unhide = (elements) => {
                elements.forEach(el => {
                    el.style.display = '';
                });
            };

            if (lang === 'es') {
                unhide(spanishElements);
                hide(englishElements);
                setTimeout(() => show(spanishElements), 50);
                localStorage.setItem('lang', 'es');
                leftLabel.style.opacity = '1';
                rightLabel.style.opacity = '0.3';
            } else {
                unhide(englishElements);
                hide(spanishElements);
                setTimeout(() => show(englishElements), 50);
                localStorage.setItem('lang', 'en');
                leftLabel.style.opacity = '0.3';
                rightLabel.style.opacity = '1';
            }
        }

        if (toggle) {
            toggle.checked = savedLang === 'en';
            switchLanguage(savedLang);
            assignWorkButton();
            toggle.addEventListener('change', function () {
                const newLang = this.checked ? 'en' : 'es';
                switchLanguage(newLang);
                setTimeout(assignWorkButton, 500);
            });
        }
    });
})();
