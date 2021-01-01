const d = document;
const $sections = d.querySelectorAll('section');
const letters = d.querySelector('main');
let darkThemeCheck = false;
const backgrounds = [
	'lightpink',
	'red',
	'palegreen',
	'tomato',
	'darkblue',
	'lavender',
	'deepskyblue',
];
const colors = [
	'red',
	'orange',
	'darkgreen',
	'darkred',
	'springgren',
	'blue',
	'navy',
];
const backgroundNumber = () => {
	const randomNumber = Math.floor(Math.random() * backgrounds.length);
	return randomNumber;
};
const colorNumber = () => {
	const randomNumber = Math.floor(Math.random() * colors.length);
	return randomNumber;
};
const wheelScroll = (e) => {
	const isBrowser = {
		chrome: () => navigator.userAgent.match(/chrome/i),
		safarai: () => navigator.userAgent.match(/safarai/i),
		firefox: () => navigator.userAgent.match(/firefox/i),
		opera: () => navigator.userAgent.match(/opera|opera mini/i),
		ie: () => navigator.userAgent.match(/msie|iemobile/i),
		edge: () => navigator.userAgent.match(/edge/i),
		any: function () {
			return (
				this.ie() ||
				this.edge() ||
				this.chrome() ||
				this.safarai() ||
				this.firefox() ||
				this.opera()
			);
		},
	};
	let scroolSpeed = 1;
	if (isBrowser.firefox()) {
		scroolSpeed = 30;
	}
	if (isBrowser.chrome()) {
		scroolSpeed = 1.1;
	}
	d.querySelector('.container').scrollLeft += -e.deltaY * scroolSpeed;
};
// library
Sortable.create(letters, {
	animation: 700,
	dragClass: 'drag',
	group: 'letters',
	onEnd: () => {},
	store: {
		set: (sortable) => {
			const order = sortable.toArray();
			localStorage.setItem(sortable.options.group.name, order.join('//'));
		},
		get: (sortable) => {
			// get value of 'sortable.options.group.name' and then it gets in arrayy(the librabry requires it)
			const order = localStorage.getItem(sortable.options.group.name);
			// check if order exist
			return order ? order.split('//') : [];
		},
	},
});
document.addEventListener('wheel', wheelScroll);
// change color and set local storage(always starts white(bakground) and black(color))
d.addEventListener('click', (e) => {
	if (e.target.matches('#dark-theme')) {
		$sections.forEach(async (el) => {
			if (darkThemeCheck === false) {
				el.style.backgroundColor = await 'black';
				el.style.color = await 'white';
				localStorage.setItem('darky?', 'yes');
				darkThemeCheck = true;
			} else {
				el.style.backgroundColor = await 'white';
				el.style.color = await 'black';
				localStorage.setItem('darky?', 'nou');
				darkThemeCheck = false;
			}
		});
	}
	if (e.target.matches('#color-theme')) {
		$sections.forEach((el) => {
			el.style.backgroundColor = backgrounds[backgroundNumber()];
			el.style.color = colors[colorNumber()];
			localStorage.setItem('darky?', 'nou');
		});
	}
});
// local storage dark theme
d.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('darky?') === 'yes') {
		$sections.forEach((el) => {
			el.style.backgroundColor = 'black';
			el.style.color = 'white';
		});
	} else {
		$sections.forEach((el) => {
			el.style.backgroundColor = 'white';
			el.style.color = 'black';
		});
	}
});
