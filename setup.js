function setup() {
	tavle = createCanvas(cWidth, cHeight);
	tavle.style("visibility", "visible");
	tavle.parent('min_tavle');

	if (multiNavn != "") {
		hent_multi(); 

		score = 0;
			//ui_score.html(score + "       "+ navn[aktivPlayer].navn);

		bUpd = createButton("Update");
		bUpd.style('width', '221px');
		bUpd.style('font-size', '20px');
		bUpd.parent('spil');
		bUpd.mouseClicked(hent_multi);
	} else {
		tavle.mouseClicked(check_for_felter);

		ui_antal = select('#tal');
		ui_antal.value(AntalDeltagere);
		
		bMulti = createButton("Start Multigame");
		bMulti.style('margin-right', '120px');
		bMulti.style('float','right');

		let a = createP(' ');
		a.parent('menu');

		bNyt_spil = createButton("Nyt Spil");
		bNyt_spil.size(50);
		bNyt_spil.style('float', 'left');
		bNyt_spil.parent('menu');
		
		ui_Mnavn = createElement('p', " ");
		ui_Mnavn.style('display','inline-block');
		ui_Mnavn.style('font-size', '30px');
		ui_Mnavn.style('margin', '10px');
		ui_Mnavn.parent('menu');

		bSlet_navne = createButton("Ny Tavle");
		bSlet_navne.style('float','right');
		bSlet_navne.style('background','red');
		bSlet_navne.size(50);
		bSlet_navne.parent('menu');


		ui_score = createElement('H1', " ");
		ui_score.style('color', 'white');
		ui_score.style('font-size', '30px');
		ui_score.parent('spil');
		a = createP(' ');
		a.style('font-size', '1px');
		a.parent('spil');
		
		b2 = createButton("2");
		b2.size(75);
		b2.style('font-size', '40px');
		b2.parent('spil');

		bOK = createButton("OK");
		bOK.id('OK');
		bOK.style('font-size', '40px');
		bOK.parent('spil');


		a = createP(' ');
		a.style('font-size', '1px');
		a.parent('spil');

		bslet = createButton("slet");
		bslet.style('font-size', '20px');
		bslet.parent('spil');
		
		bgale = createButton("GALE");
		bgale.style('font-size', '20px');
		bgale.parent('spil');
		
		bUndo = createButton("Undo");
		bUndo.style('font-size', '20px');
		bUndo.style('background','red');
		bUndo.parent('spil');
		let spil_div = select('#spil');
		//spil_div.style('left', '20px');
		//spil_div.style('bottom', '20px');
		//	spil_div.style('left', cWidth+20+'px');
		
		b2.mouseClicked(knap_2);
		bslet.mouseClicked(slet);
		bgale.mouseClicked(knap_gale);
		bOK.mouseClicked(knap_OK);
		bUndo.mouseClicked(knap_Undo);
		ui_antal.changed(lav_extra_navn);
		bSlet_navne.mouseClicked(slet_navne);
		bNyt_spil.mouseClicked(slet_scores);
		bMulti.mouseClicked(lav_multigame);
		
		turNr = 0;
		navn = [];
		// antal_spiller_med = AntalDeltagere;
		tegn_tavleFelter();		
	}
} // Setup