/*jshint esversion: 6 */
import SwipeCarousel from "./swipe-carousel.js";

const carousel = new SwipeCarousel({
  containerID: "#slider",
  slideID: ".item",
  interval: 5000,
  isPlaying: false,
  //direction: 'backward'
});

carousel.init();
