import '../filetypes/headlines.scss';
import layoutService from '../services/layout';
import home from '../modules/home';

layoutService( home() + '<button id="btn">LOAD LAZY MODULE</button>' );


let button = document.querySelector('button');
button.addEventListener('click', () => {

    require.ensure([], () => {

      var lazyModule = require('../modules/lazy/lazy');
      button.insertAdjacentHTML('afterend',
        lazyModule('yay, that was lazy') );

    }, 'lazyLoadedChunk');

}, false);
