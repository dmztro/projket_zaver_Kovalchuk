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
    zobrazeniPostavy() {
    }
    zanikPostavy() {
    }
}
class Vlk extends Postava {
    pocatecniZdravi = 0;
    pocatecniDamage = 0;
    zdraviPostavy() {
        return 0;
    }
    damagePostavy() {
        return 0;
    }
}
class Zlodej extends Postava {
    pocatecniZdravi = 0;
    pocatecniDamage = 0;
    zdraviPostavy() {
        return 0;
    }
    damagePostavy() {
        return 0;
    }
}
class Obr extends Postava {
    pocatecniZdravi = 0;
    pocatecniDamage = 0;
    zdraviPostavy() {
        return 0;
    }
    damagePostavy() {
        return 0;
    }
}
class Karta {
    zobrazeniKarty() {
    }
}
class SilnaRana extends Karta {
    pocatecniDamage = 0;
    damageKarty() {
        return 0;
    }
}
class ObecnaRana extends Karta {
    pocatecniDamage = 0;
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
    zdravi = 0;
    zmenseniZdarvi() {
    }
    aktualniStavZdarvi() {
        return this.zdravi;
    }
}
let poleVsechPostav = []; //pole nadchzejicich postav
function innit() {
    const hracHlavni = new Hrac;
}
const pole = [new Vlk(), new Vlk()];
// pridani podsav do poleVsechPostav
function pridaniPostav() {
}
