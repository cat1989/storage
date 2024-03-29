# storage
Web Storage
```js
import { useStorage } from 'storage'

const storage = useStorage('users')
storage.set('id', 1)
console.log(storage.get('id'))  // 1

storage.set('name', 'John', new Date().getTime() + 1000)
setTimeout(() => {
    console.log(storage.get('name')) // null
}, 1000)

```
