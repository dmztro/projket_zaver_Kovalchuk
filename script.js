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
    nastaveniZdraviDamage(Zdravi, Damage) {
        this.Zdravi = Zdravi;
        this.Damage = Damage;
    }
    zmenseniZdraviPostavy(damage) {
    }
    zobrazeniPostavy() {
    }
    zanikPostavy() {
    }
    zdraviPostavy() {
        return 0;
    }
    damagePostavy() {
        return 0;
    }
}
class Vlk extends Postava {
    nastaveniZdraviDamage() {
    }
}
class Zlodej extends Postava {
}
class Obr extends Postava {
}
class Karta {
    zobrazeniKarty() {
    }
}
class SilnaRana extends Karta {
    Damage = 0;
    damageKarty() {
        return 0;
    }
}
class ObecnaRana extends Karta {
    Damage = 0;
    damageKarty() {
        return 0;
    }
}
class Blokovani extends Karta {
    damageKarty() {
        return 0;
    }
    blokovani() {
    }
}
class Hrac {
    Zdravi = 0;
    zmenseniZdravi() {
    }
    aktualniStavZdravi() {
        return this.Zdravi;
    }
}
let poleVsechPostav = []; //pole nadchzejicich postav
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
// pole odkud se vyiraji postavy do hlavniho pole
const poleZakladnichPostav = [vytvoreniPostavyVlk, vytvoreniPostavyZlodej, vytvoreniPostavyObr];
// pridani podsav do poleVsechPostav
function pridaniPostav() {
    let pointer = Math.ceil((Math.floor((Math.random() * 3) * 100)) / 100);
    poleZakladnichPostav[pointer]();
}
// prvni spustena funcke
function innit() {
    const hracHlavni = new Hrac;
    for (let i = 0; i < 5; i++) {
        pridaniPostav();
    }
    poleVsechPostav[0].zobrazeniPostavy();
}
