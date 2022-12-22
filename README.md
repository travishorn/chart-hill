# Chart Hill

A chart component library for Vue 3.

## Installation

The library is not published on npm, yet. Until then, you can manually install
the library.

Clone this repository

```sh
git clone https://github.com/travishorn/chart-hill
```

Install dependencies

```sh
cd chart-hill
npm install
```

Link the library on your local machine

```sh
npm link
```

Link to it from your working Vue 3 project

```sh
cd [some-vue3-project]
npm link chart-hill
```

## Usage

Import and use the library in your main project file (usually `main.js`)

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ChartHill from 'chart-hill' // Add this line

createApp(App)
  .use(ChartHill) // And add this line
  .mount('#app')
```

Now you can use the components in your Vue components.

```html
<ch-gauge min="0" max="100" value="50" barColor="mediumseagreen" />
```

## Development

Watch and rebuild library on change

```sh
npm run dev
```

It may be helpful to have the [Chart Hill
Demo](https://github.com/travishorn/chart-hill-demo) running.

## License

The MIT License (MIT)

Copyright © 2022 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
