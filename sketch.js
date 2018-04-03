let b2, bslet, bgale, bOK, bSlet_navne, bNyt_spil;
let ui_score, ui_tur, ui_antal, bNyt_navn;
let tavle;
let cWidth = 640;
let cHeight = 1000;
const topSpace = 60;
const font_size = 32;
let aktivPlayer = 1;
let score = 0;
let navn = [];
let AntalDeltagere = 1;
let antal_spiller_med = AntalDeltagere;
let er_spillet_igang = false;


class Player {
	constructor(tmp_navn, sY) {
		this.navn = tmp_navn;
		this.faerdig = false;
		this.kryds = false;
		this.score = [60];
		this.startCol = sY;
	}
	
	skriv_navn() {
		textSize(font_size);
		if (this.faerdig == false) {fill(255);}
		else {fill(100);}
		stroke(0);
		text(this.navn, this.startCol-(textWidth(this.navn)/2), topSpace*0.70);
	}

	skriv_point() {
		er_spillet_igang = true; 
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
	}

	lav_score(scor) {
		if (!this.faerdig) {
		if (scor < 0) {
			// gale
			if (this.kryds) {
				this.score.push(100);
			} else {
				this.score.push(this.sidste_score()+100);
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
					// check for flere end 2 spillere
					if (antal_spiller_med == 2) {
						if (confirm(this.navn+" Du står på nul. Er du færdig ? (Annuller=X)")) {
							this.vinder();
						}
						else {
							pp = 0;
							this.score.push("X");
							this.kryds = true;
						}
					} 
					else {
						this.vinder();
					}
				} 
				else {this.score.push(pp);}
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
			navn[1].skriv_navn();
			aktivPlayer = 1;
			
			ui_score.html(score + " "+ navn[aktivPlayer].navn);
		} else {
			navn[i] = new Player(prompt("indtast navn -> "), del*(2*i-1));
			navn[i].skriv_navn();		
		}
	}
}


function slet_navne() {
	navn = [" "];
	antal_spiller_med = AntalDeltagere;
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
	let del = cWidth / AntalDeltagere;
	for (var i = 1; i < AntalDeltagere; i++) {
		line(del*i, 5, del*i, cHeight-5);
	}
	line(5, topSpace, cWidth-5, topSpace);
}


function skift_spiller(aktiv) {	
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


function knap_OK() {
	if ((score != 0) && (navn[aktivPlayer].faerdig) != true) {
		navn[aktivPlayer].lav_score(score);
		if (score < 0) {
			let gode = -score;
			for (i = 1; i <= AntalDeltagere; i++) {
				if (i != aktivPlayer) {
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
	ui_score.html(score + " "+ navn[aktivPlayer].navn);
	if (antal_spiller_med == 1) {
		alert("Spillet er slut. "+navn[aktivPlayer].navn+" har vundet retten til at give en omgang.");
		er_spillet_igang = false;
	}

} // knap_OK


function knap_2() {
	score = score+2;
	ui_score.html(score + " "+ navn[aktivPlayer].navn);
}


function knap_gale() {
	score = -score;
	ui_score.html(score + " "+ navn[aktivPlayer].navn);
}


function slet() {
	score = 0;
	ui_score.html(score + " "+ navn[aktivPlayer].navn);
}


function setup() {
	tavle = createCanvas(cWidth, cHeight);
	tavle.style("visibility", "visible");
	tavle.parent('min_tavle');
	tavle.mouseClicked(check_for_felter);

	ui_antal = select('#tal');
	ui_antal.value(AntalDeltagere);
	
	let a = createP(' ');
	a.parent('menu');

	bSlet_navne = createButton("Ny Tavle");
	bSlet_navne.parent('menu');
	
	bNyt_spil = createButton("Nyt Spil");
	bNyt_spil.parent('menu');

	ui_score = createElement('H1', " ");
	ui_score.parent('spil');
	
	b2 = createButton("2");
	b2.size(100);
	b2.style('font-size', '50px');
	b2.parent('spil');

	bOK = createButton("OK");
	bOK.style('font-size', '50px');
	bOK.parent('spil');
	
	a = createP(' ');
	a.parent('spil');

	bslet = createButton("slet");
	bslet.style('font-size', '30px');
	bslet.parent('spil');
	
	bgale = createButton("GALE");
	bgale.style('font-size', '30px');
	bgale.parent('spil');
	
	let spil_div = select('#spil');
	spil_div.style('left', cWidth+20+'px');

	b2.mouseClicked(knap_2);
	bslet.mouseClicked(slet);
	bgale.mouseClicked(knap_gale);
	bOK.mouseClicked(knap_OK);
	ui_antal.changed(lav_extra_navn);
	bSlet_navne.mouseClicked(slet_navne);
	bNyt_spil.mouseClicked(slet_scores);
	
	// antal_spiller_med = AntalDeltagere;
	tegn_tavleFelter();
} // Setup