/* eslint-disable @typescript-eslint/no-explicit-any */
import { isSuccessResponse } from '@/shared/api';
import { checkTokenExp } from '@/shared/lib/utils/check-token-exp';

type RefreshSessionFn = (refreshToken: string) => Promise<any>;
type OnTokenRefreshed = (data: {
  accessToken: string;
  refreshToken: string;
  refreshExpiration: string;
}) => void;

export class TokenRefresher {
  private static instance: TokenRefresher;
  private refreshPromise: Promise<void> | null = null;
  private isRefreshing = false;

  private constructor() {}

  public static getInstance(): TokenRefresher {
    if (!TokenRefresher.instance) {
      TokenRefresher.instance = new TokenRefresher();
    }
    return TokenRefresher.instance;
  }

  public async refreshToken(
    refreshFn: RefreshSessionFn,
    refreshToken: string,
    onSuccess?: OnTokenRefreshed,
    onFailure?: () => void
  ): Promise<void> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const response = await refreshFn(refreshToken);
        
        if (!isSuccessResponse(response)) {
          throw new Error('Refresh failed');
        }

        onSuccess?.(response.data);
      } catch (error) {
        onFailure?.();
        throw error;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  public async checkAndRefresh(
    currentToken: string,
    refreshToken: string,
    refreshFn: RefreshSessionFn,
    onSuccess: OnTokenRefreshed,
    onFailure: () => void
  ): Promise<void> {
    if (checkTokenExp(currentToken)) {
      await this.refreshToken(refreshFn, refreshToken, onSuccess, onFailure);
    }
  }
}