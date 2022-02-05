/*jshint esversion: 6 */
/*jshint esversion: 9 */
class Carousel {
    constructor(p) {
        const settings = {...{containerID: '#carousel', slideID:'.slide', interval: 2000, isPlaying: true, direction: 'forward'}, ...p};
        
        this.container = document.querySelector(settings.containerID);
        this.slides = this.container.querySelectorAll(settings.slideID);

        this.interval = settings.interval;     
        this.isPlaying = settings.isPlaying;
        this.direction = settings.direction;
    }

   
    _initProps() {
        this.currentSlide = 0;
             
        this.SLIDES_COUNT = this.slides.length;
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_SPACE = 'Space';
        this.FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fa fa-play-circle"></i>';
        this.FA_PREV = '<i class="fa fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fa fa-angle-right"></i>';
    }
    
    _initIndicators() {
        const indicators = document.createElement('div');
        
        indicators.setAttribute('class', 'indicators');
        
        for (let i = 0; i < this.SLIDES_COUNT; i++) {
            const indicator = document.createElement('div');
            
            indicator.setAttribute('class', 'indicator');
            indicator.dataset.slideTo = `${i}`;
            i === 0 && indicator.classList.add('active');
            
            indicators.append(indicator);
        }
        this.container.append(indicators);
        
        this.indicatorsContainer = this.container.querySelector('.indicators');
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    }

    _initControls() {
        const controls = document.createElement('div');
        const PAUSE = `<span id="pause-btn" class="control control-pause">
        <span id="fa-pause-icon">${this.FA_PAUSE}</span>
        <span id="fa-play-icon">${this.FA_PLAY}</span>
        </span>`;
        const PREV = `<span id="prev-btn" class="control control-prev">${this.FA_PREV}</span>`;
        const NEXT = `<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`;
        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;
        this.container.append(controls);
        
        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');

        this.pauseIcon = document.querySelector('#fa-pause-icon');
        this.playIcon = document.querySelector('#fa-play-icon');
        this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
    }

    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this));
        this.container.addEventListener('mouseenter', this._pause.bind(this));
        this.container.addEventListener('mouseleave', this._play.bind(this));


    }

    _gotoNth(n) { 
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    }

    _gotoPrev() {
        this._gotoNth(this.currentSlide - 1);
     }
    
    _gotoNext() {
        this._gotoNth(this.currentSlide + 1);
    }
    
    _pause() {
        if (this.isPlaying) {
        this.isPlaying = false;
        this.pauseIcon.style.opacity = 0;
        this.playIcon.style.opacity = 1;
        clearInterval(this.timerID);
        }
    }
    
    _play() {
        if (!this.isPlaying) {
    this.isPlaying = true;
    this.pauseIcon.style.opacity = 1;
    this.playIcon.style.opacity = 0;
    this._tick();
        }
    }
    
    _indicate(e) {
    const target = e.target;
    if (target.classList.contains('indicator')) {
        this._pause();
        this._gotoNth(+target.dataset.slideTo);
    }
    }
    
    _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
    }
    
    _tick(flag = true) {
        console.log(flag);
        if (!flag) return;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    }
    
    pausePlay() {
        this.isPlaying ? this._pause() : this._play();
    }
    
    prev() {
        this._pause();
    this._gotoPrev();
}
    
    next() {
    this._pause();
    this._gotoNext();
}
    
    init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
}
}

export default Carousel;

// #1
// _initConfig(objectParams) {

//     const defaultSettings = {
//         containerID: '#carousel',
//         slideID:'.slide',
//         interval: 2000, 
//         isPlaying: true,
//         direction: 'forward'
//     };

//     if (typeof objectParams !== undefined) {
//         defaultSettings.containerID = objectParams.containerID || defaultSettings.containerID;
//         defaultSettings.slideID = objectParams.slideID || defaultSettings.slideID;
//         defaultSettings.interval = objectParams.interval || defaultSettings.interval;
//         defaultSettings.isPlaying = objectParams.isPlaying || defaultSettings.isPlaying;
//         defaultSettings.direction = objectParams.direction || defaultSettings.direction;
//     }

     
//     return defaultSettings;
// }

// #2
// _initConfig(objectParams) {

//     console.log({...objectParams});

//     const defaultSettings = {
//         containerID: '#carousel',
//         slideID:'.slide',
//         interval: 2000, 
//         isPlaying: true,
//         direction: 'forward'
//     };

//     const result = {...defaultSettings, ...objectParams};

//     return result;
// }

// #3
// const settings = this._initConfig(params);
// _initConfig(o) {
//     return {...{containerID: '#carousel', slideID:'.slide', interval: 2000, isPlaying: true, direction: 'forward'}, ...o};
//     }