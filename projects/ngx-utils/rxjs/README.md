# RxJS utils

Set of useful RxJS tools.

# AutoUnsub

Automatically unsubscribes an observer when an Angular UI element is destroyed.

The class decorator is required unfortunately, if it is omitted, an error will be thrown.

```typescript
import { autoUnsub, AutoUnsub } from "ngx-utils/rxjs";

@AutoUnsub
export class MyComponent {
  /* ... */

  someFunction() {
    interval(1000)
      .pipe(autoUnsub(this))
      .subscribe(() => console.log("Some log"));
  }
}
```
