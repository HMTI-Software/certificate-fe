import { IUserData } from "@/lib/types/User";

/**
 * Interface atau type untuk Auth Response dari hasil fetching.
 *
 * @template T - Tipe data yang dikembalikan dalam respon. Secara default,
 *               dapat berupa `ISignInResponseData`, `ISignUpResponseData`, atau `IUserData`.
 *
 * @property {boolean} success - Menunjukkan apakah operasi autentikasi berhasil.
 * @property {number} status - Kode status HTTP dari respon.
 * @property {string[] | string} message - Pesan atau daftar pesan yang terkait dengan respon.
 * @property {T} data - Data spesifik yang dikembalikan dalam respon.
 */
export interface IAuthResponse<
  T = ISignInResponseData | ISignUpResponseData | IUserData,
> {
  success: boolean;
  status: number;
  message: string[] | string;
  data: T;
}

/**
 * Antarmuka untuk data respons saat proses masuk (sign-in).
 *
 * @property token - Token autentikasi yang diterima setelah berhasil masuk.
 */
export interface ISignInResponseData {
  token: string;
}

/**
 * Antarmuka untuk data respons saat proses masuk (sign-in).
 *
 * @property token - Token autentikasi yang diterima setelah berhasil masuk.
 */
export interface ISignUpResponseData {
  token: string;
}

/**
 * Antarmuka untuk mendefinisikan data pengguna sesi autentikasi.
 *
 * @property {string} id - ID unik pengguna.
 * @property {string} email - Alamat email pengguna.
 * @property {boolean} isPremium - Menunjukkan apakah pengguna memiliki status premium.
 * @property {"FREEPLAN" | "SILVER" | "PLATINUM" | "GOLD"} premiumPackage - Paket premium yang dimiliki pengguna.
 * @property {"USER" | "SUPERADMIN"} roles - Peran pengguna dalam sistem.
 */
export interface IAuthSessionUserData {
  id: string;
  email: string;
  isPremium: boolean;
  premiumPackage: "FREEPLAN" | "SILVER" | "PLATINUM" | "GOLD";
  roles: "USER" | "SUPERADMIN";
}

/**
 * Antarmuka untuk mendefinisikan sesi autentikasi pengguna.
 *
 * @property {IAuthSessionUserData} user - Data pengguna yang terkait dengan sesi autentikasi.
 * @property {string} token - Token autentikasi yang digunakan untuk mengakses sumber daya yang dilindungi.
 * @property {string} expires - Waktu kedaluwarsa token dalam format ISO 8601.
 */
export interface IAuthSession {
  user: IAuthSessionUserData;
  token: string;
  expires: string;
}
