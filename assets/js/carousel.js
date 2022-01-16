function Carousel() {

this.container = document.querySelector('#carousel');
this.slides = this.container.querySelectorAll('.slide');
this.indicators = this.container.querySelectorAll('.indicator');
this.indicatorsContainer = this.container.querySelector('#indicators-container');
this.pauseBtn = this.container.querySelector('#pause-btn');
this.prevBtn = this.container.querySelector('#prev-btn');
this.nextBtn = this.container.querySelector('#next-btn');

this.SLIDES_COUNT = this.slides.length;
this.FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
this.FA_PLAY = '<i class="fa fa-play-circle"></i>';
this.CODE_LEFT_ARROW = 'ArrowLeft';
this.CODE_RIGHT_ARROW = 'ArrowRight';
this.CODE_SPACE = 'Space';

this.currentSlide = 0;
this.isPlaying = true;
this.timerID = null;
this.interval = 1000;
this.swipeStartX = null;
this.swipeEndX = null;
	
}
Carousel.prototype = {
    gotoNth: function(n) { 
        
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },

    gotoPrev: function() {
        this.gotoNth(this.currentSlide - 1)
     },    
    
     gotoNext: function() {
        this.gotoNth(this.currentSlide + 1)
    },
     
    
    pause() {
        this.isPlaying = false;
        this.pauseBtn.innerHTML = this.FA_PLAY;
    clearInterval(this.timerID);
    }

}
Carousel.prototype.constructor = Carousel;
const carousel = new Carousel();