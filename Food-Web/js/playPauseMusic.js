var audio = document.getElementById('audio');
var playPauseSVG = document.getElementById('playPauseSVG');
var count = 0;

function playPause() {
	if(count == 0) {
		count = 1;
		audio.play();
        playPauseSVG.style.fill = "#8221f1";
		playPauseSVG.style.stroke = "#f4e6fc";

		if(localStorage.getItem('cookies') == 'enabled') {
        localStorage.setItem('audio', 'enabled');  }

	} else {
		count = 0;
		audio.pause();
        playPauseSVG.style.fill = "white";
		playPauseSVG.style.stroke = "none";

		if(localStorage.getItem('cookies') == 'enabled') {
        localStorage.setItem('audio', 'disabled'); }
	}
}

 //Only works for non-chrome browsers
if(localStorage.getItem('audio') == 'enabled') {
    audio.play();
	playPauseSVG.style.fill = "#8221F1";
}