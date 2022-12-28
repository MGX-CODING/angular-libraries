import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgxLoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: MgxLoaderComponent;
  let fixture: ComponentFixture<MgxLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgxLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MgxLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
