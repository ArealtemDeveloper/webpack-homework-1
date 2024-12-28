import './index.scss';

// Pictures
import forestPicture from './assets/images/forest.jpg';
import rainPicture from './assets/images/rain.jpg';
import snowPicture from './assets/images/snow.jpg';

type BackgroundImages = {[key: string]: string}

const backgroundImages:BackgroundImages = {
    forest: forestPicture,
    rain: rainPicture,
    snow: snowPicture,
};

const allButtons = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>;
const allAudios = document.querySelectorAll('.audio') as NodeListOf<HTMLAudioElement>;

const showVolumeSlider = (volumeSlider: HTMLInputElement, audio: HTMLAudioElement):void => {
    const isAudioActive = audio.classList.contains('active');
    const onChangeAudioVal = () => audio.volume = Number(volumeSlider.value);

    if (isAudioActive) {
        volumeSlider.classList.add('visible');
        volumeSlider.addEventListener('input', onChangeAudioVal);
    } else {
        volumeSlider.classList.remove('visible');
        volumeSlider.removeEventListener('input', onChangeAudioVal);
    };
};

const clearAudioClasses = ():void => {
    allAudios.forEach(item => {
        item.pause();

        if (item.classList.contains('active') && item.previousElementSibling) {
            item.previousElementSibling.classList.remove('visible');
        }

        item.classList.remove('active');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    let currentSound = '';

    allButtons.forEach(button => {
        const buttonWeather = button.getAttribute('data')!;
        button.style.backgroundImage = `url('${backgroundImages[buttonWeather]}')`;

        button.addEventListener('click', () => {
            const audio = document.getElementById(`audio-${buttonWeather}`) as HTMLAudioElement;
            const volumeSlider = document.getElementById(`volumeSlider-${buttonWeather}`) as HTMLInputElement;

            if (currentSound === buttonWeather && !audio.paused && audio.previousElementSibling) {
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