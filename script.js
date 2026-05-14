"use strict";
const hlavniPlocha = document.getElementById("hlavniPlocha");
const karetniPlocha = document.getElementById("karetniPlocha");
const polickoPostavy = document.getElementById("polickoPostavy");
const polickoDalsichPostav = document.getElementById("polickoDalsichPostav");
const karetniPolicko1 = document.getElementById("karetniPolicko1");
const karetniPolicko2 = document.getElementById("karetniPolicko2");
const karetniPolicko3 = document.getElementById("karetniPolicko3");
const zdraviPostavy = document.getElementById("zdraviPostavy");
const postava = document.getElementById("postava");
class Postava {
    Zdravi = 0;
    Damage = 0;
    //inicizacni funkce postavy = nastaveni zdravi a damage
    inicizacePostavy() {
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.zobrazeniPostavy();
    }
    zobrazeniPostavy() {
        polickoPostavy.src = this.nastaveniVzhleduPostavy();
    }
    zmenseniZdraviPostavy(damage) {
        this.Zdravi = -damage;
        if (this.Zdravi <= 0) {
            this.zanikPostavy();
        }
    }
    zanikPostavy() {
        polickoPostavy.src = '';
        poleVsechPostav.splice(0);
        pridaniPostav();
        naplneniPole3Karty();
        poleVsechPostav[0].inicizacePostavy();
    }
    zdraviPostavy() {
        return this.Zdravi;
    }
    damagePostavy() {
        return this.Damage;
    }
}
class Vlk extends Postava {
    nastaveniZdravi() {
        let pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 100 - pointer;
    }
    nastaveniDamage() {
        let pointer = Math.ceil((Math.floor((Math.random() * 4) * 100)) / 100);
        return 5 + pointer;
    }
    nastaveniVzhleduPostavy() {
        return '';
    }
}
class Zlodej extends Postava {
    nastaveniZdravi() {
        let pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 120 - pointer;
    }
    nastaveniDamage() {
        let pointer = Math.ceil((Math.floor((Math.random() * 5) * 100)) / 100);
        return 4 + pointer;
    }
    nastaveniVzhleduPostavy() {
        return '';
    }
}
class Obr extends Postava {
    nastaveniZdravi() {
        let pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 150 - pointer;
    }
    nastaveniDamage() {
        let pointer = Math.ceil((Math.floor((Math.random() * 6) * 100)) / 100);
        return 7 + pointer;
    }
    nastaveniVzhleduPostavy() {
        return '';
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//ODDELENI TRID KARTY A POSTAVY
class Karta {
    zobrazeniKarty() {
        return this.obrazekKarty;
    }
    hraniKartou(pointer) {
        poleKaretnichPolicek[pointer].style.visibility = "hidden";
        poleKaretnichPolicek[pointer].style.pointerEvents = "none";
        pointerPoradiVybraneKarty = -1;
    }
}
class SilnaRana extends Karta {
    obrazekKarty = ``;
    Damage = 40;
    damageKarty() {
        let pointer = Math.ceil((Math.floor((Math.random() * 10) * 100)) / 100);
        if (pointer < 3) {
            return this.Damage * 2;
        }
        else {
            return this.Damage;
        }
    }
}
class ObecnaRana extends Karta {
    obrazekKarty = ``;
    Damage = 10;
    damageKarty() {
        let pointer = Math.ceil((Math.floor((Math.random() * 2) * 100)) / 100);
        if (pointer < 2) {
            return this.Damage * 0;
        }
        else {
            return this.Damage;
        }
    }
}
class Blokovani extends Karta {
    obrazekKarty = ``;
    damageKarty() {
        return 0;
    }
    blokovani() {
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
class Hrac {
    Zdravi;
    constructor() {
        this.Zdravi = 100;
    }
    zmenseniZdravi(damage) {
        this.Zdravi = -damage;
        if (this.Zdravi < 0) {
            this.prohraHrace;
        }
    }
    aktualniStavZdravi() {
        return this.Zdravi;
    }
    prohraHrace() {
        poleVsechKaret = [];
        poleVsechPostav = [];
        prohraHrace();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
let poleVsechPostav = []; //hlavni pole postav
//funkce pro pridani postav do hlavniho pole
function vytvoreniPostavyVlk() {
    poleVsechPostav.push(new Vlk());
}
function vytvoreniPostavyZlodej() {
    poleVsechPostav.push(new Zlodej());
}
function vytvoreniPostavyObr() {
    poleVsechPostav.push(new Obr());
}
// pole odkud se vybiraji postavy do hlavniho pole
const poleZakladnichPostav = [vytvoreniPostavyVlk, vytvoreniPostavyZlodej, vytvoreniPostavyObr];
// pridani podsav do poleVsechPostav
function pridaniPostav() {
    let pointer = Math.ceil((Math.floor((Math.random() * 3) * 100)) / 100);
    poleZakladnichPostav[pointer]();
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//Rozdeleni funkci pro karty a postavy
// funkce pro pridani karet do hlavniho pole karet
function vytvoreniKartyObcenaRana() {
    poleVsechKaret.push(new ObecnaRana());
}
function vytvoreniKartySilnaRana() {
    poleVsechKaret.push(new SilnaRana());
}
function vytvoreniKartyBlokovani() {
    poleVsechKaret.push(new Blokovani());
}
let poleVsechKaret = []; //hlavni pole karet
let poleKaretnichPolicek = [karetniPolicko1, karetniPolicko2, karetniPolicko3]; //pole z odkazem na imistemi obrazku na strance
const poleZakladnichKaret = [vytvoreniKartySilnaRana, vytvoreniKartyObcenaRana, vytvoreniKartyBlokovani];
function pridaniKaret() {
    let pointer = Math.ceil((Math.floor((Math.random() * 3) * 100)) / 100);
    poleZakladnichKaret[pointer]();
}
function naplneniPole3Karty() {
    mazaniKaret();
    for (let i = 0; i < 3; i++) {
        pridaniKaret();
    }
    zobrazeniKaret();
}
function zobrazeniKaret() {
    for (let i = 0; i < 3; i++) {
        poleKaretnichPolicek[i].src = poleVsechKaret[i].zobrazeniKarty();
        poleKaretnichPolicek[i].style.visibility = "visible";
        poleKaretnichPolicek[i].style.pointerEvents = "auto";
    }
}
function mazaniKaret() {
    for (let i = 0; i < 3; i++) {
        poleVsechKaret.splice(0);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//Oddeleni pro interkcni funcke
let pointerPoradiVybraneKarty;
function prevzatiPoradiKarty(poradiKarty) {
    pointerPoradiVybraneKarty = poradiKarty;
}
let counterTahuKartou = 0;
function interakceKartySPostavou() {
    if (pointerPoradiVybraneKarty != undefined) {
        poleVsechPostav[0].zmenseniZdraviPostavy(poleVsechKaret[pointerPoradiVybraneKarty].damageKarty());
        poleVsechKaret[pointerPoradiVybraneKarty].hraniKartou(pointerPoradiVybraneKarty);
        counterTahuKartou++;
        pointerPoradiVybraneKarty = undefined;
        tahPostavy();
    }
    else {
        console.log(`karta neni vybrana`);
    }
    if (counterTahuKartou = 3) {
        naplneniPole3Karty();
        counterTahuKartou = 0;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//Interakce postavy s hracem
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function tahPostavy() {
    for (let i = 0; i < 3; i++) {
        poleKaretnichPolicek[i].style.pointerEvents = `none`;
    }
    if (soucasnyHrac != null)
        soucasnyHrac.zmenseniZdravi(poleVsechPostav[0].damagePostavy());
    await wait(100);
    for (let i = 0; i < 3; i++) {
        if (poleKaretnichPolicek[i].style.visibility === `visible`) {
            poleKaretnichPolicek[i].style.pointerEvents = "auto";
        }
    }
}
function prohraHrace() {
    soucasnyHrac = null;
}
// prvni spustena funcke
let soucasnyHrac;
function innit() {
    soucasnyHrac = new Hrac;
    for (let i = 0; i < 5; i++) {
        pridaniPostav();
    }
    poleVsechPostav[0].inicizacePostavy();
    for (let i = 0; i < 6; i++) {
        pridaniKaret();
    }
}
