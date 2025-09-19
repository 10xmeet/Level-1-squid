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
const headerVideoWrapper = document.querySelector('.video-wrapper');
const actorVideoContainer = document.querySelector('.actor-video');
let headerPlayer;
let actorPlayer;

// Load YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create YouTube player when API is ready
function onYouTubeIframeAPIReady() {
  headerPlayer = new YT.Player('header-video', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
  
  actorPlayer = new YT.Player('actor-video', {
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

document.querySelector('.watch-button').onclick = () => {
  headerVideoWrapper.classList.add('active');
};

actorVideoContainer.addEventListener('click', () => {
    actorVideoContainer.querySelector('iframe').classList.add('active');
    actorPlayer.playVideo();
  });

document.addEventListener('click', (event) => {
  const isClickInsideActorVideo = actorVideoContainer.contains(event.target);
  const isActorVideoActive = actorVideoContainer.querySelector('iframe').classList.contains('active');

  if (!isClickInsideActorVideo && isActorVideoActive) {
    actorVideoContainer.querySelector('iframe').classList.remove('active');
    if (actorPlayer) {
      actorPlayer.pauseVideo();
    }
  }
});

document.querySelector('.close-video').onclick = () => {
  headerVideoWrapper.classList.remove('active');
  actorVideoContainer.querySelector('iframe').classList.remove('active');
  playpausevideo();
};

function playpausevideo() {
  if (headerPlayer) {
    const state = headerPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      headerPlayer.pauseVideo();
      // button.innerHTML = "<i class='bx bx-play' ></i>";
    } else {
      headerPlayer.playVideo();
      // button.innerHTML = "<i class='bx bx-pause' ></i>";
    }
  }
  if (actorPlayer) {
    const state = actorPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      actorPlayer.pauseVideo();
    } else {
      actorPlayer.playVideo();
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
