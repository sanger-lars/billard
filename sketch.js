let b2, bslet, bgale, bOK, bSlet_navne, bNyt_spil, bUndo;
let ui_score, ui_tur, ui_antal, bNyt_navn, bMulti, bUpd, div_navn;
let tavle;
let cWidth =  window.innerWidth; // window.screen.width; //640px
let cHeight = 1000;
const topSpace = 60;
const font_size = 25;
const sizePlus = 5;
let aktivPlayer = 1;
let ap;
let score = 0;
let navn = [];
let AntalDeltagere = 1;
let antal_spiller_med = AntalDeltagere;
let er_spillet_igang = false;
let undo = [];
let iii, turNr;
let overskrift;


function check_parameter() {
  let zzz = "";
  zzz = window.location.search;
  if (zzz != "") {
  	return zzz.substring(1, 10);
    // vis gem og slet knapper
	// if (zzz == "?gem")
  } else {return "";}

} // check_parameter

var multiNavn = check_parameter();
let multigame = false;



class Player {
	constructor(tmp_navn, sY) {
		this.navn = tmp_navn;
		this.faerdig = false;
		this.kryds = false;
		this.score = [60];
		this.startCol = sY;
	}
	
	skriv_navn() {
		overskrift.textSize(font_size+sizePlus);
		if (this.faerdig == false) {overskrift.fill(255);}
		else {overskrift.fill(100);}
		overskrift.stroke(0);
		overskrift.text(this.navn, this.startCol-(overskrift.textWidth(this.navn)/2), topSpace*0.70);
	}

	skriv_point() {
		textSize(font_size);
		if (this.faerdig == false) {fill(255);}
		else {fill(100);}
		let startRk = topSpace+5;
		for (var i = 1;i < this.score.length; i++) {
			var rkk = startRk+(i*font_size);
			if (this.score[i] >= 100) {
				// Gale
				if (this.faerdig == false) {stroke(255);}
				else {stroke(100);}
				line(this.startCol-15, rkk, this.startCol+15, rkk-15);
			}
			else {
				// Gode
				stroke(0);
				text(this.score[i], this.startCol-(textWidth(this.score[i])/2), rkk);
			}	
		}
	} // skriv_point
	
	sidste_score() {
		let ss = this.score[this.score.length-1];
		if (ss >= 100) {
			ss = ss - 100;
		}
		return ss;
	} 

	vinder() {
		alert ("tillykke "+this.navn+". Du er ude af spillet !");
		this.faerdig = true;
		antal_spiller_med = antal_spiller_med -1;
		if (antal_spiller_med == 0) {
			er_spillet_igang = false;
		}
		undo[iii] = -1;
	}

	lav_score(scor) {
		if (!this.faerdig) {
		if (scor < 0) {
			// gale
			if (this.kryds) {
				this.score.push(100);
				undo[ap] = 1;
			} else {
				this.score.push(this.sidste_score()+100);
				undo[iii] = 1;
			}
		}
		else {
			// gode
			let pp;
			if (this.kryds) {
				this.vinder();
			}
			else {
				// ikke kryds
				pp = this.sidste_score()-scor;
				if (pp <= 0) { // har score passeret nul ?
					if (confirm(this.navn+" Du står på nul. Er du færdig ? (Annuller=X)")) {
						this.vinder();
					}
					else {
						pp = 0;
						this.score.push("X");
						this.kryds = true;
						undo[iii] = 2;
					}	
				} 
				else {
					this.score.push(pp);
					undo[iii] = 1;

				}
			}	
		}}
	}

} // class Player


function check_for_felter() {
	let del = (cWidth / AntalDeltagere) / 2;

	i = Math.floor(map(mouseX, 0, cWidth, 0, AntalDeltagere)) + 1;
	if (mouseY <= topSpace) {
		// navne felter
		if (i == 1) {
			navn[1] = (new Player(prompt("indtast navn -> "), del));
			aktivPlayer = 1;
			
			ui_score.html(score + "&emsp;" + navn[aktivPlayer].navn);
		} else {
			navn[i] = new Player(prompt("indtast navn -> "), del*(2*i-1));		
		}
		tegn_tavleFelter();
		for (i = 1; i <= AntalDeltagere; i++) {
			if (navn[i]) {
				navn[i].skriv_navn();
				navn[i].skriv_point();
			}
		}
	}
}


function slet_navne() {
	navn = [" "];
	antal_spiller_med = AntalDeltagere;
	ui_score.html(" ");
	tegn_tavleFelter();
}


function slet_scores() {
	tegn_tavleFelter();
	for (var i = 1; i <= AntalDeltagere; i++) {
		navn[i].kryds = false;
		navn[i].faerdig = false;
		navn[i].score = [60];
		navn[i].skriv_navn();
	}
	antal_spiller_med = AntalDeltagere;
	turNr = 0;
}


function edit_tabel(minus) {
	let del = (cWidth / AntalDeltagere) / 2;
	for (var i = 1; i < AntalDeltagere; i++) {
		if (i == 1) {
			navn[i].startCol = del;
		}
		else {
			navn[i].startCol = (del*(2*i-1));	
		}
		navn[i].skriv_navn();
		if (er_spillet_igang) {
			navn[i].skriv_point();
		}		
	}
	if (minus) {
		navn[i].startCol = (del*(2*i-1));
		navn[i].skriv_navn();
		if (er_spillet_igang) {
			navn[i].skriv_point();
		}
	}
 	antal_spiller_med = AntalDeltagere;
}


function slet_sidste_spiller(antal_spillere) {
	if (navn.length > antal_spillere + 1) {
		navn.pop();
	}
}


function lav_extra_navn() {
	AntalDeltagere = parseInt(ui_antal.value());
	const minus = true;
	tegn_tavleFelter();
	if (navn.length > 0) { // hvis navne i tabellen
		if (AntalDeltagere < antal_spiller_med) {
			edit_tabel(minus);
			slet_sidste_spiller(antal_spiller_med);
		}
		else {edit_tabel(!minus);}
	} else {antal_spiller_med = AntalDeltagere;}	
}


function tegn_tavleFelter() {
	background(0);
	stroke(255);
	strokeWeight(4);
	overskrift.background(0);
	overskrift.stroke(255);
	overskrift.strokeWeight(4);
	let del = cWidth / AntalDeltagere;
	for (var i = 1; i < AntalDeltagere; i++) {
		overskrift.line(del*i, 5, del*i, topSpace+2);
		line(del*i, 5, del*i, cHeight-5);
	}
	overskrift.line(5, topSpace, cWidth-5, topSpace);
}


function skift_spiller(aktiv) {
	if (er_spillet_igang) {
		if (aktiv >= AntalDeltagere) {
			aktivPlayer = 1;
		}
		else {
			aktivPlayer = aktivPlayer+1;
		}
		while (navn[aktivPlayer].faerdig) {
			aktivPlayer = aktivPlayer+1;
			if (aktivPlayer > AntalDeltagere) {
				aktivPlayer = 1;
			}
		}
	}
}


function knap_OK() {
	undo = [];
	er_spillet_igang = (antal_spiller_med > 0); 
	ap = aktivPlayer;
	iii = ap;
	if ((score != 0) && (navn[aktivPlayer].faerdig != true)) {
		navn[aktivPlayer].lav_score(score);
		if (score < 0) {
			let gode = -score;
			for (i = 1; i <= AntalDeltagere; i++) {
				if (i != aktivPlayer) {
					iii = i;
					navn[i].lav_score(gode);
				}
			}		
		}
	}
	tegn_tavleFelter();
	for (i = 1; i <= AntalDeltagere; i++) {
		navn[i].skriv_navn();
		navn[i].skriv_point();
	}
	score = 0;
	skift_spiller(aktivPlayer);
	ui_score.html(score + "&emsp;" + navn[aktivPlayer].navn);
	if (antal_spiller_med == 1 && AntalDeltagere > 1) {
		alert("Spillet er slut. "+navn[aktivPlayer].navn+" har vundet retten til at give en omgang.");
		er_spillet_igang = false;
	}
	if (multigame) {
		turNr = turNr + 1;
		gem_multi(multiNavn, turNr, navn, aktivPlayer);
	}
} // knap_OK


function knap_Undo() {
	console.log(undo);
	if (!er_spillet_igang) {er_spillet_igang = true;}
	for (iii = 1; iii < undo.length; iii++) {
		if (undo[iii] == 1) {navn[iii].score.pop();}
		else if (undo[iii] == -1) {
			navn[iii].faerdig = false;
			antal_spiller_med = antal_spiller_med + 1;
		}
		else if (undo[iii] == 2) {
			navn[iii].kryds = false;
			navn[iii].score.pop();
		}
	}
	aktivPlayer = ap;

	if (multigame) {
		turNr = turNr + 1;
		gem_multi(multiNavn, turNr, navn, aktivPlayer);
	}

	tegn_tavleFelter();
	for (i = 1; i <= AntalDeltagere; i++) {
		navn[i].skriv_navn();
		navn[i].skriv_point();
	}
	score = 0;
	ui_score.html(score + "&emsp;" + navn[aktivPlayer].navn);
}


function knap_2() {
	score = score+2;
	ui_score.html(score + "&emsp;" + navn[aktivPlayer].navn);
}


function knap_gale() {
	score = -score;
	ui_score.html(score + "&emsp;" + navn[aktivPlayer].navn);
}


function slet() {
	score = 0;
	ui_score.html(score + "&emsp;" + navn[aktivPlayer].navn);
}


function hide_spil() {
	var elmnt = document.getElementById("spil");
	if (window.scrollY > 400) {
		elmnt.style.display = "none";
	} else {
		elmnt.style.display = "block";
	}
	
}

