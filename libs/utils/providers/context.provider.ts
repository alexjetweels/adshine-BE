import { User } from '@prisma/client';
import { KeyPermissionDefaultType } from 'libs/modules/init-data/init';
import { DateTime } from 'luxon';
import { ClsServiceManager } from 'nestjs-cls';

export interface AuthUser extends User {
  permission?: KeyPermissionDefaultType[];
}
export class ContextProvider {
  private static readonly nameSpace = 'request';

  private static readonly authUserKey = 'user_key';

  private static readonly languageKey = 'language_key';

  private static readonly dateRequest = 'date_request';

  private static get<T>(key: string) {
    const store = ClsServiceManager.getClsService();

    return store.get<T>(ContextProvider.getKeyWithNamespace(key));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static set(key: string, value: any): void {
    const store = ClsServiceManager.getClsService();

    store.set(ContextProvider.getKeyWithNamespace(key), value);
  }

  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }

  static setAuthUser(user: AuthUser): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }

  static setLanguage(language: string): void {
    ContextProvider.set(ContextProvider.languageKey, language);
  }

  static setDateRequest() {
    ContextProvider.set(ContextProvider.dateRequest, DateTime.now());
  }

  static getAuthUser<T>() {
    return ContextProvider.get<T>(ContextProvider.authUserKey);
  }

  static getDateRequest() {
    return ContextProvider.get<DateTime>(ContextProvider.dateRequest);
  }
}
