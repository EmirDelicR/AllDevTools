# AllDevTools

Dev-tools and best practice

### Table of Contents

- [SSH](#ssh)
- [PERFORMANCE](#performance)
- [REACT](#react)
- [WEBPACK-4](#webpack-4)
- [PWA](#progressive-web-apps)
- [Testing](#testing)
- [TypeScript](#type-script)
- [SPA vs SSR](#spa-vs-server-side-rendering)

# ssh

How SSH work

To connect to external server/host ssh {user}@{host}

```code
ssh root@167.99.146.57
// IP address or host name
```

#### Symmetrical Encryption

Uses one secret key for encryption and decryption.

#### Asymmetrical Encryption

Uses two separate keys for encryption and decryption (Public and private).

[Secret Key Exchange (Diffie-Hellman)](https://www.youtube.com/watch?v=NmM9HA2MQGI)

[Diffie Hellman -the Mathematics bit](https://www.youtube.com/watch?v=Yjrfm_oRO0w)

[Key Exchange Problems](https://www.youtube.com/watch?v=vsXMMT2CqqE&t=)

[Elliptic Curves](https://www.youtube.com/watch?v=NF1pwjL9-DE)

#### SSH functions

```code
The SSH command consists of 3 distinct parts:
	ssh {user}@{host}
	// {user} represents the account you want to access.
	// {host} refers to the computer you want to access.
Commands :
	ssh <virtualMachine>         	--> login to virtual machine
	ssh emir@virtualmachine.com
	exit 			      	--> exit / logout

	// upload app on server
	rsync -av . emir@virtualmachine.com:~/newapp    -> ~ is home directory

	// Password list of ssh

	// Local machine
	cd .ssh
	ssh-keygen -C "emir@test.com"
	// OR
	ssh-keygen -t rsa -b 4096 -C "emir@test.com"
	// you get id_rsa and id_rsa.pub
	// id_rsa is private key
	// id_rsa.pub is public key

	cat id_rsa.pub | pbcopy
	// this copy key to clipboard
    // if throw error use
    sudo apt-get install -y xclip
    sudo vim ~/.zshrc
    //Set alias
    //alias pbcopy='xclip -selection clipboard'
    //alias pbpaste='xclip -selection clipboard -o'
    // still have problem use:
    xclip -selection clipboard id_rsa.pub
    ssh-add

	// Remote machine
	// make on your machine ssh file
	mkdir .ssh
	cd .ssh
	nano authirused_keys
	// paste content that you copy and press ctrl+X , Y , Enter

	// Set promisions
	cd ..
	chmod 700 .ssh/
	chmod 600 .ssh/*

	// backup config file
	sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

	// change config setup
	sudo nano /etc/ssh/sshd_config

	// in nano find
	#PasswordAuthentication yes
	// and set to
	PasswordAuthentication no

	// restart server
    sudo service ssh restart
```

# performance

#### Network

1. Minimize text (JS,CSS,HTML) - Use Webpack or UglifyJS
2. Minimize Images

#### Images optimizations

Reduce PNG with TinyPNG
Reduce JPEG with JPEG-OPTIMIZER
Use CDNs like imgix - www.imgix.com
Remove image metadata - www.verexif.com

[Media Queries](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)

[Media Queries Cheat Sheet](http://www.bsidestudios.com/blog/media-queries-common-sizes-cheat-sheet)

#### Critical Render Path

[Perfecting](https://css-tricks.com/prefetching-preloading-prebrowsing/)

#### Code Optimizing/Splitting

[async or defer](https://stackoverflow.com/questions/10808109/script-tag-async-defer)

[code-splitting](https://reactjs.org/docs/code-splitting.html)

[React-check-update-tool](https://github.com/maicki/why-did-you-update)

# react

[React-nice-doc](https://vasanthk.gitbooks.io/react-bits/patterns/19.async-nature-of-setState.html)

[Components](https://mdbootstrap.com/react/components/breadcrumb/)

[React-check-update-tool](https://github.com/maicki/why-did-you-update)

```code
sudo npm install create-react-app -g
create-react-app <name>

Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!
```

```javascript
// stateless component:

import React from 'react';
import Logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = ( props ) => (
    <div className={classes.Logo}>
        <img src={Logo} alt="Logo" />
    </div>
);

export default logo;

<----------------------------------------->
// Components with state
import React, { Component } from 'react';
import classes from "./style.css";

class ClassName extends Component {
state = {
    purchasing: false,
}

componentDidMount() {
    this.props.onInitIngredients();
}

render () {
    return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler} >
            </Modal>
        </Aux>
	);
}
};

export default ClassName;

<------------------------------------------------->
// Using map function
import React from 'react';
import Card from '../Card/Card';
import { robots } from '../../../data/robots';

const CardList = () => {
    const cardsArray = robots.map((robot) => {
        return (
			<Card
				key={robot.id}
				id={robot.id}
				name={robot.name}
				email={robot.email} />
		)
    });
    return (
        <div>
            {cardsArray}
        </div>
    )
};


export default CardList;

```

#### Error Boundary

```javascript
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <h1>Ups. Error occurred.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### Redux

-Good for managing large state.
-Useful for sharing data between containers
-Predictable state management using the 3 principles: 1. Single source of truth - one single big object 2. State is read only 3. Changes using pure functions

Flux pattern

Action -> Dispatcher -> Store -> View

```console
npm install --save redux
npm install --save react-redux
```

##### Redux Middleware

```javascript
// index.js
import { createStore, applyMiddleware } from 'redux';

// middleware
const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching: ', action);
      const result = next(action);
      console.log('[Middleware] next state: ', store.getState());
      return result;
    };
  };
};

// Store
const store = createStore(robotsReducer, applyMiddleware(logger));
```

##### Async Actions

```console
npm install --save redux-thunk
```

```javascript
// Library for ansyc code
// index.js
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

actions.js

export const requestRobots = () => dispatch => {
    dispatch({ type: actionTypes.REQUEST_ROBOTS_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => dispatch({ type: actionTypes.REQUEST_ROBOTS_SUCCESS, payload: data}))
    .catch(err => dispatch({ type: actionTypes.REQUEST_ROBOTS_FAILED, payload: err }));
};

//reducers.js
export const requestRobots = (state = initialStateRobots, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ROBOTS_PENDING:
            return updateObject(state, { isPending: true });
        case actionTypes.REQUEST_ROBOTS_SUCCESS:
            return updateObject(state, { robots: action.payload, isPending: false });
        case actionTypes.REQUEST_ROBOTS_FAILED:
            return updateObject(state, { error: action.payload, isPending: false });
        default:
            return state;
    }
};

// Use combine reducers
// index.js
import { searchRobots, requestRobots } from './store/reducers/reducers';
// Combine reducers
const rootReducer = combineReducers({
    search: searchRobots,
    request: requestRobots
});

// Store
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// in App.js
componentDidMount() {
  this.props.onRequestRobots()
}

const mapStateToProps = state => {
  return {
    searchField: state.search.searchField,
    robots: state.request.robots,
    isPending: state.request.isPending,
    error: state.request.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
     onSearchChange: (event) => dispatch(actions.setSearchField(event.target.value)),
     onRequestRobots: () => dispatch(actions.requestRobots())
  };
};
```

#### React Tools

1. [React Router](https://reacttraining.com/react-router/web/example/basic)
2. [Ramda](https://ramdajs.com/docs/)
3. [Lodash](https://lodash.com/docs/)
4. [Gatsby.js](https://www.gatsbyjs.org/)
5. [Material-ui](https://material-ui.com/getting-started/supported-components/)
6. [Semantic-ui](https://semantic-ui.com/introduction/getting-started.html)
7. [React-reselect](https://github.com/reduxjs/reselect)
8. [Redux Saga](https://github.com/redux-saga/redux-saga)

# webpack-4

[webpack](https://webpack.js.org/)

[eslint](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)

[Webpack config tool](https://webpack.jakoblind.no/)

```console
npm install --save-dev webpack webpack-dev-server webpack-cli
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-stage-2 babel-preset-react
npm install react react-dom
npm install --save-dev eslint
npm install --save-dev babel-eslint
npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
```

```javascript
// in package.json
"script": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development"
}
"babel": {
    "presets": {
        "env",
        "stage-2",
        "react"
    }
}
// in webpack.config.js
module.export = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundel.js'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.(.js|.jsx)$/,
            exclude: /node_modules/,
            use: ['eslint-loader']
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

// in .eslintrc
{
    parser: "babel-eslint",
   "rules": {
       "no-console": "error"
   },
   "extends": ["airbnb-base"]
}
```

```console
npm start
```

# progressive-web-apps

[PWA-builder](https://www.pwabuilder.com/)

[Favicon Generator](https://realfavicongenerator.net/)

[Best-Practice](https://auth0.com/blog/introduction-to-progressive-web-apps-push-notifications-part-3/)

# testing

#### Unit Tests

Tests individual classes or functions

#### Integration Tests

Testing how different pieces of code work with each other

#### Automation Tests

Test behavior of the web (selenium test, TestCafe, WebDriver IO)

#### Tools

- Jasmine (need coverage library) (BDD)
- Jest (BDD)
- Mocha (need assertion , mock and code coverage library) (BDD)

#### JEST

[Official wep page](https://jestjs.io/)

[Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)

```console
// With create-react-app JEST is already setup
npm install --save-dev jest

// in the package.json file
"scripts" : {
    "test" : "jest --watch *.js"
}
// If you use Ubuntu and throw an error call this:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
// write a test in script.test.js
it('this is the test', () => {

});
// Run
npm test
```

#### Enzyme

[Enzyme](https://github.com/airbnb/enzyme)

```console
npm install --save-dev enzyme enzyme-adapter-react-16
npm install --save-dev react-addons-test-utils react-test-renderer
// check setupEnzymeTest.js file
/*
package.json has

  "dependencies": {
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-scripts": "1.1.4"
  },
  "devDependencies": {
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "react-addons-test-utils": "^15.6.2",
    "react-test-renderer": "^16.3.2"
  },
Note: The jest > setupTestFrameworkScriptFile key in package.json must not be there, remove if it exists.

\src\setupTests.js has

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
*/
```

To test components use:

```javascript
import { shallow, mount, render } from 'enzyme';
// look card.test.js
```

#### Snapshot testing

```javascript
it('Snapshot testing', () => {
  expect(shallow(<Card />)).toMatchSnapshot();
});
```

#### Code Coverage

```console
npm test -- --coverage
```

#### Testing state-ful components

```javascript
it('state test', () => {
    const mockColor = 'red';
    const wrapper = shallow(<Card color={mockColor} />));
    /* [id="counter"] it is a id of button for example */
    wrapper.find('[id="counter"]').simulate('click');
    expect(wrapper.state()).toEqual({ count: 1});
    expect(wrapper.props().color).toEqual('red');
});
```

#### Testing connected components

look at MainPage.test.js

#### Testing reducers

look at reducers.test.js

#### Testing actions

look at actions.test.js

npm install --save-dev redux-mock-store

# type-script

[TS setup](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)

[Doc](https://basarat.gitbooks.io/typescript/docs/why-typescript.html)

[Types](https://definitelytyped.org/)

```console
npm install -g typescript
tsc --init
tsc test.ts --watch
```

```typescript
const sumFun = (a: number, b: number): number => a + b;

const answer = sumFun(2, 5);

// boolean
let isCool: boolean = false;
// : string, : number,
// arrays
//: string[], : int[] ....
//: Array<string>

// Object
let obj: object = {};

//: null, : undefined

// Tuple
let basket: [string, number];
basket = ['test', 5];

// Enum
enum Size {
  Small = 1,
  Medium = 2,
  Large = 3
}
let sizeName: string = Size[2]; // output medium
let sizeNumber: number = Size.Small; // output 1

// Void
let test = (): void => {
  console.log('Test');
};
// never
let error = (): never => {
  throw Error('Ops');
};

// interface
interface SomeInterface {
  count: number;
  type: string;
  optional?: string;
}
let SomeFunction = (some: SomeInterface) => {
  console.log('Test');
};
// the line is the same as
let SomeFunction = (some: { count: number; type: string }) => {
  console.log('Test');
};
// Type assertion
let someObject = {} as SomeInterface;
// Union
let both: string | number = 3;
```

Adding typescript to react project

[Git](https://github.com/wmonk/create-react-app-typescript)

# spa-vs-server-side-rendering

In react for SSR

- [Gatsby.js](https://www.gatsbyjs.org/)
- [Next.js](https://nextjs.org/)
- [Next.js-second-doc](https://zeit.co/blog/next5)

#### Next.js

```console
npm init -y
npm install next react react-dom
```

```javascript
// in package.json
"script": {
    "start": "next"
}
// create folder pages (must be in root dir with index.js)
```
