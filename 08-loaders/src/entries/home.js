import es6 from '../filetypes/es6.js';
import tpl from '../filetypes/mustache.html';
import img from '../filetypes/image.jpg';
import '../filetypes/headlines.scss';
import layoutService from '../services/layout';
import home from '../modules/home';

let renderedMustacheTemplate = tpl({
  "name": "Chris",
  "value": 10000,
  "taxed_value": 10000 - (10000 * 0.4),
  "in_ca": true,
  "img": img
});

layoutService( home() + renderedMustacheTemplate );
