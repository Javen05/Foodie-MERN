var angleCounter = 0;
var scrollCount = 0;
window.addEventListener('wheel',function(event) {
  if (event.deltaY > 0) {

		angleCounter += 45;
		scrollCount += 1;

		$(".main_box").css({"transform":"rotate("+ angleCounter + "deg"});
		$(".proBox").removeClass('active');

		if(scrollCount >= 3) {scrollCount = 0}
		$(".proBox").eq(scrollCount).addClass('active');
		
	}
	
	if (event.deltaY < 0) {	

		angleCounter -= 45;
		scrollCount -= 1;

		$(".main_box").css({"transform":"rotate("+ angleCounter + "deg"});
		$(".proBox").removeClass('active');

		if(scrollCount <= -3) {scrollCount = 0}
		$(".proBox").eq(scrollCount).addClass('active');

	}
})