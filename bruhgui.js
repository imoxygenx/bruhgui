class bruhgui {
	constructor(title, parentElement, toggleKey = 'k', width = 250, height = 500) {
		this.title = title;
		this.parentElement = parentElement;

		this.element = document.createElement('div');
		parentElement.appendChild(this.element);

		this.element.class = 'bruhgui';
		this.element.style = `
			width: ${width}px;
			height: ${height}px;
			background-color: #1f1f1f;
			position: absolute;
			left: 100%;
			top: 0;
			transform: translate(-100%);
			font-family: "Comic Sans MS";
			text-align: center;
			color: white;
		`;
		this.element.innerHTML = `<p style="margin-top:-1px;font-size:20px;">${title}</p>`;

		this.element.addEventListener('mousedown', this.dragStart, false);
		this.element.addEventListener('mouseup', this.dragEnd, false);
		this.element.addEventListener('mousemove', this.drag, false);

		this.dragging = false;
		this.currentX = 0;
		this.currentY = 0;
		this.initialX = 0;
		this.initialY = 0;

		document.addEventListener('keydown', (event) => {
			if (event.key == toggleKey) this.element.style.display = this.element.style.display == '' ? 'none' : '';
		})
	};

	dragStart(event) {
		this.initialX = event.clientX - this.offsetLeft;
		this.initialY = event.clientY - this.offsetTop;
		if (event.button === 0) {
			this.dragging = true;
		}
	}

	dragEnd(event) {
		this.initialX = this.currentX;
		this.initialY = this.currentY;
		this.dragging = false;
	}

	drag(event) {
		if (this.dragging) {
			event.preventDefault();

			this.currentX = event.clientX - this.initialX;
			this.currentY = event.clientY - this.initialY;
			this.style.left = this.currentX + 'px';
			this.style.top = this.currentY + 'px';
		}
	}

	register(type) {
		if (type == 'label') {
			this.element.innerHTML += `<p>${arguments[1]}</p>`;
		} else if (type == 'button') {
			let button = document.createElement('button');
			button.innerHTML = arguments[1];
			button.addEventListener('click', arguments[2]);
			this.element.appendChild(button);
		} else {
			console.error('Unrecognized register type: ' + type);
		}
	};
}