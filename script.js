var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var hlavniPlocha = document.getElementById("hlavniPlocha");
var karetniPlocha = document.getElementById("karetniPlocha");
var polickoPostavy = document.getElementById("polickoPostavy");
var polickoDalsichPostav = document.getElementById("polickoDalsichPostav");
var karetniPolicko1 = document.getElementById("karetniPolicko1");
var karetniPolicko2 = document.getElementById("karetniPolicko2");
var karetniPolicko3 = document.getElementById("karetniPolicko3");
var zdraviPostavy = document.getElementById("zdraviPostavy");
var postava = document.getElementById("postava");
var Postava = /** @class */ (function () {
    function Postava() {
        this.Zdravi = 0;
        this.Damage = 0;
    }
    Postava.prototype.nastaveniZdraviDamage = function (Zdravi, Damage) {
        this.Zdravi = Zdravi;
        this.Damage = Damage;
    };
    Postava.prototype.zmenseniZdraviPostavy = function (damage) {
    };
    Postava.prototype.zobrazeniPostavy = function () {
    };
    Postava.prototype.zanikPostavy = function () {
    };
    Postava.prototype.zdraviPostavy = function () {
        return 0;
    };
    Postava.prototype.damagePostavy = function () {
        return 0;
    };
    return Postava;
}());
var Vlk = /** @class */ (function (_super) {
    __extends(Vlk, _super);
    function Vlk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vlk.prototype.nastaveniZdraviDamage = function () {
    };
    return Vlk;
}(Postava));
var Zlodej = /** @class */ (function (_super) {
    __extends(Zlodej, _super);
    function Zlodej() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Zlodej;
}(Postava));
var Obr = /** @class */ (function (_super) {
    __extends(Obr, _super);
    function Obr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Obr;
}(Postava));
var Karta = /** @class */ (function () {
    function Karta() {
    }
    Karta.prototype.zobrazeniKarty = function () {
    };
    return Karta;
}());
var SilnaRana = /** @class */ (function (_super) {
    __extends(SilnaRana, _super);
    function SilnaRana() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Damage = 0;
        return _this;
    }
    SilnaRana.prototype.damageKarty = function () {
        return 0;
    };
    return SilnaRana;
}(Karta));
var ObecnaRana = /** @class */ (function (_super) {
    __extends(ObecnaRana, _super);
    function ObecnaRana() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Damage = 0;
        return _this;
    }
    ObecnaRana.prototype.damageKarty = function () {
        return 0;
    };
    return ObecnaRana;
}(Karta));
var Blokovani = /** @class */ (function (_super) {
    __extends(Blokovani, _super);
    function Blokovani() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Blokovani.prototype.damageKarty = function () {
        return 0;
    };
    Blokovani.prototype.blokovani = function () {
    };
    return Blokovani;
}(Karta));
var Hrac = /** @class */ (function () {
    function Hrac() {
        this.Zdravi = 0;
    }
    Hrac.prototype.zmenseniZdravi = function () {
    };
    Hrac.prototype.aktualniStavZdravi = function () {
        return this.Zdravi;
    };
    return Hrac;
}());
var poleVsechPostav = []; //pole nadchzejicich postav
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
var poleZakladnichPostav = [vytvoreniPostavyVlk, vytvoreniPostavyZlodej, vytvoreniPostavyObr];
// pridani podsav do poleVsechPostav
function pridaniPostav() {
    var pointer = Math.ceil((Math.floor((Math.random() * 3) * 100)) / 100);
    poleZakladnichPostav[pointer]();
}
// prvni spustena funcke
function innit() {
    var hracHlavni = new Hrac;
    for (var i = 0; i < 5; i++) {
        pridaniPostav();
    }
    poleVsechPostav[0].zobrazeniPostavy();
}
