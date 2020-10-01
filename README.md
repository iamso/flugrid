flugrid
=======
simple fluid grid

Install
-------

### With Bower

```bash
bower install flugrid
```

### With NPM

```bash
npm install flugrid
```

Example Setup
-------------

### Javascript
```javascript
import Flugrid from 'flugrid';

// create an instance with default options
const flugrid = new Flugrid();

// build the grid
flugrid.build();

// rebuild the grid on resize
window.addEventListener('resize', e => {
  flugrid.build();
});

// create an instance passing options (defaults)
const flugrid = new Flugrid({
  container: '.flugrid', // the selector or dom element for the container
  items: '.flugrid__item', // the selector or dom elements for the items
  gutter: 0, // the gutter between the items
  auto: false, // automatically rebuild on resize
  rtl: false // right-to-left order
});
```

### HTML
You can use it with Flexboxgrid, Bootstrap grid or whatever you prefer, as long as all the items have the same width.
```html
<div class="container">
  <div class="row flugrid">
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">1</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">2</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">3</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">4</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">5</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">6</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">7</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">8</div>
    <div class="col-xs-12 col-sm-6 col-md-4 flugrid__item">9</div>
  </div>
</div>
```

License
-------

[MIT License](LICENSE)
