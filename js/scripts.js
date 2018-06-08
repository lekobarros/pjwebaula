/**
 * scripts.js
 * https://github.com/lekobarros
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 **/
;(function(window) {
	'use strict';
	
	var configs = ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifth'];

	class Slide{
		constructor(el){
			this.DOM = { el : el};
			this.init();
		}
		init(){
			// Elements
			var self = this.DOM;
			this.DOM.slideTotalPage = document.querySelectorAll('.slide').length;
			
			// Elements Header
			this.DOM.headerProgressbar = document.querySelector('.progressbar__container > .progressbar__progress');
			
			// Elements Panel Control
			this.DOM.panelSlideInfo = document.querySelector('.panelcontrol__content > .content__count');
			this.DOM.panelArrowUp = document.querySelector('.panelcontrol__btnUp');
			this.DOM.panelArrowDown = document.querySelector('.panelcontrol__btnDown');
			this.DOM.panelArrowRestart = document.querySelector('.panelcontrol__btnRestart');			
			
			// Elements Slides
			this.DOM.mapsSlides = document.querySelector('.wa-mapslides');
			this.DOM.menuMapsSection = document.querySelector('.mapslides__navsection > .navsection');
			this.DOM.openMenuMap = document.querySelector('.navigation__item--triagge');
			this.DOM.closeMenuMap = document.querySelector('.mapslides__close');
			this.DOM.linksMenuMap = document.querySelectorAll('.navsection > .navsection__item');
			
			// Init FullPage.js
			fullpage.initialize('#slide__content', {
				anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifth'],
				sectionSelector: '.slide',
				menu: '#mapslides__navsection',
				css3: true,
			
				afterLoad : function(anchorLink, index){
					let count = 100/self.slideTotalPage * index;
					self.headerProgressbar.setAttribute('style', `width: ${count}%`);
					self.panelSlideInfo.innerHTML = `${index} / ${self.slideTotalPage}`;
				}
			});
			
			// Init Events
			this.initEvents();
		}
		initEvents(){
			let countProgressbar = 100 / this.DOM.slideTotalPage;
			// Fn Header
			this.DOM.headerProgressbar.setAttribute('style', `width: ${countProgressbar}%`);
			this.DOM.openMenuMap.addEventListener('click', () => this.toggleNavigation());
			
			// Fn Panel Control
			this.DOM.panelSlideInfo.innerHTML = `1 / ${this.DOM.slideTotalPage}`;
			
			// Fn Slides
			this.DOM.closeMenuMap.addEventListener('click', () => this.toggleNavigation());
			
			// Fn Panel Control
			this.DOM.panelArrowUp.addEventListener('click', this.toggleSlideUp);
			this.DOM.panelArrowDown.addEventListener('click', this.toggleSlideDown);
			this.DOM.panelArrowRestart.addEventListener('click', this.toggleSlideRestart);
			
			// Build Links
			this.buildMenuLinks();
		}
		toggleSlideUp(){
			return fullpage.moveSectionUp();
		}
		toggleSlideDown(){
			return fullpage.moveSectionDown();
		}
		toggleSlideRestart(){
			return fullpage.moveTo(1);
		}
		toggleNavigation(){		
			if ( this.isMenuAnimating ) return;
			this.isMenuAnimating = true;

			const toggleMenuCtrlFn = () => {
				anime.remove(this.DOM.mapsSlides);
				return anime({
					targets: this.DOM.mapsSlides,
					duration: 1000,
					opacity: () => !this.isMenuOpen ? 1 : 0,
				}).finished;
			};

			this.DOM.mapsSlides.classList.toggle('wa-mapslides--open');

			Promise.all([toggleMenuCtrlFn()]).then(() => {
				this.isMenuOpen = !this.isMenuOpen
				this.isMenuAnimating = false;
			});
		}
		buildMenuLinks(){
			for (var i = 0; i < configs.length; i++) {
				// Create LI
				var item = document.createElement('li');
				item.setAttribute('data-menuanchor', configs[i]);
				item.classList.add('navsection__item', 'navsection__item--notvisited');
				
				// Create A
				var itemLink = document.createElement('a');
			itemLink.setAttribute('href', `#${configs[i]}`);
				item.appendChild(itemLink);
				
				// Childs A
				var itemTitle = document.createElement('div');
				itemTitle.classList.add('item__title');
				itemTitle.innerHTML = `Tela ${i + 1}`;
				itemLink.appendChild(itemTitle);
				var itemBullet = document.createElement('div');	
				itemBullet.classList.add('item__bullet');
				itemLink.appendChild(itemBullet);
				
				// Inner HTML
				itemLink.addEventListener('click', () => this.toggleNavigation());
				this.DOM.menuMapsSection.appendChild(item);
			}
		}
	}
	new Slide(window);
})(window);