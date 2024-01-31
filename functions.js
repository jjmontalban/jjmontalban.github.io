document.getElementById("work-button").addEventListener("click", () => {
    document.getElementById("short").classList.add("hidden");
    document.getElementById("contact").classList.add("hidden");
    document.getElementById("work").classList.remove("hidden");
})

document.getElementById("contact-button").addEventListener("click", () => {
    document.getElementById("work").classList.add("hidden");
    document.getElementById("short").classList.add("hidden");
    document.getElementById("contact").classList.remove("hidden");
})

// Social icons

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 5) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 3 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};



/* TOGGLE SWITCH */

let english = document.getElementsByName("english");
let spanish = document.getElementsByName("spanish");

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
        showEnglish();
    } else {
        showSpanish();
    }

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            showEnglish();
        } else {
            showSpanish();
        }
    });

    function showEnglish() {
        for (let i = 0; i < english.length; i++) {
            english[i].classList.remove('hidden');
        }
        for (let i = 0; i < spanish.length; i++) {
            spanish[i].classList.add('hidden');
        }
    }

    function showSpanish() {
        for (let i = 0; i < spanish.length; i++) {
            spanish[i].classList.remove('hidden');
        }
        for (let i = 0; i < english.length; i++) {
            english[i].classList.add('hidden');
        }
    }
});
