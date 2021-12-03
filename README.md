# Foton Terminal

Foton Terminal is a CLI formatting tool that structures output in a similar way to React elements.


## Getting started

### Install

```bash
npm i -D foton-terminal
```


### Add a new element

```typescript
import Foton from 'foton-terminal'

const greeting = new Foton.Element('p')
greeting.content = 'Hello World!'

greeting.print()
// Prints 'Hello World!' to the CLI
```


### Apply styling to element

```typescript
import Foton from 'foton-terminal'

const status = new Foton.Element('p')
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
