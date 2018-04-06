
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