import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

//////////////////////////

class Customer {
  // private id: number; // TS
  #id: number; // JS
  #idx = 5;

  readonly foo = { name: 'Egon' };

  constructor() {
    this.#id = 5;
  }

  setName(value: string): string {
    setInterval(() => {
      console.log(this.#id);
    }, 2000);
    return '';
  }
}

const myCustomer = new Customer();

// myCustomer.#id


/////////////////////////////////////////

const foo = function (arg) {
  return arg + 1;
}


undefined
null

let foof;

// Arrow Functions
const foo2 = arg => arg + 1;

const result = foo(5)

// Callback

