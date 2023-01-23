import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';
import { environment } from '../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      const mockToken: Auth = {
        access_token: 'token',
      };

      spyOn(tokenService, 'saveToken').and.callThrough();
      authService.login('email', 'password').subscribe((token) => {
        expect(token).toEqual(mockToken);
        expect(tokenService.saveToken).toHaveBeenCalledWith(
          mockToken.access_token
        );
        doneFn();
      });

      const req = httpTestingController.expectOne(
        `${environment.API_URL}/api/auth/login`
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockToken);
    });
  });
});
