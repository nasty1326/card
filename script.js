const $leftLinks = document.querySelectorAll('.left-menu a'), // элементы левого меню
			$mapLinks = document.querySelectorAll('.map a'), //все элементы карты
			$info = document.querySelector('.info'); // текст пояснения

const requestData = (id = 1) => {
	fetch('data.json')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		$info.innerHTML = `
			<h2>${data[id - 1].district}</h2>
			<p>${data[id - 1].info}</p>
		`;
	});
};

requestData();

// $leftLinks.forEach(el => {
// 	el.addEventListener('mouseenter', (e) => { //при наведении на элемент левого меню
// 		let self = e.currentTarget;
// 		let selfClass = self.getAttribute('href'); //получаем название ссылки
// 		let color = self.dataset.color; //получили цвет
// 		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`); //ищем текущий элемент карты
// 		let currentPolygon = currentElement.querySelectorAll('polygon'); // внутри ссылки ищем полигоны и пути
// 		let currentPath = currentElement.querySelectorAll('path');

// 		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`); //если существуют полигоны, то задаем цыет и увеличиваем размер границ
// 		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`); // то же самое с путями
// 		self.classList.add('active');
// 	});

// 	el.addEventListener('mouseleave', (e) => {
// 		let self = e.currentTarget;
// 		let selfClass = self.getAttribute('href');
// 		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
// 		let currentPolygon = currentElement.querySelectorAll('polygon');
// 		let currentPath = currentElement.querySelectorAll('path');
// 		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
// 		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
// 		self.classList.remove('active');
// 	});
// });

$mapLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		// let selfClass = self.getAttribute('href');
		let color = self.dataset.color;
		// let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('polygon');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		// currentElement.classList.add('active');
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		// let selfClass = self.getAttribute('href');
		// let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('polygon');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
		// currentElement.classList.remove('active');
	});

	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let id = parseInt(currentElement.dataset.id);
		requestData(id);
	});
});