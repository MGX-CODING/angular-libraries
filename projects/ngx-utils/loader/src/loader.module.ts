import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MgxLoaderComponent } from './loader.component';
import { MgxLoaderDirective } from './loader.directive';

@NgModule({
  declarations: [MgxLoaderComponent, MgxLoaderDirective],
  imports: [CommonModule],
  exports: [MgxLoaderDirective],
  providers: [
    // { provide: MGX_LOADER_COMPONENT, useFactory: () => MgxLoaderComponent },
    // { provide: null, useValue: null }
  ],
})
export class MgxLoaderModule {}
