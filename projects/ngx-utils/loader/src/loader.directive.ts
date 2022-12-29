import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  MgxLoadingCondition,
  MGX_LOADER_COMPONENT,
  MGX_LOADER_CONDITION,
} from './loader.tokens';

@Directive({ selector: '[mgxLoader]' })
export class MgxLoaderDirective<T> {
  /** Observable that will be listened to in order to display the content */
  @Input() mgxLoader!: Observable<T>;
  /** TemplateRef that can be provided to the directive to display another loader component */
  @Input() mgxLoaderLoader?: TemplateRef<LoaderContext<T>>;
  /** Loading condition that can be used to display the loader */
  @Input() mgxLoaderCondition?: MgxLoadingCondition<T>;

  #sub?: Subscription;

  constructor(
    private viewRef: ViewContainerRef,
    private templateRef: TemplateRef<LoaderContext<T>>,
    @Inject(MGX_LOADER_COMPONENT) private loaderComponent: Type<unknown>,
    @Inject(MGX_LOADER_CONDITION)
    private loaderCondition: MgxLoadingCondition<T>,
    private cdRef: ChangeDetectorRef
  ) {
    this.viewRef.clear();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mgxLoader']) {
      this.#sub?.unsubscribe();
      this.#sub = this.mgxLoader.subscribe((value) => {
        this.viewRef.clear();

        if (this.#checkCondition(value))
          this.viewRef.createEmbeddedView(
            this.templateRef,
            this.#createContext(value)
          );
        else this.#createLoaderView();

        this.cdRef.markForCheck();
      });
    }
  }

  #createContext(value: T): LoaderContext<T> {
    return {
      value,
      $implicit: value,
      mgxLoader: value,
    };
  }

  #createLoaderView() {
    if (this.mgxLoaderLoader)
      this.viewRef.createEmbeddedView(this.mgxLoaderLoader);
    else this.viewRef.createComponent(this.loaderComponent);
  }

  #checkCondition(value: T) {
    return this.mgxLoaderCondition?.(value) ?? this.loaderCondition(value);
  }

  /**
   * Method to let Ivy know the type of the context (types the variables declared in the HTML)
   */
  static ngTemplateContextGuard<T>(
    dir: MgxLoaderDirective<T>,
    ctx: LoaderContext<T>
  ): ctx is LoaderContext<T> {
    return true;
  }
}

interface LoaderContext<T> {
  $implicit: T;
  mgxLoader: T;
  value: T;
}
