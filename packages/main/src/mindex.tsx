import {createElement, parseJSX} from '@iwheels/ireact'

const App = (`
  <div className="container">
    <p style={style}>{greet('scott')}</p>
    <div>
      <p>this is jsx-like code</p>
      <i className="icon"/>
      <p>parsing it now</p>
      <img className="icon"/>
    </div>
    <input type="button" value="i am a button"/>
    <em/>
  </div>
`);

let root = parseJSX(App);

console.log(JSON.stringify(root, null, 2));
createElement()
