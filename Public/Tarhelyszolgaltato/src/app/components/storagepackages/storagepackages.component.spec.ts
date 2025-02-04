import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragepackagesComponent } from './storagepackages.component';

describe('StoragepackagesComponent', () => {
  let component: StoragepackagesComponent;
  let fixture: ComponentFixture<StoragepackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoragepackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragepackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
