import './css/index.scss';
import { testFun } from './js/main';

/** Cache the doom */
const ROOT = document.getElementById('root');
console.log(ROOT);

/*
const div = document.createElement('DIV');
div.innerHTML = 'Testing div append';
ROOT.append(div);
*/
testFun();
