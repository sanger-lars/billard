function setup() {
	tavle = createCanvas(cWidth, cHeight);
	tavle.style("visibility", "visible");
	tavle.parent('min_tavle');
	overskrift = createGraphics(cWidth, topSpace+2);
	overskrift.show();
	overskrift.elt.id = 'overskrift'; 
	overskrift.mouseClicked(check_for_felter);
	if (multiNavn != "") {
		hent_multi(); 

		score = 0;

		bUpd = createButton('Update "'+multiNavn+'"');
		bUpd.style('width', '221px');
		bUpd.style('font-size', '20px');
		bUpd.parent('spil');
		bUpd.mouseClicked(hent_multi);
		var menu = select('#menu');
		menu.style("visibility", "hidden");
		
	} else {

		ui_antal = select('#tal');
		ui_antal.style("visibility", "visible");
		ui_antal.value(AntalDeltagere);
		
		bNyt_spil = select('#nyt');

		ui_Mnavn = select("#p-navn");

		bMulti = select("#start-multi");
	
		bSlet_navne = select("#ny-tavle");

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
		tegn_tavleFelter();		
	}
} // Setup