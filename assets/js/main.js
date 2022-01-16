
(function() {



function play() {
	isPlaying = true;
	pauseBtn.innerHTML = FA_PAUSE;
	timerID = setInterval(gotoNext, interval);
	}

const pausePlay = () =>	isPlaying ?	pause() : play();
	
	function prev() {
		pause();
		gotoPrev();
	}
	
	function next() {
	pause();
	gotoNext();
}

function indicate(e) {
	const target = e.target;
if (target.classList.contains('indicator')) {
	pause();
	gotoNth(+target.dataset.slideTo);
}
}

function pressKey(e) {
	if (e.code === CODE_LEFT_ARROW) prev();
	if (e.code === CODE_RIGHT_ARROW) next();
	if (e.code === CODE_SPACE) pausePlay();
}

function swipeStart(e) {
	swipeStartX = e.changedTouches[0].pageX;
	
}

function swipeEnd(e) {
	swipeEndX = e.changedTouches[0].pageX;
	if (swipeStartX - swipeEndX < -100) prev();
	if (swipeStartX - swipeEndX > 100) next();
}

function initListeners() {pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey)
container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);
}

function init() {
	initListeners();
	timerID = setInterval(gotoNext, interval);
}
init();

}());