

function check_parameter() {
  let zzz = "";
  zzz = window.location.search;
  if (zzz != "") {
    // vis gem og slet knapper
	// if (zzz == "?gem")
  }

} // check_parameter


function gem_multi(mulNavn, navn, aktiv) {
	var posting = $.post("bill.php", {
	  multiNavn: mulNavn,
	  aktivSpiller: aktiv,
	  navn: JSON.stringify(navn) 
	})
	.done(function (data) {
	  alert('OK ?'+data);
	})
	.fail(function () {
	  alert("failed");
	});
  
}