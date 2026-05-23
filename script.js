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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var hlavniPlocha = document.getElementById("hlavniPlocha");
var karetniPlocha = document.getElementById("karetniPlocha");
var polickoPostavy = document.getElementById("postava");
var polickoDalsichPostav = document.getElementById("polickoDalsichPostav");
var karetniPolicko1 = document.getElementById("karetniPolicko1");
var karetniPolicko2 = document.getElementById("karetniPolicko2");
var karetniPolicko3 = document.getElementById("karetniPolicko3");
var zdraviPostavy = document.getElementById("zdraviPostavy");
var zdraviHrace = document.getElementById("zdraviHrace");
var healthBarHrace = document.getElementById("healthBarHrace");
var postava = document.getElementById("postava");
var zdraviHrcaeCislo = document.getElementById("zdraviHrcaeCislo");
var Postava = /** @class */ (function () {
    //abstrktni funkce, ktere prirazuji privatnim promenam vhodne hodnoty
    function Postava() {
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.Name = this.nastaveniJmenaPostavy();
        this.pocatecniZdravi = this.Zdravi;
    }
    //inicizacni funkce postavy = nastaveni zdravi a damage
    Postava.prototype.inicizacePostavy = function () {
        zdraviPostavy.style.width = "100%";
        zdraviPostavy.innerText = "".concat(this.Zdravi);
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.zobrazeniPostavy();
    };
    Postava.prototype.zobrazeniPostavy = function () {
        polickoPostavy.className = "".concat(this.Name);
        polickoPostavy.src = this.nastaveniVzhleduPostavy();
    };
    Postava.prototype.zmenseniZdraviPostavy = function (damage) {
        this.Zdravi -= damage;
        if (this.Zdravi <= 0) {
            this.zanikPostavy();
            throw new Error();
        }
        zdraviPostavy.innerText = "".concat(this.Zdravi);
        zdraviPostavy.style.width = "".concat((this.Zdravi / this.pocatecniZdravi) * 100, "%");
    };
    Postava.prototype.zanikPostavy = function () {
        console.log("zanik postavy");
        polickoPostavy.src = '';
        poleVsechPostav.splice(0, 1);
        pridaniPostav();
        poleVsechPostav[0].inicizacePostavy();
    };
    Postava.prototype.zdraviPostavy = function () {
        return this.Zdravi;
    };
    Postava.prototype.damagePostavy = function () {
        return this.Damage;
    };
    return Postava;
}());
var Vlk = /** @class */ (function (_super) {
    __extends(Vlk, _super);
    function Vlk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vlk.prototype.nastaveniJmenaPostavy = function () {
        return "Vlk";
    };
    Vlk.prototype.nastaveniZdravi = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 100 - pointer;
    };
    Vlk.prototype.nastaveniDamage = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 4) * 100)) / 100);
        return 5 + pointer;
    };
    Vlk.prototype.nastaveniVzhleduPostavy = function () {
        return '/imges/img_Vlk.png';
    };
    return Vlk;
}(Postava));
var Zlodej = /** @class */ (function (_super) {
    __extends(Zlodej, _super);
    function Zlodej() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Zlodej.prototype.nastaveniJmenaPostavy = function () {
        return "Zlodej";
    };
    Zlodej.prototype.nastaveniZdravi = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 120 - pointer;
    };
    Zlodej.prototype.nastaveniDamage = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 5) * 100)) / 100);
        return 4 + pointer;
    };
    Zlodej.prototype.nastaveniVzhleduPostavy = function () {
        return '/imges/img_Zlodej.png';
    };
    return Zlodej;
}(Postava));
var Obr = /** @class */ (function (_super) {
    __extends(Obr, _super);
    function Obr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Obr.prototype.nastaveniJmenaPostavy = function () {
        return "Obr";
    };
    Obr.prototype.nastaveniZdravi = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 20) * 100)) / 100);
        return 150 - pointer;
    };
    Obr.prototype.nastaveniDamage = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 6) * 100)) / 100);
        return 7 + pointer;
    };
    Obr.prototype.nastaveniVzhleduPostavy = function () {
        return '/imges/img_Obr.png';
    };
    return Obr;
}(Postava));
//////////////////////////////////////////////////////////////////////////////////////////////////
//ODDELENI TRID KARTY A POSTAVY
var Karta = /** @class */ (function () {
    function Karta() {
    }
    Karta.prototype.zobrazeniKarty = function () {
        return this.obrazekKarty;
    };
    Karta.prototype.hraniKartou = function (pointer) {
        poleKaretnichPolicek[pointer].style.visibility = "hidden";
        poleKaretnichPolicek[pointer].style.pointerEvents = "none";
        pointerPoradiVybraneKarty = undefined;
        console.log(poleVsechPostav[0]);
        var a = this.damageKarty();
        console.log(a);
        return a;
    };
    return Karta;
}());
var SilnaRana = /** @class */ (function (_super) {
    __extends(SilnaRana, _super);
    function SilnaRana() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.obrazekKarty = "/imges/img1.jpg";
        _this.Damage = 40;
        return _this;
    }
    SilnaRana.prototype.damageKarty = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 10) * 100)) / 100);
        if (pointer < 5) {
            return this.Damage * 0;
        }
        else {
            return this.Damage;
        }
    };
    return SilnaRana;
}(Karta));
var ObecnaRana = /** @class */ (function (_super) {
    __extends(ObecnaRana, _super);
    function ObecnaRana() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.obrazekKarty = "/imges/img2.jpg";
        _this.Damage = 10;
        return _this;
    }
    ObecnaRana.prototype.damageKarty = function () {
        var pointer = Math.ceil((Math.floor((Math.random() * 10) * 100)) / 100);
        if (pointer < 5) {
            return this.Damage * 2;
        }
        else {
            return this.Damage;
        }
    };
    return ObecnaRana;
}(Karta));
var Blokovani = /** @class */ (function (_super) {
    __extends(Blokovani, _super);
    function Blokovani() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.obrazekKarty = "/imges/img3.jpg";
        return _this;
    }
    Blokovani.prototype.damageKarty = function () {
        return 0;
    };
    Blokovani.prototype.hraniKartou = function (pointer) {
        poleKaretnichPolicek[pointer].style.visibility = "hidden";
        poleKaretnichPolicek[pointer].style.pointerEvents = "none";
        pointerPoradiVybraneKarty = undefined;
        this.blokovani();
        return 0;
    };
    Blokovani.prototype.blokovani = function () {
        soucasnyHrac === null || soucasnyHrac === void 0 ? void 0 : soucasnyHrac.blokovaniFunkce();
    };
    return Blokovani;
}(Karta));
//////////////////////////////////////////////////////////////////////////////////////////////////
var Hrac = /** @class */ (function () {
    function Hrac() {
        this.blokovani = false;
        this.Zdravi = 100;
        zdraviHrcaeCislo.innerText = "".concat(this.Zdravi);
        healthBarHrace.style.height = "100%";
    }
    Hrac.prototype.zmenseniZdravi = function (damage) {
        if (this.blokovani == true) {
            console.log("hrac blokuje damage");
            this.blokovani = false;
        }
        else {
            this.Zdravi -= damage;
            if (this.Zdravi < 0) {
                this.prohraHrace();
                throw new Error();
            }
            zdraviHrcaeCislo.innerText = "".concat(this.Zdravi);
            healthBarHrace.style.height = "".concat(this.Zdravi, "%");
        }
    };
    Hrac.prototype.aktualniStavZdravi = function () {
        return this.Zdravi;
    };
    Hrac.prototype.prohraHrace = function () {
        poleVsechKaret = [];
        poleVsechPostav = [];
        prohraHrace();
    };
    Hrac.prototype.blokovaniFunkce = function () {
        this.blokovani = true;
    };
    return Hrac;
}());
//////////////////////////////////////////////////////////////////////////////////////////////////
var poleVsechPostav = []; //hlavni pole postav
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
var poleZakladnichPostav = [vytvoreniPostavyVlk, vytvoreniPostavyZlodej, vytvoreniPostavyObr];
// pridani podsav do poleVsechPostav
function pridaniPostav() {
    var pointer = Math.floor((Math.floor((Math.random() * 3) * 100)) / 100);
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
var poleVsechKaret = []; //hlavni pole karet
var poleKaretnichPolicek = [karetniPolicko1, karetniPolicko2, karetniPolicko3]; //pole z odkazem na imistemi obrazku na strance
var poleZakladnichKaret = [vytvoreniKartySilnaRana, vytvoreniKartyObcenaRana, vytvoreniKartyBlokovani];
function naplneniPole3Karty() {
    for (var i = 0; i < 3; i++) {
        var pointer = Math.floor((Math.floor((Math.random() * 3) * 100)) / 100);
        poleZakladnichKaret[pointer]();
    }
}
function zobrazeniKaret() {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wait(500)];
                case 1:
                    _a.sent();
                    for (i = 0; i < 3; i++) {
                        poleKaretnichPolicek[i].src = poleVsechKaret[i].zobrazeniKarty();
                        poleKaretnichPolicek[i].style.visibility = "visible";
                        poleKaretnichPolicek[i].style.pointerEvents = "auto";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function mazaniKaret() {
    for (var i = 0; i < 3; i++) {
        poleVsechKaret.splice(0, 1);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//Oddeleni pro interkcni funcke
var pointerPoradiVybraneKarty;
function prevzatiPoradiKarty(poradiKarty) {
    pointerPoradiVybraneKarty = poradiKarty;
}
var counterTahuKartou = 0;
function interakceKartySPostavou() {
    if (pointerPoradiVybraneKarty != undefined) {
        try {
            poleVsechPostav[0].zmenseniZdraviPostavy(poleVsechKaret[pointerPoradiVybraneKarty].hraniKartou(pointerPoradiVybraneKarty));
        }
        catch (_a) { }
        counterTahuKartou++;
        pointerPoradiVybraneKarty = undefined;
        tahPostavy();
        console.log(counterTahuKartou);
    }
    else {
        console.log("karta neni vybrana");
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
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function tahPostavy() {
    return __awaiter(this, void 0, void 0, function () {
        var i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("tah posatvy");
                    for (i = 0; i < 3; i++) {
                        poleKaretnichPolicek[i].style.pointerEvents = "none";
                    }
                    try {
                        if (soucasnyHrac != null)
                            soucasnyHrac.zmenseniZdravi(poleVsechPostav[0].damagePostavy());
                    }
                    catch (_b) { }
                    ;
                    console.log("zacet");
                    return [4 /*yield*/, wait(500)];
                case 1:
                    _a.sent();
                    for (i = 0; i < 3; i++) {
                        if (poleKaretnichPolicek[i].style.visibility === "visible") {
                            poleKaretnichPolicek[i].style.pointerEvents = "auto";
                        }
                    }
                    console.log("konce");
                    return [2 /*return*/];
            }
        });
    });
}
function prohraHrace() {
    soucasnyHrac = null;
}
// prvni spustena funcke
var soucasnyHrac;
function innit() {
    soucasnyHrac = new Hrac;
    console.log(soucasnyHrac === null || soucasnyHrac === void 0 ? void 0 : soucasnyHrac.aktualniStavZdravi());
    for (var i = 0; i < 5; i++) {
        pridaniPostav();
    }
    poleVsechPostav[0].inicizacePostavy();
    for (var i = 0; i < 2; i++) {
        naplneniPole3Karty();
    }
    zobrazeniKaret();
}
innit();
