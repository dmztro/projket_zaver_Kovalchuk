const hlavniPlocha = document.getElementById("hlavniPlocha") as HTMLDivElement;
const karetniPlocha = document.getElementById("karetniPlocha") as HTMLDivElement;
const polickoPostavy = document.getElementById("polickoPostavy") as HTMLImageElement;
const polickoDalsichPostav = document.getElementById("polickoDalsichPostav") as HTMLDivElement;
const karetniPolicko1 = document.getElementById("karetniPolicko1") as HTMLImageElement;
const karetniPolicko2 = document.getElementById("karetniPolicko2") as HTMLImageElement;
const karetniPolicko3 = document.getElementById("karetniPolicko3") as HTMLImageElement;

const zdraviPostavy = document.getElementById("zdraviPostavy")as HTMLDivElement;
const postava = document.getElementById("postava")as HTMLDivElement;


abstract class Postava{
    private Zdravi:number = 0;
    private Damage:number = 0;

    //abstrktni funkce, ktere prirazuji privatnim promenam vhodne hodnoty
    abstract nastaveniZdravi():number;
    abstract nastaveniDamage():number;

    //zobrazeni postavy v img
    abstract nastaveniVzhleduPostavy():string;


    //inicizacni funkce postavy = nastaveni zdravi a damage
    inicizacePostavy():void{
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.zobrazeniPostavy();

    }
    zobrazeniPostavy():void{
        polickoPostavy.src=this.nastaveniVzhleduPostavy();
    }


    zmenseniZdraviPostavy(damage:number):void{
        this.Zdravi=-damage;
        if (this.Zdravi<=0) {
            this.zanikPostavy();
        }
    }

    zanikPostavy():void{
        polickoPostavy.src='';
        poleVsechPostav.splice(0);
        pridaniPostav();
        naplneniPole3Karty();
        poleVsechPostav[0].inicizacePostavy();
    }

    zdraviPostavy(): number {
         return this.Zdravi;
    }
    damagePostavy(): number {
        return this.Damage;
    }
}

class Vlk extends Postava{
    nastaveniZdravi(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*20)*100))/100)
        return 100-pointer;
    }
    nastaveniDamage(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*4)*100))/100)
        return 5+pointer;
    }
    nastaveniVzhleduPostavy(): string {
        return '';
    }

}
class Zlodej extends Postava{
    nastaveniZdravi(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*20)*100))/100)
        return 120-pointer;
    }
    nastaveniDamage(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*5)*100))/100)
        return 4+pointer;
    }
        nastaveniVzhleduPostavy(): string {
        return '';
    }
}

class Obr extends Postava{
        nastaveniZdravi(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*20)*100))/100)
        return 150-pointer;
    }
    nastaveniDamage(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*6)*100))/100)
        return 7+pointer;
    }
        nastaveniVzhleduPostavy(): string {
        return '';
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//ODDELENI TRID KARTY A POSTAVY

abstract class Karta{
    abstract damageKarty():number;
    abstract obrazekKarty:string;
    zobrazeniKarty():string{
        return this.obrazekKarty;
    }
    hraniKartou():void{
        poleKaretnichPolicek[pointerPoradiVybraneKarty].style.visibility ="hidden";
        poleKaretnichPolicek[pointerPoradiVybraneKarty].style.pointerEvents="none" ;

        pointerPoradiVybraneKarty=-1;

    }
}
class SilnaRana extends Karta{

    obrazekKarty=``;
    private Damage:number= 40;
    damageKarty(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*10)*100))/100)
        if(pointer<3){
            return this.Damage*2;
        }
        else{
            return this.Damage;
        }
    }
}
class ObecnaRana extends Karta{
    obrazekKarty=``;
    private Damage:number= 10;
    damageKarty(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*2)*100))/100)
        if (pointer<2) {
           return this.Damage*0;
        }
        else{
            return this.Damage;
        }
    }
}

class Blokovani extends Karta{
    obrazekKarty=``;
    damageKarty(): number {
        return 0;
    }
    blokovani():void{
        
    }
    
}


//////////////////////////////////////////////////////////////////////////////////////////////////
class Hrac{
    private Zdravi:number;

    constructor(){
        this.Zdravi=100;
    }
    zmenseniZdravi(damage:number):void{
        this.Zdravi=-damage;
        if (this.Zdravi<0) {
            
        }
    }
    aktualniStavZdravi():number{
        return this.Zdravi;
    } 
    prohraHrace():void{
        poleVsechKaret=[];
        poleVsechPostav=[];
    }
}




//////////////////////////////////////////////////////////////////////////////////////////////////
let poleVsechPostav:Postava[]=[];//hlavni pole postav

//funkce pro pridani postav do hlavniho pole
function vytvoreniPostavyVlk():void{
    poleVsechPostav.push(new Vlk())
}
function vytvoreniPostavyZlodej():void{
    poleVsechPostav.push(new Zlodej())
}
function vytvoreniPostavyObr():void{
    poleVsechPostav.push(new Obr())
}

// pole odkud se vybiraji postavy do hlavniho pole
const poleZakladnichPostav = [vytvoreniPostavyVlk,vytvoreniPostavyZlodej,vytvoreniPostavyObr];

// pridani podsav do poleVsechPostav
function pridaniPostav():void{
    let pointer:number = Math.ceil((Math.floor((Math.random()*3)*100))/100)
    poleZakladnichPostav[pointer]();
}






//////////////////////////////////////////////////////////////////////////////////////////////////
//Rozdeleni funkci pro karty a postavy
// funkce pro pridani karet do hlavniho pole karet

function vytvoreniKartyObcenaRana():void{
    poleVsechKaret.push(new ObecnaRana())
}
function vytvoreniKartySilnaRana():void{
    poleVsechKaret.push(new SilnaRana())
}
function vytvoreniKartyBlokovani():void{
    poleVsechKaret.push(new Blokovani())
}

let poleVsechKaret:Karta[]=[]//hlavni pole karet

let poleKaretnichPolicek:HTMLImageElement[]=[karetniPolicko1,karetniPolicko2,karetniPolicko3];//pole z odkazem na imistemi obrazku na strance
const poleZakladnichKaret=[vytvoreniKartySilnaRana,vytvoreniKartyObcenaRana,vytvoreniKartyBlokovani];

function pridaniKaret():void{
    let pointer:number = Math.ceil((Math.floor((Math.random()*3)*100))/100)
    poleZakladnichKaret[pointer]();
}
function naplneniPole3Karty():void{
    mazaniKaret();
    for(let i =0; i<3; i++){
        pridaniKaret();
    }
    zobrazeniKaret();
}

function zobrazeniKaret():void{
    for(let i =0; i<3; i++){
        poleKaretnichPolicek[i].src=poleVsechKaret[i].zobrazeniKarty();
        poleKaretnichPolicek[i].style.visibility="visible";
        poleKaretnichPolicek[i].style.pointerEvents="auto";
    }
}
function mazaniKaret(){
    for(let i =0; i<3; i++){
        poleKaretnichPolicek.splice(0);
    }
}





//////////////////////////////////////////////////////////////////////////////////////////////////
//Oddeleni pro interkcni funcke

let pointerPoradiVybraneKarty:number;

function prevzatiPoradiKarty(poradiKarty:number):void{
    pointerPoradiVybraneKarty =poradiKarty;
}

let counterTahuKartou:number = 0;

function interakceKartySPostavou():void{
    poleVsechPostav[0].zmenseniZdraviPostavy(poleVsechKaret[pointerPoradiVybraneKarty].damageKarty());
    poleVsechKaret[pointerPoradiVybraneKarty].hraniKartou();
    counterTahuKartou++
    if (counterTahuKartou=3) {
        naplneniPole3Karty();
        counterTahuKartou=0;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//Interakce postavy s hracem

let soucanyHrac:Hrac|null;
// prvni spustena funcke
function innit(){
    soucanyHrac =new Hrac;
    
    for(let i =0; i<5; i++){
        pridaniPostav();
    }
    poleVsechPostav[0].inicizacePostavy();
    
        for(let i =0; i<6; i++){
        pridaniKaret();
    }

}

function prohraHrace():void{
    soucanyHrac= null;
}