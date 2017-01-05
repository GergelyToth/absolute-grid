'use strict';

(function(global) {
	let AbsoluteGrid = (options) => new AbsoluteGrid_init(options);

	let defaultOptions = {
		containerSelector: '.container',
		childrenSelector: '.children',
		width: 190,
		height: 250,
		marginX: 10,
		marginY: 15
	};

	class AbsoluteGrid_init {
		constructor(options) {
			this.options = this.extend(defaultOptions, options || {}); // overwrite the default options with the options provided by the user
			this.container = document.querySelector(this.options.containerSelector);
			this.children = this.container.querySelectorAll(this.options.childrenSelector);
			this.containerWidth = this.container.clientWidth; // containerWidth is subject to change

			this.positionCards();
			window.addEventListener('resize', this.onWindowResize.bind(this));
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
	}

	global.AbsoluteGrid = AbsoluteGrid;
}(window));
