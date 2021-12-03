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
import Foton from './lib/index'

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
