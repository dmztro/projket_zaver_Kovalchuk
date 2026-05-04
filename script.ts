const hlavniPlocha = document.getElementById("hlavniPlocha") as HTMLDivElement;
const karetniPlocha = document.getElementById("karetniPlocha") as HTMLDivElement;
const polickoPostavy = document.getElementById("polickoPostavy") as HTMLDivElement;
const polickoDalsichPostav = document.getElementById("polickoDalsichPostav") as HTMLDivElement;
const karetniPolicko1 = document.getElementById("karetniPolicko1") as HTMLDivElement;
const karetniPolicko2 = document.getElementById("karetniPolicko2") as HTMLDivElement;
const karetniPolicko3 = document.getElementById("karetniPolicko3") as HTMLDivElement;

const zdraviPostavy = document.getElementById("zdraviPostavy")as HTMLDivElement;
const postava = document.getElementById("postava")as HTMLDivElement;


abstract class Postava{
    protected Zdravi:number = 0;
    protected Damage:number = 0;



    nastaveniZdraviDamage(Zdravi:number, Damage:number):void{
        this.Zdravi =Zdravi;
        this.Damage =Damage;
    }



    zmenseniZdraviPostavy(damage:number):void{

    }

    zobrazeniPostavy():void{

    }

    zanikPostavy():void{

    }

        zdraviPostavy(): number {
         return 0;
    }
    damagePostavy(): number {
        return 0;
    }
}

class Vlk extends Postava{
    nastaveniZdraviDamage(): void {
        
    }
}

class Zlodej extends Postava{

}

class Obr extends Postava{

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



let poleVsechPostav:Postava[]=[];//pole nadchzejicich postav



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



// pole odkud se vyiraji postavy do hlavniho pole
const poleZakladnichPostav = [vytvoreniPostavyVlk,vytvoreniPostavyZlodej,vytvoreniPostavyObr];


// pridani podsav do poleVsechPostav
function pridaniPostav():void{
    let pointer:number = Math.ceil((Math.floor((Math.random()*3)*100))/100)
    poleZakladnichPostav[pointer]();
}


// prvni spustena funcke
function innit(){
    const hracHlavni =new Hrac;

    for(let i =0; i<5; i++){
        pridaniPostav();
    }
    poleVsechPostav[0].zobrazeniPostavy();

}