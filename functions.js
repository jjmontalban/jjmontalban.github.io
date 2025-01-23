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
        document.getElementById("profile").classList.add("hidden");
        document.getElementById("contact").classList.add("hidden");
    }

    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove("hidden");
        }
    }

    window.onload = function() {
        const workButton = document.getElementById("work-button");
        const profileButton = document.getElementById("profile-button");

        if (workButton) {
            workButton.addEventListener("click", () => {
                resetSectionVisibility();
                showSection("work");
            });
        }

        if (profileButton) {
            profileButton.addEventListener("click", () => {
                resetSectionVisibility();
                showSection("profile");
            });
        }

        document.getElementById('downloadCV').addEventListener('click', () => {
            const element = document.getElementById('pdf');
            const opt = {
                margin: [10, 10, 10, 10],
                filename: 'JJMontalbanResume.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 3, useCORS: true, backgroundColor: '#ffffff' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                const contactInfo = "Joaquín Jurado Montalban / (+34) 661 694 574 / jjmontalban@gmail.com";
                const pageWidth = pdf.internal.pageSize.getWidth();
                const xPosition = (pageWidth - pdf.getTextWidth(contactInfo)) / 2;
                pdf.text(contactInfo, xPosition, 7); 
            }).save();
        });
    };


    document.addEventListener('DOMContentLoaded', function () {
        VANTA.BIRDS({
            el: "html",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xffffff

        });
    }); 

    
})();
