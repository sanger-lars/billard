
function gem_multi(mulNavn, turNr, navn, aktiv) {
	var turNrr = turNr.toString();
	var posting = $.post("bill.php", {
	  multiNavn: mulNavn,
	  turNr: turNrr,
	  aktivSpiller: aktiv,
	  navn: JSON.stringify(navn) 
	})
	.done(function (data) {
	  
	})
	.fail(function (err) {
	  alert("failed "+err);
	  console.log(err);
	});
  
}


function hent_multi() {
	if (multiNavn != "") {
	  var posting = $.post("bill.php", {
	    hent: "ja",
	    multNavn: multiNavn,
	    turNr: turNr 
	  })
	  .done(function (data) {
	    var nydata = JSON.parse(data);
	    //navn = nynavn.0.navn;
	    aktivPlayer = nydata[0].aktivSpiller; 
	    var xnavn = nydata[0].navn; 
	    navn = JSON.parse(xnavn);
		AntalDeltagere = navn.length-1;
		tilpas_skaerm();
		tegn_tavleFelter();
		
		for (var i = 1; i <= AntalDeltagere; i++) {
			skriv_navn(navn[i]);
			skriv_point(navn[i]);
		}
	    //return({ data: nydata[0], nvn: navn, ap: aktivPlayer });
	  })
	  .fail(function () {
	    alert("failed");
	  });
	}
};


function slet_multigame() {
	var posting = $.post("bill.php", {
	slet: "S",
	multiNavn: multiNavn
  })
  .done(function () {
  })
  .fail(function () {
    alert("failed");
  });
};


function lav_multigame() {
	if (bMulti.html() == "Start Multigame") {
		multiNavn = prompt("indtast navn til spillet -> ");
		
		slet_multigame(); 
		debugger;	
		bMulti.html("Slet Multigame");
		multigame = true;
		ui_Mnavn.html(multiNavn);
	} else {
		slet_multigame() 
		multigame = true;
		bMulti.html("Start Multigame");
		multigame = false;
		ui_Mnavn.html(" ");
	}
}


function tilpas_skaerm() {
	let del = (cWidth / AntalDeltagere) / 2;
	for (var i = 1; i <= AntalDeltagere; i++) {
		if (i == 1) {
			navn[i].startCol = del;
		}
		else {
			navn[i].startCol = (del*(2*i-1));	
		}		
	}
}


function skriv_navn(nav) {
	overskrift.textSize(font_size+sizePlus);
	if (nav.faerdig == false) {overskrift.fill(255);}
	else {overskrift.fill(100);}
	overskrift.stroke(0);
	overskrift.text(nav.navn, nav.startCol-(overskrift.textWidth(nav.navn)/2), topSpace*0.70);
}


function skriv_point(nav) {
	er_spillet_igang = true; 
	textSize(font_size);
	if (nav.faerdig == false) {fill(255);}
	else {fill(100);}
	let startRk = topSpace+5;
	for (var i = 1;i < nav.score.length; i++) {
		var rkk = startRk+(i*font_size);
		if (nav.score[i] >= 100) {
			// Gale
			if (nav.faerdig == false) {stroke(255);}
			else {stroke(100);}
			line(nav.startCol-15, rkk, nav.startCol+15, rkk-15);
		}
		else {
			// Gode
			stroke(0);
			text(nav.score[i], nav.startCol-(textWidth(nav.score[i])/2), rkk);
		}	
	}
} // skriv_point