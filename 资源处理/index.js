import _ from 'lodash'
import './style.css'
import image from './1.png'
import Data from './Data.json'

function component() {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['你好', 'webpack'], ' ');
    element.classList.add('color')

    var icon = new Image()
    icon.src = image

    element.appendChild(icon)

    return element;
}

console.log(Data);
document.body.appendChild(component());
