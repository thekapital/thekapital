jQuery(document).ready(function($) {

    'use strict';

    /* --- 1. SITE EFFECTS (SLIDER, MENU, SCROLL) --- */
    
    var owl = $("#owl-testimonials");
    owl.owlCarousel({
        pagination : true,
        paginationNumbers: false,
        autoPlay: 6000,
        items : 1,
        itemsDesktop : [1000,1],
        itemsDesktopSmall : [900,1],
        itemsTablet: [600,1],
        itemsMobile : false
    });

    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'});

    $(window).scroll(function () {
        var st = $(this).scrollTop();
        top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
        if($(window).scrollTop() > 100) {
            $(".header").addClass("active");
        } else {
            $(".header").removeClass("active");
        }
    });

    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e){
        e.preventDefault();
        var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
    });

    $(".pop-button").click(function () { $(".pop").fadeIn(300); });
    $(".pop > span").click(function () { $(".pop").fadeOut(300); });

    $('.projects-holder').mixitup({
        effects: ['fade','grayscale'],
        easing: 'snap',
        transitionSpeed: 400
    });

    /* --- 2. THE KAPITAL FINANCIAL CALCULATORS ENGINE --- */

    // Helper: Virgülleri temizle ve sayıya çevir
    function getVal(id) {
        const el = document.getElementById(id);
        if (!el) return 0;
        return parseFloat(el.value.replace(/,/g, '')) || 0;
    }

    // Helper: Inputlara binlik ayırıcı ekle (Yazarken çalışır)
    function handleFormatting(e) {
        let val = e.target.value.replace(/[^0-9]/g, "");
        if (val) {
            e.target.value = Number(val).toLocaleString('en-AU');
        }
        runAllCalculations(); // Format değişince hesapla
    }

    // Ana Hesaplama Tetikleyicisi
    function runAllCalculations() {
        calculateMortgage();
        calculateStampDuty();
        calculateInvestment(); // Eksik olan fonksiyon geri geldi
        calculateBorrowing();
    }

    // --- CALC 1: MORTGAGE ---
    function calculateMortgage() {
        const P = getVal('loanAmount');
        const rInput = document.getElementById('interestRate');
        if(!rInput) return;
        const annualR = parseFloat(rInput.value) / 100;
        const years = parseFloat(document.getElementById('loanTerm').value);
        const freq = parseFloat(document.getElementById('frequency').value);

        if (P > 0 && annualR > 0) {
            const r = annualR / freq; // Dönemlik faiz
            const n = years * freq;   // Toplam taksit sayısı
            const m = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const total = m * n;

            const dPayment = document.getElementById('displayPayment');
            if(dPayment) dPayment.innerText = "$" + Math.round(m).toLocaleString('en-AU');
            
            if(document.getElementById('totalInterest')) {
                document.getElementById('totalInterest').innerText = "$" + Math.round(total - P).toLocaleString('en-AU');
                document.getElementById('totalPayable').innerText = "$" + Math.round(total).toLocaleString('en-AU');
            }
        }
    }

    // --- CALC 2: STAMP DUTY (NSW) ---
    function calculateStampDuty() {
        const val = getVal('propertyValue');
        const buyerElem = document.getElementById('buyerType');
        if(!buyerElem) return;
        const type = buyerElem.value;
        let duty = 0;

        // NSW Standard Rates
        if (val <= 17000) duty = (val / 100) * 1.25;
        else if (val <= 37000) duty = 213 + ((val - 17000) / 100) * 1.5;
        else if (val <= 94000) duty = 513 + ((val - 37000) / 100) * 1.75;
        else if (val <= 354000) duty = 1510 + ((val - 94000) / 100) * 3.5;
        else if (val <= 1182000) duty = 10610 + ((val - 354000) / 100) * 4.5;
        else if (val <= 3546000) duty = 47870 + ((val - 1182000) / 100) * 5.5;
        else duty = 177890 + ((val - 3546000) / 100) * 7.0;

        // Exceptions
        if (type === 'firstHome') {
            if (val <= 800000) {
                duty = 0;
                document.getElementById('fhbasNote').innerText = "FHBAS Full Exemption Applied.";
            } else if (val <= 1000000) {
                duty = duty * ((val - 800000) / 200000);
                document.getElementById('fhbasNote').innerText = "FHBAS Partial Concession Applied.";
            } else {
                document.getElementById('fhbasNote').innerText = "Over FHBAS limit. Standard rates apply.";
            }
        } else if (type === 'foreign') {
            duty += (val * 0.08);
            document.getElementById('fhbasNote').innerText = "Includes 8% Foreign Surcharge.";
        } else {
            document.getElementById('fhbasNote').innerText = "*Standard NSW residential rates apply.";
        }

        const dDuty = document.getElementById('displayDuty');
        if(dDuty) dDuty.innerText = "$" + Math.round(duty).toLocaleString('en-AU');
    }

    // --- CALC 3: INVESTMENT GROWTH (EKSİK OLAN) ---
    function calculateInvestment() {
        const initial = getVal('initialDeposit');
        const monthly = getVal('contributionAmount');
        const freqElem = document.getElementById('contributionFreq');
        const yearElem = document.getElementById('invYears');
        const rateElem = document.getElementById('invRate');

        if(!freqElem || !yearElem || !rateElem) return;

        const freq = parseFloat(freqElem.value);
        const years = parseFloat(yearElem.value);
        const r = (parseFloat(rateElem.value) / 100) / freq;
        const n = years * freq;

        let fv = initial * Math.pow(1 + r, n); // Ana para büyümesi
        // Annuity formulü (Düzenli eklemeler)
        if (r > 0) {
            fv += monthly * ((Math.pow(1 + r, n) - 1) / r);
        } else {
            fv += monthly * n;
        }

        const totalInvested = initial + (monthly * n);
        const growth = fv - totalInvested;

        const dFV = document.getElementById('futureValue');
        if(dFV) {
            dFV.innerText = "$" + Math.round(fv).toLocaleString('en-AU');
            document.getElementById('totalPrincipal').innerText = "$" + Math.round(totalInvested).toLocaleString('en-AU');
            document.getElementById('totalGrowth').innerText = "$" + Math.round(growth).toLocaleString('en-AU');
        }
    }

    // --- CALC 4: BORROWING CAPACITY ---
    function calculateBorrowing() {
        const income = getVal('grossIncome');
        const other = getVal('otherIncome');
        const exp = getVal('monthlyExpenses');
        const debts = getVal('monthlyDebts');
        
        const depElem = document.getElementById('dependents');
        const rateElem = document.getElementById('bcRate');
        if(!depElem || !rateElem) return;

        const dependents = parseInt(depElem.value);
        const baseRate = parseFloat(rateElem.value);

        // Logic
        const stressRate = (baseRate + 3.0) / 100 / 12; // Buffer
        const termMonths = 360; // 30 Yıl
        const totalIncome = (income + other) * 0.75 / 12; // Net aylık (Vergi sonrası tahmini)
        const depCost = dependents * 600;
        const surplus = totalIncome - (exp + debts + depCost);

        let cap = 0;
        if (surplus > 100) {
            cap = surplus / ((stressRate * Math.pow(1 + stressRate, termMonths)) / (Math.pow(1 + stressRate, termMonths) - 1));
        }

        // DTI Limit (Gelirin 7 katı)
        const maxCap = (income + other) * 7;
        const finalCap = Math.min(cap, maxCap);

        const dCap = document.getElementById('displayCapacity');
        if(dCap) dCap.innerText = finalCap > 0 ? "$" + Math.round(finalCap).toLocaleString('en-AU') : "$0";
    }

    // --- 3. INIT & LISTENERS ---
    
    // Format inputları bağla
    var formatInputs = document.querySelectorAll('.format-input');
    for (var i = 0; i < formatInputs.length; i++) {
        formatInputs[i].addEventListener('input', handleFormatting);
    }

    // Tüm input değişikliklerini dinle
    var allInputs = document.querySelectorAll('input, select');
    for (var j = 0; j < allInputs.length; j++) {
        allInputs[j].addEventListener('change', runAllCalculations);
        allInputs[j].addEventListener('input', runAllCalculations);
    }

    // İlk açılış
    runAllCalculations();

});