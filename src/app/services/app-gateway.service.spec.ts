import { TestBed } from '@angular/core/testing';

import { AppGatewayService } from './app-gateway.service';

describe('AppGatewayService', () => {
  let service: AppGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
