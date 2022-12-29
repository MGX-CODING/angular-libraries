import { Observable, Subject, takeUntil } from 'rxjs';

const subjectAddedSymbol: unique symbol = Symbol('__mgxSubjectAdded');
const triggerSymbol: unique symbol = Symbol('__mgxTrigger');
const decoratedSymbol: unique symbol = Symbol('__mgxDecorated');

export function AutoUnsub(component: new (...args: any[]) => any) {
  const proto = component.prototype;
  const originalDestroy = proto.ngOnDestroy;

  proto[decoratedSymbol] = true;

  proto.ngOnDestroy = function () {
    originalDestroy?.call(this);
    this[triggerSymbol]?.next();
    this[triggerSymbol]?.complete();
  };
}

export function autoUnsub<T>(component: T) {
  if (!(component as any)[decoratedSymbol])
    throw new Error(
      'AutoUnsubscribe : the class does not have the @AutoUnsub decorator, which is required.'
    );

  if (!(component as any)[subjectAddedSymbol]) {
    (component as any)[triggerSymbol] = new Subject();
    (component as any)[subjectAddedSymbol] = true;
  }

  return <U>(source: Observable<U>) => {
    return source.pipe(takeUntil<U>((component as any)[triggerSymbol]));
  };
}
