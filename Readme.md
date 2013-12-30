
# progress-svg

  Circular progress indicator using SVG

## Installation

With your favourite package manager:

- [packin](//github.com/jkroso/packin): `packin add jkroso/progress-svg`
- [component](//github.com/component/component#installing-packages): `component install jkroso/progress-svg`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install progress-svg`

then in your app:

```js
var Progress = require('progress-svg')
```

## API

### Progress()

  The Progress class

```js
var progress = new Progress
document.body.appendChild(progress.el)
```

### Progress#size(n)

  Set the size of the circle in pixels. The default is 100

```js
progress.size(40)
```

### Progress#update(n)

  update the display to show `n` percent completion

```js
progress.update(50)
```

### Progress#text(str)

  set the text to be placed in the center of the progress circle

```js
progress.text('%d percent') // '50 percent'
```
