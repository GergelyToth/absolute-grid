'use strict';

(function(global) {
	let AbsoluteGrid = (options) => new AbsoluteGrid_init(options);

	let defaultOptions = {
		containerSelector: '.container',
		childrenSelector: '.children',
		width: 190,
		height: 250,
		marginX: 10,
		marginY: 15,
		enableHover: false,
		enableClick: false
	};

	class AbsoluteGrid_init {
		constructor(options) {
			this.options = this.extend(defaultOptions, options || {}); // overwrite the default options with the options provided by the user
			this.container = document.querySelector(this.options.containerSelector);
			this.children = this.container.querySelectorAll(this.options.childrenSelector);
			this.containerWidth = this.container.clientWidth; // containerWidth is subject to change

			this.positionCards();
			window.addEventListener('resize', this.onWindowResize.bind(this));
			this.children.forEach(child => {
				if (this.options.enableHover) {
					child.addEventListener('mouseover', this.onHover.bind(this));
					child.addEventListener('mouseout', this.onHover.bind(this));
				}
				if (this.options.enableClick) {
					child.addEventListener('click', this.onClick.bind(this));
				}
			});
		}

		/**
		 * Merge two JavaScript objects
		 * @param {Object} obj The object to contain all attributes
		 * @param {Object} src The source object we want to merge the attributes from
		 * @return {Object} The object that contains all attributes
		 * @notes This method will modify the obj. Also if obj and src has key,
		 * it will override the one in obj
		 */
		extend(obj, src) {
			Object.keys(src).forEach(key => {obj[key] = src[key];});
			return obj;
		}

		/**
		 * Returns the number of cards that can fit into a single row
		 * @return {Int} The number of cards in a row
		 */
		calculateNumberOfCardsInRow() {
			return Math.floor(this.containerWidth / (this.options.width + this.options.marginX));
		}

		/**
		 * Absolutely positions cards depending in X & Y axis
		 */
		positionCards() {
			var row = 0,
				column = 0,
				noCardsInRow = this.calculateNumberOfCardsInRow();
			this.children.forEach((child) => {
				// position each child...
				if (column + 1 > noCardsInRow) {
					column = 0;
					row++;
				}
				child.style.left = `${column * (this.options.width + this.options.marginX)}px`;
				child.style.top = `${row * (this.options.height + this.options.marginY)}px`;
				column++;
			});
			// update the container height
			this.container.style.height = `${
				this.options.height +
				row * this.options.height +
				row * this.options.marginY
			}px`;
		}

		onWindowResize() {
			this.containerWidth = this.container.clientWidth; // recalculate containerWidth
			this.positionCards(); // re-position the children
		}

		/**
		 * Whnen hovering in or out of a card, the 'hover' class will be toggled
		 * for the children.
		 */
		onHover(evt) {
			if (!evt.target.classList.contains('active')) {
				evt.target.classList.toggle('hover');
			}
		}

		/**
		 * Uppon clicking a card, an overlay div will be placed at the end of
		 * the body, attaching a click event on it and the clicked child will
		 * have an 'acitve' class.
		 */
		onClick(evt) {
			if (this.activeChild) {
				return;
			}

			this.overlay = document.createElement('div');
			this.overlay.className = 'overlay';
			this.overlay.style.zIndex = 999;
			document.body.appendChild(this.overlay);
			this.overlay.addEventListener('click', this.onOverlayClick.bind(this));

			this.children.forEach(child => child.classList.remove('active'));
			this.activeChild = evt.target;
			this.activeChild.classList.add('active');
			this.activeChild.style.zIndex = 1000;
		}

		/**
		 * When clicked on the overlay, it will be removed from the DOM, and
		 * from the child the 'active' class removed.
		 */
		onOverlayClick() {
			this.overlay.removeEventListener('click', this.onOverlayClick);
			document.body.removeChild(this.overlay);

			this.activeChild.classList.remove('active');
			this.activeChild.style.zIndex = '';
			this.activeChild = undefined;
		}
	}

	global.AbsoluteGrid = AbsoluteGrid;
}(window));
