'use strict';

/**
 * Flugrid class
 */
export default class Flugrid {

  /**
   * Flugrid constructor
   * @param  {Object} [] - an object containing all the options for Flugrid
   * @return {Object}    - a Flugrid instance
   */
  constructor({
    container = '.flugrid', // the selector or dom element for the container
    items = '.flugrid-item', // the selector or dom elements for the items
    gutter = 0, // the gutter between the items
    auto = false, // automatically rebuild on resize
    rtl = false // right-to-left order
  } = {}) {
    // set the options
    this.set({
      container,
      items,
      gutter,
      rtl
    });
    this.auto = !!auto;
    this.init();
  }

  /**
   * init function
   */
  init() {
    if (this.auto) {
      this.build();
      this.resizeHandler = this.build.bind(this);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  /**
   * set options
   * @param  {Object} [] - an object containing the options for Flugrid
   */
  set({
    container = this.container,
    items = this.items,
    gutter = this.gutter,
    rtl = this.rtl
  } = {}) {
    this.container = container instanceof Node ? container : document.querySelector(container);
    this.items = this.container ? [].slice.call(items instanceof NodeList ? items : this.container.querySelectorAll(items), 0) : [];
    this.gutter = isFinite(parseInt(gutter)) ? parseInt(gutter) : 0;
    this.rtl = !!rtl;
  }

  /**
   * build the grid
   * @return {Promise} - a promise
   */
  build() {
    return new Promise((resolve, reject) => {
      if (this.container && this.items.length) {
        this.container.style.width = '';

        const containerWidth = this.container.getBoundingClientRect().width;
        const itemWidth = this.items[0].getBoundingClientRect().width + this.gutter;
        const cols = Math.max(Math.floor((containerWidth - this.gutter) / itemWidth), 1);
        const itemsGutter = [];
        const itemsX = [];

        this.container.style.width = `${itemWidth * cols + this.gutter}px`;;
        this.container.style.position = 'relative';

        for (let i of Array(cols).keys()) {
          itemsX.push(i * itemWidth + this.gutter);
          itemsGutter.push(this.gutter);
        }

        if (this.rtl) {
          itemsX.reverse();
        }

        for (let item of this.items) {
          let itemIndex = itemsGutter
            .slice(0)
            .sort(function (a, b) {
              return a - b;
            })
            .shift();
          itemIndex = itemsGutter.indexOf(itemIndex);

          const posX = parseInt(itemsX[itemIndex]);
          const posY = parseInt(itemsGutter[itemIndex]);

          item.style.position = 'absolute';
          item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
          item.style.transformStyle = 'preserve-3d';
          item.style.transform = `translate3D(${posX}px, ${posY}px, 0)`;

          itemsGutter[itemIndex] += item.getBoundingClientRect().height + this.gutter;
        }

        const containerHeight = itemsGutter
          .slice(0)
          .sort(function (a, b) {
            return a - b;
          })
          .pop();

        this.container.style.height = `${containerHeight}px`;
      }
      resolve(this);
    });
  }

  /**
   * reset the style values on the affected elements
   */
  reset() {
    this.container.style.position = '';
    this.container.style.width = '';
    this.container.style.height = '';
    for (let item of this.items) {
      item.style.position = '';
      item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = '';
      item.style.transformStyle = '';
      item.style.transform = '';
    }
  }

  /**
   * destroy
   */
  destroy() {
    this.reset();
    if (this.auto) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }
}
