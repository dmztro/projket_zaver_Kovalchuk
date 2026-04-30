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
    abstract zdraviPostavy():number;
    abstract damagePostavy():number;
    zobrazeniPostavy():void{

    }
    zanikPostavy():void{

    }
}
class Vlk extends Postava{
    private pocatecniZdravi:number = 0;
    private pocatecniDamage:number = 0;
    zdraviPostavy(): number {
        return 0;
    }
    damagePostavy(): number {
        return 0;
    }
}
class Zlodej extends Postava{
    private pocatecniZdravi:number = 0;
    private pocatecniDamage:number = 0;
    zdraviPostavy(): number {
        return 0;
    }
    damagePostavy(): number {
        return 0;
    }
}
class Obr extends Postava{
    private pocatecniZdravi:number = 0;
    private pocatecniDamage:number = 0;
    zdraviPostavy(): number {
        return 0;
    }
    damagePostavy(): number {
        return 0;
  }
}

abstract class Karta{
    abstract damageKarty():number;
    zobrazeniKarty():void{

    }
}
class SilnaRana extends Karta{
    private pocatecniDamage:number= 0;
    damageKarty(): number {
        return 0;
    }
}
class ObecnaRana extends Karta{
    private pocatecniDamage:number= 0;
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
    private zdravi:number = 0;

    zmenseniZdarvi():void{

    }
    aktualniStavZdarvi():number{
        return this.zdravi;
    } 

}

let poleVsechPostav:Postava[]=[];//pole nadchzejicich postav


function innit(){
    const hracHlavni =new Hrac;


}
const pole:Postava[]=[new Vlk(), new Vlk()];

// pridani podsav do poleVsechPostav
function pridaniPostav():void{

}