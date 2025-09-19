/* ========== sticky menu =========== */
const menu = document.querySelector('.navigation');

document.querySelector('.hamburger').onclick = function () {
  menu.classList.add('show');
};

document.querySelector('.close').onclick = function () {
  menu.classList.remove('show');
};

addEventListener('scroll', function () {
  const header = document.querySelector('.nav-bar');
  header.classList.toggle('sticky', window.scrollY > 0);
});

/* ========== Video PopUp =========== */
const videoIframe = document.querySelector('.video');
const button = document.querySelector('.video-control');
const videoWrapper = document.querySelector('.video-wrapper');
let player;

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create YouTube player when API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('header-video', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
  
  // Create player for actor section video
  new YT.Player('actor-video', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    button.innerHTML = "<i class='bx bx-pause' ></i>";
  } else {
    button.innerHTML = "<i class='bx bx-play' ></i>";
  }
}

['.watch-button', '.actor-video'].forEach((el) => {
  document.querySelector(el).onclick = () => {
    videoWrapper.classList.add('active');
  };
});

document.querySelector('.close-video').onclick = () => {
  videoWrapper.classList.remove('active');
  if (player) player.pauseVideo();
};

function playpausevideo() {
  if (player) {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      button.innerHTML = "<i class='bx bx-play' ></i>";
    } else {
      player.playVideo();
      button.innerHTML = "<i class='bx bx-pause' ></i>";
    }
  }
}

button.addEventListener('click', playpausevideo);

/* ========== review slide =========== */

var swiper = new Swiper('.review-slide', {
  direction: 'vertical',

  navigation: {
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
});
