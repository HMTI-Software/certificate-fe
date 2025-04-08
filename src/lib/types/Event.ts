/**
 * Interface untuk respons API yang mengembalikan data event.
 *
 * @template T - Jenis data yang dikembalikan dalam respons. Secara default adalah `IEventData`.
 *
 * @property {boolean} success - Menunjukkan apakah permintaan berhasil atau tidak.
 * @property {number} status - Kode status HTTP dari respons.
 * @property {string | string[]} message - Pesan yang menjelaskan hasil dari permintaan.
 * @property {T | [] | null} data - Data yang dikembalikan dalam respons. Bisa berupa data tipe `T`, array kosong, atau null.
 */
export interface IEventResponse<T = IEventData | IEventCreate> {
  success: boolean;
  status: number;
  message: string | string[];
  data: T | [] | null;
}

export interface IEventCreate {
  newEvent: {
    uid: string;
    userId: string;
    eventName: string;
    description: string;
    createdAt: string;
    activityAt: string;
    prefixCode: string;
    suffixCOde: number;
    organizer: string;
    eventTheme: string;
    eventTemplate:
      | "DEFAULTDESIGN"
      | "TECHNOLOGYDESIGN_1"
      | "TECHNOLOGYDESIGN_2"
      | "TECHNOLOGYDESIGN_3"
      | "FORMALDESIGN_1"
      | "FORMALDESIGN_2"
      | "FORMALDESIGN_3";
  };
  stakeholder: {
    name: string;
    position: string;
  };
}

/**
 * @interface IEventResponseData
 * Interface yang merepresentasikan struktur data respons untuk sebuah event.
 *
 * @property {string} uid - ID unik dari event.
 * @property {string} eventName - Nama dari event.
 * @property {string} eventTheme - Tema dari event.
 * @property {string} description - Deskripsi singkat mengenai event.
 * @property {string} createdAt - Tanggal dan waktu pembuatan event.
 * @property {string} activityAt - Tanggal dan waktu aktivitas event.
 * @property {string} organizer - Nama penyelenggara event.
 * @property {string} prefixCode - Kode prefix yang digunakan untuk sertifikat event.
 * @property {number} suffixCode - Kode suffix yang digunakan untuk sertifikat event.
 * @property {IEventParticipants[] | [] | null} eventParticipants - Daftar peserta yang terlibat dalam event.
 * @property {IEventStakeholder[] | [] | null} stakeholders - Daftar pemangku kepentingan yang terlibat dalam event.
 * @property {IEventOwner} owner - Informasi pemilik event.
 */
export interface IEventData {
  uid: string;
  eventName: string;
  eventTheme: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  activityAt: string;
  organizer: string;
  prefixCode: string;
  suffixCode: number;
  eventTemplate:
    | "DEFAULTDESIGN"
    | "TECHNOLOGYDESIGN_1"
    | "TECHNOLOGYDESIGN_2"
    | "TECHNOLOGYDESIGN_3"
    | "FORMALDESIGN_1"
    | "FORMALDESIGN_2"
    | "FORMALDESIGN_3";
  stakeholders: IEventStakeholder[] | [] | null;
}

/**
 * Interface untuk mendeskripsikan pemangku kepentingan (stakeholder) dalam sebuah event.
 *
 * @property {string} uid - ID unik dari pemangku kepentingan.
 * @property {string} name - Nama pemangku kepentingan / stakeholder.
 * @property {string} position - Posisi atau jabatan pemangku kepentingan dalam event.
 */
interface IEventStakeholder {
  uid: string;
  name: string;
  position: string;
}

/**
 * Interface untuk mendeskripsikan pemilik acara (event owner).
 *
 * @property {string} uid - ID unik pengguna yang menjadi pemilik event.
 * @property {string} email - Alamat email pengguna yang menjadi pemilik event.
 */
interface IEventOwner {
  uid: string;
  email: string;
}

/**
 * Interface untuk mendeskripsikan peserta acara (event participants).
 *
 * @property {string} uid - ID unik peserta.
 * @property {string} name - Nama lengkap peserta.
 * @property {string} position - Posisi atau jabatan peserta dalam event.
 * @property {string} email - Alamat email peserta.
 * @property {string} certificateNumber - Nomor sertifikat yang diberikan kepada peserta.
 */
export interface IEventParticipants {
  uid: string;
  name: string;
  position: string;
  email: string;
  certificateNumber: string;
}

/**
 * Antarmuka untuk tabel peserta acara.
 *
 * @property {number} id - ID unik peserta.
 * @property {string} name - Nama peserta.
 * @property {string} qrcode - Kode QR yang terkait dengan peserta.
 */
export interface IEventParticipantsTable {
  id: number;
  name: string;
  qrcode: string;
}
