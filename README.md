# Photon Terminal

(A re-release of Foton Terminal)

Photon Terminal is a CLI formatting tool that structures output in a similar way to React elements.


## Getting started

### Install

```bash
npm i -D photon-terminal
```


### Add a new element

```typescript
import Photon from 'photon-terminal'

const greeting = new Photon.Element({
  tag: 'p',
  content: 'Hello World!'
})

greeting.print()
// Prints 'Hello World!' to the CLI
```


### Apply styling to element

```typescript
import Photon from 'photon-terminal'

const classSuccess = new Photon.Style({
  backgroundColor: 'green',
  color: 'black',
  margin: 2,
  textDecoration: 'strong',
  textTransform: 'uppercase',
}).rules

const status = new Photon.Element({
  tag: 'p',
  content: 'Passing'
})
status.style = classSuccess

status.print()
```

<img width="388" alt="Screenshot 2021-12-03 at 14 25 50" src="https://user-images.githubusercontent.com/74550679/144610089-7c56f686-037c-448d-88f8-a92b2b8b047b.png">


## Photon.Element.style

### Background color

Sets the text background color.

`backgroundColor: 'black' | 'blue' | 'green' | 'red' | 'white' | 'yellow'`

Automatically sets `paddingLeft` and `paddingRight` to 1. This can be prevented by setting padding values to `0` or `'none'`.


### Color

Sets the text color.

`color: 'black' | 'blue' | 'green' | 'red' | 'white' | 'yellow'`


### Margin

Sets the spacing around the Element content.

`margin: <number> | 'none'`

Sets all sides to the same value. Set individual sides with:

`marginBottom: <number> | 'none'`  
`marginLeft: <number> | 'none'`  
`marginRight: <number> | 'none'`  
`marginTop: <number> | 'none'`


### Padding

Sets the spacing around the output text. Used with `backgroundColor` to prevent text from touching the background walls.

`paddingLeft: <number> | 'none'`  
`paddingRight: <number> | 'none'`


### Text decoration

Sets the visual appearance of text.

`textDecoration: 'italic' | 'strong' | 'underline'`


### Text transform

Transforms the text output.

`textTransform: 'capitalize' | 'lowercase' | 'uppercase'`
