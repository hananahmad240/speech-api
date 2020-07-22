const main = document.querySelector('main'),
	voicsesSelect = document.querySelector('#voices'),
	textArea = document.querySelector('#text'),
	closeBtn = document.querySelector('#close'),
	readBTn = document.querySelector('#read'),
	toggleBtn = document.querySelector('#toggle');

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
const data = [
	{
		image: '../public/img/drink.jpg',
		text: "I'm Thirsty",
	},
	{
		image: '../public/img/food.jpg',
		text: "I'm Hungry",
	},
	{
		image: '../public/img/tired.jpg',
		text: "I'm Tired",
	},
	{
		image: '../public/img/hurt.jpg',
		text: "I'm Hurt",
	},
	{
		image: '../public/img/happy.jpg',
		text: "I'm Happy",
	},
	{
		image: '../public/img/angry.jpg',
		text: "I'm Angry",
	},
	{
		image: '../public/img/sad.jpg',
		text: "I'm Sad",
	},
	{
		image: '../public/img/scared.jpg',
		text: "I'm Scared",
	},
	{
		image: '../public/img/outside.jpg',
		text: 'I Want To Go Outside',
	},
	{
		image: '../public/img/home.jpg',
		text: 'I Want To Go Home',
	},
	{
		image: '../public/img/school.jpg',
		text: 'I Want To Go To School',
	},
	{
		image: '../public/img/grandma.jpg',
		text: 'I love Rutab',
	},
];

data.forEach(createBox);

function createBox(curr) {
	const { image, text } = curr;
	const box = document.createElement('div');
	box.classList.add('box');
	box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
    `;

	box.addEventListener('click', () => {
		setTextMessage(text);
		speakText();
		box.classList.add('active');
		setTimeout(() => {
			box.classList.remove('active');
		}, 800);
	});
	main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
	message.text = text;
}

function speakText() {
	speechSynthesis.speak(message);
}

let voices = [];
speechSynthesis.addEventListener('voiceschanged', () => {
	voices = speechSynthesis.getVoices();
	// console.log(voices);
	voices.forEach((curr) => {
		const option = document.createElement('option');
		option.value = curr.name;
		option.innerHTML = `${curr.name} ${curr.lang}`;
		voicsesSelect.appendChild(option);
	});
});

toggleBtn.addEventListener('click', (e) => {
	document.getElementById('text-box').classList.toggle('show');
});

closeBtn.addEventListener('click', (e) => {
	document.getElementById('text-box').classList.remove('show');
});

voicsesSelect.addEventListener('change', (e) => {
	// console.log(e.target.value);
	message.voice = voices.find((curr) => {
		return curr.name === e.target.value;
	});
});

readBTn.addEventListener('click', (e) => {
	let text = textArea.value;
	message.text = text;

	speechSynthesis.speak(message);
});
