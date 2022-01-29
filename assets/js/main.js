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
            this.gotoNth(this.currentSlide - 1);
         },    
        
         gotoNext: function() {
            this.gotoNth(this.currentSlide + 1);
        },
        
        pause() {
            this.isPlaying = false;
            this.pauseBtn.innerHTML = this.FA_PLAY;
        clearInterval(this.timerID);
        },
        
        play() {
        this.isPlaying = true;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.timerID = setInterval(this.gotoNext, this.interval);
        },
    
    pausePlay: function() {
        this.isPlaying ? this.pause() : this.play();
    },
    
    prev: function() {
        this.pause();
        this.gotoPrev();
        },
        
    next: function() {
        this.pause();
        this.gotoNext();
    },
    
    indicate: function(e) {
        const target = e.target;

    if (target.classList.contains('indicator')) {
        this.pause();
        this.gotoNth(+target.dataset.slideTo);
    }
    },
    
    pressKey: function(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },
    
    swipeStart: function(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    },
    
    swipeEnd: function(e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX < -100) this.prev();
        if (this.swipeStartX - this.swipeEndX > 100) this.next();
    },
    
    initListeners: function() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    },
    
    init: function() {
        this.initListeners();
        this.timerID = setInterval(() => this.gotoNext(), this.interval);
    }
    };
    Carousel.prototype.constructor = Carousel;
    
    const carousel = new Carousel();
    
    carousel.init();