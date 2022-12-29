# MgxLoader

This is an Angular structural directive used to display a loader when the observable provided to it is loading its data.

# Basic syntax

All of the following syntaxes will work, so pick your poison :

```html
<div *mgxLoader="data$ as data"></div>
```

```html
<div *mgxLoader="data$; let data"></div>
```

```html
<div *mgxLoader="data$; let value = value"></div>
```

# Loader component

By default, the loader component is just a simple component that displays `LOADING ...`. This is by design, to let you choose your own loader component.

You can either declare a module-wide loader like so

```typescript
import { MgxLoaderModule, MGX_LOADER_COMPONENT } from "@mgxdev/ngx-utils/loader";

@NgModule({
  imports: [
    /* ...*/
    MgxLoaderModule,
  ],
  providers: [
    { provide: MGX_LOADER_COMPONENT, useFactory: () => YOUR_LOADING_COMPONENT },
  ],
})
export class YourModule {}
```

Or declare a template loader like so

```html
<div *mgxLoader="data$ as data; loader: loaderTpl"></div>
<ng-template #loaderTpl>Custom loader ...</ng-template>
```

# Loader condition

Same as the above, you can customize the condition that will display the loader. Default one is falsy.

```typescript
import {
  MgxLoaderModule,
  MGX_LOADER_CONDITION,
  MgxLoadingCondition,
} from "ngx-utils/loader";

@NgModule({
  imports: [
    /* ...*/
    MgxLoaderModule,
  ],
  providers: [
    {
      provide: MGX_LOADER_CONDITION,
      useValue: ((v: any) => !!v) as MgxLoadingCondition<any>,
    },
  ],
})
export class YourModule {}
```

Or in the template directly :

```html
<div *mgxLoader="data$ as data; condition: condition"></div>
```

```typescript
export class YourComponent {
  /* ... */

  condition(value: any) {
    return !!value;
  }
}
```
