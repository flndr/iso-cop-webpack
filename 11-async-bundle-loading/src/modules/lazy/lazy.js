import './lazy.scss';
import lazyImage  from './lazy.jpg';

export default function( message = 'This was loaded async on demand.' ) {
    return `<div class="lazy">
                <h2>${message}</h2>
                <img src="/${lazyImage}" />
            </div>`;
}
