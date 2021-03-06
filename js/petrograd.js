window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");


    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe)

    document.querySelector(".filterknap_vegetar").addEventListener("click", filtrerVegetar);

    document.querySelector(".filterknap_udsolgt").addEventListener("click", filtrerUdsolgt);

    document.querySelector(".filterknap_alkohol").addEventListener("click", filtrerAlkohol);

    document.querySelector(".filterknap_tilbud").addEventListener("click", filtrerTilbud);

}

function filtrerVegetar(event) {

    var liste = document.querySelectorAll(".produkt:not(.vegetar)");

    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault();

}

function filtrerTilbud(event) {

    var liste = document.querySelectorAll(".produkt:not(.rabatsats)");

    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault();

}

function filtrerAlkohol(event) {

    var liste = document.querySelectorAll(".produkt:not(.alkoholprocent)");

    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault();

}

function filtrerUdsolgt(event) {

    var liste = document.querySelectorAll(".produkt:not(.udsolgt)");

    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault();

}

function visProduktListe(listen) {
    console.log(listen);


    //    listen = listen.filter(produkt => !produkt.udsolgt);

    listen.forEach(visProdukt);

}

function visProdukt(produkt) {

    console.log(produkt);
    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "img/imgs/small/" + produkt.billede + "-sm.jpg";

    if (produkt.udsolgt == false) {

        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }


    if (produkt.udsolgt == true || produkt.rabatsats == 0) {

        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }


    if (produkt.vegetar == true) {
        klon.querySelector(".produkt").classList.add("vegetar");
    }
    if (produkt.alkoholprocent > 5) {
        klon.querySelector(".produkt").classList.add("alkoholprocent");

    }
    if (produkt.udsolgt == true) {
        klon.querySelector(".produkt").classList.add("udsolgt");

    }
    if (produkt.rabatsats > 19) {
        klon.querySelector(".produkt").classList.add("rabatsats");
    }

    klon.querySelector(".modalknap").dataset.produkt = produkt.id;

    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik);

    // append klon til .produkt_liste

    if (produkt.kategori == "forretter") {
        document.querySelector(".forretliste").appendChild(klon);
    } else if (produkt.kategori == "hovedretter") {
        document.querySelector(".hovedretliste").appendChild(klon);
    } else if (produkt.kategori == "desserter") {
        document.querySelector(".dessertliste").appendChild(klon);
    } else if (produkt.kategori == "drikkevarer") {
        document.querySelector(".drikkevarerliste").appendChild(klon);
    } else if (produkt.kategori == "sideorders") {
        document.querySelector(".sideordersliste").appendChild(klon);
    }

}

function modalKnapKlik(event) {
    console.log("knapklik", event);

    // find det produkt id, hvis knap der blev trykket på
    var produktId = event.target.dataset.produkt;
    console.log("Klik på produkt: ", produktId);

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {
        id: produktId
    }, visModalProdukt);
}

function visModalProdukt(produkt) {
    console.log("vis modal for ", produkt);

    // find modal_template - klon den
    var klon = document.querySelector("#modal_template").content.cloneNode(true);

    // put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "img/imgs/medium/" + produkt.billede + "-md.jpg";

    if (produkt.udsolgt == false) {

        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {

        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    klon.querySelector(".data_langbeskrivelse").innerHTML = produkt.langbeskrivelse;

    if (produkt.oprindelsesregion == null) {

        var oprindelsetekst = klon.querySelector(".oprindelsetekst");
        oprindelsetekst.parentNode.removeChild(oprindelsetekst);
    } else {
        var oprindelsetekst = klon.querySelector(".oprindelsetekst");
        klon.querySelector(".data_oprindelse").innerHTML = produkt.oprindelsesregion;
    }

    klon.querySelector(".data_oprindelse").innerHTML = produkt.oprindelsesregion;

    if (produkt.allergener == false) {

        var allergenertekst = klon.querySelector(".allergenertekst");
        allergenertekst.parentNode.removeChild(allergenertekst);
    } else {
        var allergenertekst = klon.querySelector(".allergenertekst");
        klon.querySelector(".data_allergener").innerHTML = produkt.allergener;
    }

    if (produkt.vegetar == false) {

        var vegetartekst = klon.querySelector(".vegetartekst");
        vegetartekst.parentNode.removeChild(vegetartekst);
    }

    if (produkt.alkoholprocent == false) {

        var alkoholtekst = klon.querySelector(".alkoholtekst");
        alkoholtekst.parentNode.removeChild(alkoholtekst);
    } else {
        var alkoholtekst = klon.querySelector(".alkoholtekst");
        klon.querySelector(".data_alkohol").innerHTML = produkt.alkoholprocent;
    }


    // sletter det der stod i modal-content

    document.querySelector(".modal-content").innerHTML = "";

    // append klonen til modal-content

    document.querySelector(".modal-content").appendChild(klon);

}



// Scrollknap til toppen

var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

//hide or show the "back to top" link
$(window).scroll(function () {
    ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if ($(this).scrollTop() > offset_opacity) {
        $back_to_top.addClass('cd-fade-out');
    }
});

//smooth scroll to top
$back_to_top.on('click', function (event) {
    event.preventDefault();
    $('body,html').animate({
        scrollTop: 0,
    }, scroll_top_duration);
});
