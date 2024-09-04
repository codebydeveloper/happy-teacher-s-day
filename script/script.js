const messages = [
     "Thank you for being an inspiring teacher.",
     "Your guidance has made a huge difference in our lives.",
     "Wishing you a Happy Teacher's Day filled with love and joy!",
     "Your dedication and passion for teaching are truly inspiring.",
     "You make learning a joy and foster a love for knowledge.",
     "Your support and encouragement have helped us reach new heights.",
     "Thank you for being a beacon of wisdom and kindness.",
     "Your influence extends far beyond the classroom, shaping our futures.",
     "We are grateful for your unwavering commitment and guidance.",
     "Your positive impact on our lives is immeasurable and deeply appreciated.",
     "On this special day, we celebrate you and all that you do for us.",
     "May your day be filled with the same joy and inspiration you bring to others.",
     "You have touched our hearts with your generosity and dedication.",
     "Happy Teacher's Day Ma'am."
   ];
   
   let i = 0;
   let j = 0;
   let currentMessage = [];
   let isDeleting = false;
   let isEnd = false;
   
   const audioPlayer = document.getElementById('audio-player');
   const playPauseBtn = document.getElementById('play-pause');
   const nextBtn = document.getElementById('next');
   const prevBtn = document.getElementById('prev');
   
   const songs = [
     'music/song1.mp3',
     'music/song2.mp3',
     'music/song3.mp3',
     'music/song4.mp3',
     'music/song5.mp3',
     'music/song6.mp3'
   ];
   
   let currentSongIndex = 0;
   
   const nameSpan = document.getElementById('name');
   const submitNameBtn = document.getElementById('submit-name');
   const teacherNameInput = document.getElementById('teacher-name');
   const nameInputContainer = document.getElementById('name-input-container');
   const content = document.getElementById('content');
   
   function playSong(index) {
     audioPlayer.src = songs[index];
     audioPlayer.play();
   }
   
   function loop() {
     isEnd = false;
     document.getElementById("typed-message").innerHTML = currentMessage.join("") + (isDeleting ? '|' : '');
   
     if (i < messages.length) {
       if (!isDeleting && j <= messages[i].length) {
         currentMessage.push(messages[i][j]);
         j++;
       }
   
       if (isDeleting && j <= messages[i].length) {
         currentMessage.pop();
         j--;
       }
   
       if (j === messages[i].length) {
         isEnd = true;
         isDeleting = true;
       }
   
       if (isDeleting && j === 0) {
         currentMessage = [];
         isDeleting = false;
         i++;
         if (i === messages.length) {
           i = 0;
         }
       }
     }
   
     // Faster typing and deleting speeds
     const speedUp = Math.random() * (150 - 100) + 100;
     const normalSpeed = Math.random() * (200 - 100) + 100;
     const time = isEnd ? 2000 : isDeleting ? speedUp : normalSpeed;
     setTimeout(loop, time);
   }
   
   function createConfetti() {
     const confettiContainer = document.querySelector('.confetti');
     const colors = ['#ff6f61', '#d4a5a5', '#ffeb3b', '#00c6ff', '#90ee90', '#f6c3c4'];
   
     for (let i = 0; i < 150; i++) {
       const confetti = document.createElement('div');
       confetti.classList.add('confetti-piece');
       confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
       const size = Math.random() * 15 + 5; // Size between 5px and 20px
       confetti.style.width = `${size}px`;
       confetti.style.height = confetti.style.width;
       confetti.style.left = `${Math.random() * 100}vw`;
       confetti.style.top = `${Math.random() * 100}vh`;
       confetti.style.opacity = Math.random() * 0.5 + 0.5; // Opacity between 0.5 and 1
       confettiContainer.appendChild(confetti);
     }
   }
   
   document.addEventListener("DOMContentLoaded", () => {
     createConfetti();
   
     submitNameBtn.addEventListener('click', () => {
       const teacherName = teacherNameInput.value.trim();
       if (teacherName) {
         nameSpan.textContent = teacherName;
         nameInputContainer.style.display = 'none';
         content.style.display = 'block';
         loop();
       }
     });
   
     playPauseBtn.addEventListener('click', () => {
       if (audioPlayer.paused) {
         audioPlayer.play();
         playPauseBtn.textContent = 'Pause';
       } else {
         audioPlayer.pause();
         playPauseBtn.textContent = 'Play';
       }
     });
   
     nextBtn.addEventListener('click', () => {
       currentSongIndex = (currentSongIndex + 1) % songs.length;
       playSong(currentSongIndex);
     });
   
     prevBtn.addEventListener('click', () => {
       currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
       playSong(currentSongIndex);
     });
   
     audioPlayer.addEventListener('ended', () => {
       currentSongIndex = (currentSongIndex + 1) % songs.length;
       playSong(currentSongIndex);
     });
   });
   