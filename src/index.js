import './index.scss';

// Pictures
import forestPicture from './assets/images/forest.jpg';
import rainPicture from './assets/images/rain.jpg';
import snowPicture from './assets/images/snow.jpg';

const backgroundImages = {
    forest: forestPicture,
    rain: rainPicture,
    snow: snowPicture,
};

const allButtons = document.querySelectorAll('.btn');
const allAudios = document.querySelectorAll('.audio');

const showVolumeSlider = (volumeSlider, audio) => {
    const isAudioActive = audio.classList.contains('active');

    if (isAudioActive) {
        volumeSlider.classList.add('visible');
        volumeSlider.addEventListener('input', function() {
            audio.volume = volumeSlider.value;
        });
    } else {
        volumeSlider.classList.remove('visible');
        volumeSlider.removeEventListener('input');
    };
};

const clearAudioClasses = () => {
    allAudios.forEach(item => {
        item.pause();

        if (item.classList.contains('active')) {
            item.previousElementSibling.classList.remove('visible');
        }

        item.classList.remove('active');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    let currentSound = '';

    allButtons.forEach(button => {
        const buttonWeather = button.getAttribute('data');
        button.style.backgroundImage = `url('${backgroundImages[buttonWeather]}')`;

        button.addEventListener('click', () => {
            const audio = document.getElementById(`audio-${buttonWeather}`);
            const volumeSlider = document.getElementById(`volumeSlider-${buttonWeather}`);

            if (currentSound === buttonWeather && !audio.paused) {
                audio.pause();
                audio.classList.remove('active');
                audio.previousElementSibling.classList.remove('visible');
            } else {
                clearAudioClasses();

                audio.play();
                audio.classList.add('active');
                showVolumeSlider(volumeSlider, audio);

                currentSound = buttonWeather;
                document.body.style.backgroundImage = `url('${backgroundImages[buttonWeather]}')`;
            }
        });
    });
});