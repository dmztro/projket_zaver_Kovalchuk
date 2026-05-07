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
        poleVsechPostav.splice(0)
        pridaniPostav();
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


abstract class Karta{
    abstract damageKarty():number;
    zobrazeniKarty():void{

    }
}
class SilnaRana extends Karta{
    private Damage:number= 0;
    damageKarty(): number {
        return 0;
    }
}
class ObecnaRana extends Karta{
    private Damage:number= 0;
    damageKarty(): number {
        return 0;
    }
}

class Blokovani extends Karta{
    damageKarty(): number {
        return 0;
    }
    blokovani():void{
        
    }
    
}

class Hrac{
    private Zdravi:number = 0;

    zmenseniZdravi():void{

    }
    aktualniStavZdravi():number{
        return this.Zdravi;
    } 

}



let poleVsechPostav:Postava[]=[];//hlavni pole postav

let poleVsechKaret:Karta[]=[]//hlavni pole karet


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



// pole odkud se vybiraji postavy do hlavniho pole
const poleZakladnichPostav = [vytvoreniPostavyVlk,vytvoreniPostavyZlodej,vytvoreniPostavyObr];


// pridani podsav do poleVsechPostav
function pridaniPostav():void{
    let pointer:number = Math.ceil((Math.floor((Math.random()*3)*100))/100)
    poleZakladnichPostav[pointer]();
}


const poleZakladnichKaret=[vytvoreniKartySilnaRana,vytvoreniKartyObcenaRana,vytvoreniKartyBlokovani];

function pridaniKaret():void{
    let pointer:number = Math.ceil((Math.floor((Math.random()*3)*100))/100)
    poleZakladnichKaret[pointer]();
}


function zobrazeniKaret():void{
    for(let i =0; i<3; i++){
        poleVsechKaret[i].zobrazeniKarty();
    }
}




// prvni spustena funcke
function innit(){
    const hracHlavni =new Hrac;

    for(let i =0; i<5; i++){
        pridaniPostav();
    }
    poleVsechPostav[0].inicizacePostavy();

        for(let i =0; i<6; i++){
        pridaniKaret();
    }

}