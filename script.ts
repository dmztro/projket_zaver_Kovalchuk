const hlavniPlocha = document.getElementById("hlavniPlocha") as HTMLDivElement;
const karetniPlocha = document.getElementById("karetniPlocha") as HTMLDivElement;
const polickoPostavy = document.getElementById("postava") as HTMLImageElement;
const karetniPolicko1 = document.getElementById("karetniPolicko1") as HTMLImageElement;
const karetniPolicko2 = document.getElementById("karetniPolicko2") as HTMLImageElement;
const karetniPolicko3 = document.getElementById("karetniPolicko3") as HTMLImageElement;

const gameOverBackground = document.getElementById("gameOverBackground")as HTMLDivElement;
const zdraviPostavy = document.getElementById("zdraviPostavy")as HTMLDivElement;
const zdraviHrace = document.getElementById("zdraviHrace")as HTMLDivElement;
const postava = document.getElementById("postava")as HTMLDivElement;
const postavaName = document.getElementById("postavaName")as HTMLDivElement;

const zdraviHraceCislo = document.getElementById("zdraviHrcaeCislo")as HTMLParagraphElement;

abstract class Postava{
    private pocatecniZdravi:number;
    private Zdravi:number;
    private Damage:number;
    private Name:string;

    //abstrktni funkce, ktere prirazuji privatnim promenam vhodne hodnoty
    abstract nastaveniZdravi():number;
    abstract nastaveniDamage():number;
    //zobrazeni postavy v img
    abstract nastaveniVzhleduPostavy:string;
    abstract nastaveniJmenaPostavy():string;

    //constructor
        constructor(){
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.Name = this.nastaveniJmenaPostavy();
        this.pocatecniZdravi = this.Zdravi;

    }
    //inicizacni funkce postavy = nastaveni zdravi a damage
    inicizacePostavy():void{
        zdraviPostavy.style.width=`100%`;
        zdraviPostavy.innerText = `${this.Zdravi}`;
        this.Zdravi = this.nastaveniZdravi();
        this.Damage = this.nastaveniDamage();
        this.zobrazeniPostavy();

    }
    zobrazeniPostavy():void{
        postavaName.innerText=this.Name;
        polickoPostavy.className = `${this.Name}`;
        polickoPostavy.src=this.nastaveniVzhleduPostavy;
    }


    zmenseniZdraviPostavy(damage:number):void{
        this.Zdravi-=damage;
        if (this.Zdravi<=0) {
            this.zanikPostavy();
            throw new Error();
        }
        zdraviPostavy.innerText = `${this.Zdravi}`;
        zdraviPostavy.style.width=`${(this.Zdravi/this.pocatecniZdravi)*100}%`;
    }

    zanikPostavy():void{
        console.log(`zanik postavy`)
        polickoPostavy.src='';
        poleVsechPostav.splice(0,1);
        pridaniPostav();
        poleVsechPostav[0].inicizacePostavy();
    }
    damagePostavy(): number {
        return this.Damage;
    }
}

class Vlk extends Postava{
    nastaveniJmenaPostavy(){
        return `Vlk`
    }
    nastaveniZdravi(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*20)*100))/100)
        return 100-pointer;
    }
    nastaveniDamage(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*4)*100))/100)
        return 5+pointer;
    }
    nastaveniVzhleduPostavy ='/imges/img_Vlk.png';

}
class Zlodej extends Postava{
        nastaveniJmenaPostavy(){
            return `Zlodej`
        }
    nastaveniZdravi(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*20)*100))/100)
        return 120-pointer;
    }
    nastaveniDamage(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*5)*100))/100)
        return 4+pointer;
    }
        nastaveniVzhleduPostavy = '/imges/img_Zlodej.png';
}

class Obr extends Postava{
        nastaveniJmenaPostavy(){
            return `Obr`
        }
        nastaveniZdravi(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*20)*100))/100)
        return 150-pointer;
    }
    nastaveniDamage(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*6)*100))/100)
        return 7+pointer;
    }
        nastaveniVzhleduPostavy = '/imges/img_Obr.png';
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//ODDELENI TRID KARTY A POSTAVY

abstract class Karta{
    abstract damageKarty():number;
    abstract obrazekKarty:string;
    zobrazeniKarty():string{
        return this.obrazekKarty;
    }
    hraniKartou(pointer:number):number{
        poleKaretnichPolicek[pointer].style.visibility ="hidden";
        poleKaretnichPolicek[pointer].style.pointerEvents="none" ;
        pointerPoradiVybraneKarty=undefined;
        console.log(poleVsechPostav[0]);
        return this.damageKarty();
    }
}
class SilnaRana extends Karta{

    obrazekKarty=`/imges/silna_rana_img.png`;
    private Damage:number= 40;
    damageKarty(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*10)*100))/100)
        if(pointer<5){
            return this.Damage*0;
        }
        else{
            return this.Damage;
        }
    }
}
class ObecnaRana extends Karta{
    obrazekKarty=`/imges/obecna_rana_img.png`;
    private Damage:number= 10;
    damageKarty(): number {
        let pointer:number = Math.ceil((Math.floor((Math.random()*10)*100))/100)
        if (pointer<5) {
           return this.Damage*2;
        }
        else{
            return this.Damage;
        }
    }
}

class Blokovani extends Karta{
    obrazekKarty=`/imges/blokovani_img.png`;
    damageKarty(): number {
        return 0;
    }
    hraniKartou(pointer: number): number {
        poleKaretnichPolicek[pointer].style.visibility ="hidden";
        poleKaretnichPolicek[pointer].style.pointerEvents="none" ;
        pointerPoradiVybraneKarty=undefined;
        this.blokovani();
        return 0;
    }
    blokovani():void{
        soucasnyHrac?.blokovaniFunkce();
    }
    
}


//////////////////////////////////////////////////////////////////////////////////////////////////
class Hrac{
    private Zdravi:number;
    private blokovani:boolean = false;
    constructor(){
        this.Zdravi=100;
        zdraviHraceCislo.innerText=`${this.Zdravi}`;
    }
    zmenseniZdravi(damage:number):void{
        if (this.blokovani ==true) {
            console.log(`hrac blokuje damage`)
            this.blokovani=false;
        }
        else{
            this.Zdravi-=damage;
            if (this.Zdravi<0) {
                zdraviHraceCislo.innerText = `0`;
                this.prohraHrace();
                throw new Error();
                
            }
            zdraviHraceCislo.innerText=`${this.Zdravi}`;
        }
    }

    prohraHrace():void{
        poleVsechKaret=[];
        poleVsechPostav=[];
        prohraHraceGlobal();
    }
    blokovaniFunkce(){
        this.blokovani=true;
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
    let pointer:number = Math.floor((Math.floor((Math.random()*3)*100))/100)
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


function naplneniPole3Karty():void{
    for(let i =0; i<3; i++){
        let pointer:number = Math.floor((Math.floor((Math.random()*3)*100))/100)
        poleZakladnichKaret[pointer]();
    }
}

async function zobrazeniKaret():Promise<void>{
    await wait(500);
    for(let i =0; i<3; i++){
        poleKaretnichPolicek[i].src=poleVsechKaret[i].zobrazeniKarty();
        poleKaretnichPolicek[i].style.visibility="visible";
        poleKaretnichPolicek[i].style.pointerEvents="auto";
    }
}
function mazaniKaret(){
    for(let i =0; i<3; i++){
        poleVsechKaret.splice(0,1);
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////
//Oddeleni pro interkcni funcke

let pointerPoradiVybraneKarty:number|undefined;

function prevzatiPoradiKarty(poradiKarty:number):void{
    poleKaretnichPolicek[poradiKarty].style.border=`2px solid red`
    pointerPoradiVybraneKarty =poradiKarty;
}

let counterTahuKartou:number = 0;

function interakceKartySPostavou():void{
    if( pointerPoradiVybraneKarty != undefined){
        try{
        poleVsechPostav[0].zmenseniZdraviPostavy(poleVsechKaret[pointerPoradiVybraneKarty].hraniKartou(pointerPoradiVybraneKarty));
        }
        catch{}
        counterTahuKartou++
        pointerPoradiVybraneKarty=undefined;
        tahPostavy();
    }
    else{
        console.log(`karta neni vybrana`)
    }
    if (counterTahuKartou==3) {
        naplneniPole3Karty();
        mazaniKaret();
        zobrazeniKaret();
        counterTahuKartou=0;
    }
    for(let karta of poleKaretnichPolicek){
        karta.style.border=`0px`
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//Interakce postavy s hracem
function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tahPostavy(){
    console.log(`tah posatvy`)
    for(let i =0; i<3; i++){
        poleKaretnichPolicek[i].style.pointerEvents = `none`;
    }
    try{
    if(soucasnyHrac!=null)soucasnyHrac.zmenseniZdravi(poleVsechPostav[0].damagePostavy());
    }
    catch{};
    await wait(500);
        for(let i =0; i<3; i++){
        if(poleKaretnichPolicek[i].style.visibility === `visible`){
            poleKaretnichPolicek[i].style.pointerEvents="auto";
        }
    }
}



function prohraHraceGlobal():void{
    soucasnyHrac= null;
    gameOverBackground.style.display = `block`;
    console.log("prohra hrace")
    for(let i =0; i<3; i++){
        poleKaretnichPolicek[i].style.pointerEvents = `none`;
    }

}
// prvni spustena funcke
let soucasnyHrac:Hrac|null;

function innit(){
    soucasnyHrac =new Hrac;
    for(let i =0; i<5; i++){
        pridaniPostav();
    }
    poleVsechPostav[0].inicizacePostavy();
    
        for(let i =0; i<2; i++){
        naplneniPole3Karty();
    }
    zobrazeniKaret();
}

innit();