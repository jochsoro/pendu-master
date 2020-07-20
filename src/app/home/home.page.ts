import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  motSecret;
				
  now=new Date();			// Date d'aujourd'hui
  tableauMot=new Array();	// Le tableau qui contient les lettres du mot à trouver
  mots=new Array();		// Le tableau qui contient tous les mots possibles
  
  tailleMot;				// Le nombre de lettres du mot à trouver
  coupsManques=0;			// Le nombre de lettres fausses essayées
  coupsRestant=9;         // Le nombre de coups restant
  lettresTrouvees=0;		// Le nombre de lettres trouvées
  fini=false;				// true si le jeu est terminé
  cur_img: string;
        
  str: string = 'TITANESQUE,ANABELLE,POMPIER,OBELISQUE,PLACARD,RADIATEUR,DEODORANT,CAMION,HORLOGE,MARGUERITE,\
  ELEPHANT,IGLOO,NAVIRE';

  //str: string;


  constructor(private http: HttpClient){
     /* let localData = this.http.get('assets/dico_fr.json').map(res => res.json().items);
      localData.subscribe(data => {
        console.log(data);
      })*/
  }


  ngOnInit(): void {    
    this.cur_img="assets/images/pendu_0.jpg";
    var res = this.str.split(",");
    for(var i = 0; i < res.length;)
    {
      this.mots[i] = res[i];
      i++;
    }
      // On prend un mot au hasard en fonction de la seconde en cours
  this.motSecret= this.mots[this.now.getSeconds() % this.mots.length];
  this.tailleMot=this.motSecret.length;

    for(var i=0; i<this.tailleMot; i++) 
      this.tableauMot[i]=this.motSecret.charAt(i);
  }

  help(){
    alert('Entrez une lettre gràce au clavier ci-contre ; si elle est dans le mot secret, elle sera affichée mais sinon... la sentence se rapprochera !');
  }

  newGame(){
    location.reload();
  }

		//Permet de changer la couleur des touches du clavier
				changeCouleur(element,couleur){
					document.getElementById(element).style.backgroundColor=couleur;
					document.getElementById(element).style.color="white";
				}
				
				// Gère tous les traitements à faire lorsqu'on appuie sur une touche
				lettreChoisie(element){				
          //alert(element);	
					// Si la couleur de fond est #e64e02, c'est qu'on a déjà essayé - on quitte la fonction
					if(document.getElementById(element).style.backgroundColor=="#e64e02" || this.fini ) return;
					
					// On récupère la lettre du clavier et on met la touche en #e64e02 (pour signaler qu'elle est cliquée)
          //var lettre=element.innerHTML;
          //alert(element);
					this.changeCouleur(element,"#e64e02");
					
					// On met la variable trouve à false;
					var trouve=false;
					
					// On parcours chaque lettre du mot, on cherche si on trouve la lettre sélectionnée au clavier
					for(var i=0; i<this.tailleMot; i++) {
						
						// Si c'est le cas :
						if(this.tableauMot[i]==element) {
              let j:any = i;
							document.getElementById(j).style.visibility='visible';	// On affiche la lettre
							trouve=true;
							this.lettresTrouvees++;
						}
						
					}
					
					// Si la lettre n'est pas présente, trouvé vaut toujours false :
					if(!trouve){
						this.coupsManques++;
						this.coupsRestant--;
						this.cur_img="assets/images/pendu_"+this.coupsManques+".jpg"; // On change l'image du pendu
						//document.getElementById("nbre_essai").innerHTML = this.coupsRestant;			
						//document.getElementById('nbre_essai').html(coupsRestant);
						
						// Si on a raté 9 fois :
						if(this.coupsManques==9){
							alert("Vous avez perdu !");
              for(var i=0; i<this.tailleMot; i++) {
                let j:any = i;
                document.getElementById(j).style.visibility='visible';	// On affiche la lettre
              }
							this.fini=true;
							// on affiche le mot, le jeu est terminé
						}
					}
					if(this.lettresTrouvees==this.tailleMot){
						alert("Bravo ! Vous avez découvert le mot secret !");
						this.fini=true;
					}
				}

}
