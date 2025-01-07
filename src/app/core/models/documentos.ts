export interface Documento {
  cite: string;
  emisor: User;
  id: number;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
}
// export interface Emisor {
//   uuid: string;
//   email: string;
//   photoUrl: null;
//   fullName: string;
//   rol: string;
//   cargo: string;
//   deletedAt: null;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface NuevoDocumento {
  user: User;
  cite: string;
  uuid: string;
  destinatarios: User[];
}

export interface User {
  uuid: string;
  email: string;
  photoUrl: null;
  fullName: string;
  rol: string;
  cargo: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
}
