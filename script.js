"use strict";
const hlavniPlocha = document.getElementById("hlavniPlocha");
const karetniPlocha = document.getElementById("karetniPlocha");
const polickoPostavy = document.getElementById("postava");
const karetniPolicko1 = document.getElementById("karetniPolicko1");
const karetniPolicko2 = document.getElementById("karetniPolicko2");
const karetniPolicko3 = document.getElementById("karetniPolicko3");
const gameOverBackground = document.getElementById("gameOverBackground");
const zdraviPostavy = document.getElementById("zdraviPostavy");
const zdraviHrace = document.getElementById("zdraviHrace");
const postava = document.getElementById("postava");
const zdraviHraceCislo = document.getElementById("zdraviHrcaeCislo");
class Postava {
    pocatecniZdravi;
    Zdravi;
    Damage;
    Name;
    //abstrktni funkce, ktere prirazuji privatnim promenam vhodne hodnoty
    constructor() {
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.Name = this.nastaveniJmenaPostavy();
        this.pocatecniZdravi = this.Zdravi;
    }
    //inicizacni funkce postavy = nastaveni zdravi a damage
    inicizacePostavy() {
        zdraviPostavy.style.width = `100%`;
        zdraviPostavy.innerText = `${this.Zdravi}`;
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.zobrazeniPostavy();
    }
    zobrazeniPostavy() {
        polickoPostavy.className = `${this.Name}`;
        polickoPostavy.src = this.nastaveniVzhleduPostavy();
    }
    zmenseniZdraviPostavy(damage) {
        this.Zdravi -= damage;
        if (this.Zdravi <= 0) {
            this.zanikPostavy();
            throw new Error();
        }
        zdraviPostavy.innerText = `${this.Zdravi}`;
        zdraviPostavy.style.width = `${(this.Zdravi / this.pocatecniZdravi) * 100}%`;
    }
    zanikPostavy() {
        console.log(`zanik postavy`);
        polickoPostavy.src = '';
        poleVsechPostav.splice(0, 1);
        pridaniPostav();
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
    nastaveniJmenaPostavy() {
        return `Vlk`;
    }
    nastaveniZdravi() {
        let pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 100 - pointer;
    }
    nastaveniDamage() {
        let pointer = Math.ceil((Math.floor((Math.random() * 4) * 100)) / 100);
        return 5 + pointer;
    }
    nastaveniVzhleduPostavy() {
        return '/imges/img_Vlk.png';
    }
}
class Zlodej extends Postava {
    nastaveniJmenaPostavy() {
        return `Zlodej`;
    }
    nastaveniZdravi() {
        let pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 120 - pointer;
    }
    nastaveniDamage() {
        let pointer = Math.ceil((Math.floor((Math.random() * 5) * 100)) / 100);
        return 4 + pointer;
    }
    nastaveniVzhleduPostavy() {
        return '/imges/img_Zlodej.png';
    }
}
class Obr extends Postava {
    nastaveniJmenaPostavy() {
        return `Obr`;
    }
    nastaveniZdravi() {
        let pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 150 - pointer;
    }
    nastaveniDamage() {
        let pointer = Math.ceil((Math.floor((Math.random() * 6) * 100)) / 100);
        return 7 + pointer;
    }
    nastaveniVzhleduPostavy() {
        return '/imges/img_Obr.png';
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
        pointerPoradiVybraneKarty = undefined;
        console.log(poleVsechPostav[0]);
        let a = this.damageKarty();
        console.log(a);
        return a;
    }
}
class SilnaRana extends Karta {
    obrazekKarty = `/imges/silna_rana_img.png`;
    Damage = 40;
    damageKarty() {
        let pointer = Math.ceil((Math.floor((Math.random() * 10) * 100)) / 100);
        if (pointer < 5) {
            return this.Damage * 0;
        }
        else {
            return this.Damage;
        }
    }
}
class ObecnaRana extends Karta {
    obrazekKarty = `/imges/obecna_rana_img.png`;
    Damage = 10;
    damageKarty() {
        let pointer = Math.ceil((Math.floor((Math.random() * 10) * 100)) / 100);
        if (pointer < 5) {
            return this.Damage * 2;
        }
        else {
            return this.Damage;
        }
    }
}
class Blokovani extends Karta {
    obrazekKarty = `/imges/blokovani_img.png`;
    damageKarty() {
        return 0;
    }
    hraniKartou(pointer) {
        poleKaretnichPolicek[pointer].style.visibility = "hidden";
        poleKaretnichPolicek[pointer].style.pointerEvents = "none";
        pointerPoradiVybraneKarty = undefined;
        this.blokovani();
        return 0;
    }
    blokovani() {
        soucasnyHrac?.blokovaniFunkce();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
class Hrac {
    Zdravi;
    blokovani = false;
    constructor() {
        this.Zdravi = 100;
        zdraviHraceCislo.innerText = `${this.Zdravi}`;
    }
    zmenseniZdravi(damage) {
        if (this.blokovani == true) {
            console.log(`hrac blokuje damage`);
            this.blokovani = false;
        }
        else {
            this.Zdravi -= damage;
            if (this.Zdravi < 0) {
                zdraviHraceCislo.innerText = `0`;
                this.prohraHrace();
                throw new Error();
            }
            zdraviHraceCislo.innerText = `${this.Zdravi}`;
        }
    }
    aktualniStavZdravi() {
        return this.Zdravi;
    }
    prohraHrace() {
        poleVsechKaret = [];
        poleVsechPostav = [];
        prohraHraceGlobal();
    }
    blokovaniFunkce() {
        this.blokovani = true;
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
    let pointer = Math.floor((Math.floor((Math.random() * 3) * 100)) / 100);
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
function naplneniPole3Karty() {
    for (let i = 0; i < 3; i++) {
        let pointer = Math.floor((Math.floor((Math.random() * 3) * 100)) / 100);
        poleZakladnichKaret[pointer]();
    }
}
async function zobrazeniKaret() {
    await wait(500);
    for (let i = 0; i < 3; i++) {
        poleKaretnichPolicek[i].src = poleVsechKaret[i].zobrazeniKarty();
        poleKaretnichPolicek[i].style.visibility = "visible";
        poleKaretnichPolicek[i].style.pointerEvents = "auto";
    }
}
function mazaniKaret() {
    for (let i = 0; i < 3; i++) {
        poleVsechKaret.splice(0, 1);
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
        try {
            poleVsechPostav[0].zmenseniZdraviPostavy(poleVsechKaret[pointerPoradiVybraneKarty].hraniKartou(pointerPoradiVybraneKarty));
        }
        catch { }
        counterTahuKartou++;
        pointerPoradiVybraneKarty = undefined;
        tahPostavy();
        console.log(counterTahuKartou);
    }
    else {
        console.log(`karta neni vybrana`);
    }
    if (counterTahuKartou == 3) {
        naplneniPole3Karty();
        mazaniKaret();
        zobrazeniKaret();
        counterTahuKartou = 0;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//Interakce postavy s hracem
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function tahPostavy() {
    console.log(`tah posatvy`);
    for (let i = 0; i < 3; i++) {
        poleKaretnichPolicek[i].style.pointerEvents = `none`;
    }
    try {
        if (soucasnyHrac != null)
            soucasnyHrac.zmenseniZdravi(poleVsechPostav[0].damagePostavy());
    }
    catch { }
    ;
    await wait(500);
    for (let i = 0; i < 3; i++) {
        if (poleKaretnichPolicek[i].style.visibility === `visible`) {
            poleKaretnichPolicek[i].style.pointerEvents = "auto";
        }
    }
}
function prohraHraceGlobal() {
    soucasnyHrac = null;
    gameOverBackground.style.display = `block`;
    console.log("prohra hrace");
    for (let i = 0; i < 3; i++) {
        poleKaretnichPolicek[i].style.pointerEvents = `none`;
    }
}
// prvni spustena funcke
let soucasnyHrac;
function innit() {
    soucasnyHrac = new Hrac;
    console.log(soucasnyHrac?.aktualniStavZdravi());
    for (let i = 0; i < 5; i++) {
        pridaniPostav();
    }
    poleVsechPostav[0].inicizacePostavy();
    for (let i = 0; i < 2; i++) {
        naplneniPole3Karty();
    }
    zobrazeniKaret();
}
innit();
