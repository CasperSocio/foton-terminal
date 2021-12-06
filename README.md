# Photon Terminal

Photon Terminal is a CLI formatting tool that structures output in a similar way to React elements.


## Getting started

### Install

```bash
npm i -D photon-terminal
```


### Add a new element

```typescript
import Photon from 'photon-terminal'

const greeting = new Photon.Element('p')
greeting.content = 'Hello World!'

greeting.print()
// Prints 'Hello World!' to the CLI
```


### Apply styling to element

```typescript
import Photon from 'photon-terminal'

const status = new Photon.Element('p')
status.content = 'Passing'

status.style = {
  backgroundColor: 'green',
  color: 'black',
  margin: 2,
  textTransform: 'uppercase',
}

status.print()
```

<img width="388" alt="Screenshot 2021-12-03 at 14 25 50" src="https://user-images.githubusercontent.com/74550679/144610089-7c56f686-037c-448d-88f8-a92b2b8b047b.png">


## Photon.Element.style

### Background color

Sets the text background color.

**`backgroundColor:`**

- `'black'`
- `'blue'`
- `'green'`
- `'red'`
- `'white'`
- `'yellow'`


### Color

Sets the text color.

**`color:`**

- `'black'`
- `'blue'`
- `'green'`
- `'red'`
- `'white'`
- `'yellow'`


### Text decoration

Alter the visual appearance of text.

**`textDecoration:`**

- `'italic'` - Italic or cursive
- `'strong'` - Bold or increased brightness
- `'underline'`


### Text transform

Alter the output of text.

**`textTransform:`**

- `'capitalize'` - Capitalize every word in a string
- `'lowercase'` - Make every word lowercase
- `'uppercase'` - Make every word uppercase
