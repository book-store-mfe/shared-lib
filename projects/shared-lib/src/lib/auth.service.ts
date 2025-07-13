import { computed, Injectable, signal } from '@angular/core';

interface User {
  name: string;
  email: string;
  token?: string;
}

const STORAGE_KEY = 'shared-lib-auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = signal<User | null>(null);
  private _authenticated = computed(() => !!this._user()?.token);

  token() {
    return this._user()?.token;
  }

  authenticated() {
    return this._authenticated();
  }

  signIn(email: String) {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      if (!json) {
        return false;
      }
      const data: User = JSON.parse(json);
      if (data?.email !== email) {
        return false;
      }
      this._user.set({
        name: data.name,
        email: data.email,
        token: crypto.randomUUID(),
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._user()));
      return this._user()!;
    } catch {
      return false;
    }
  }

  signInSilent() {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      if (!json) {
        return false;
      }
      const data: User = JSON.parse(json);
      if (!data?.token) {
        return false;
      }
      this._user.set({
        name: data.name,
        email: data.email,
        token: crypto.randomUUID(),
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._user()));
      return this._user()!;
    } catch {
      return false;
    }
  }

  signUp(name: string, email: string) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
  }

  signOut() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...this._user(), token: null }));
    this._user.set(null);
  }

}
