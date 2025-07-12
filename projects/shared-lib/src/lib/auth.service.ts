import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'shared-lib-auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token = signal('');
  private _authenticated = signal(false);

  isAuthenticated() {
    return this._authenticated;
  }

  getToken() {
    return this._token();
  }

  login(email: String) {
    try {
      const storagData = localStorage.getItem(STORAGE_KEY);
      if (!storagData || JSON.parse(storagData)?.email !== email) {
        return false;
      }
    } catch {
      return false;
    }

    this._authenticated.set(true)
    this._token.set(crypto.randomUUID())
    return true;
  }

  register(name: string, email: String) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
  }

  logout() {
    this._authenticated.set(false)
    this._token.set('')
    localStorage.removeItem(STORAGE_KEY);
  }

}
