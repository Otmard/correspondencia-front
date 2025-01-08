import { User } from './documentos';
import { Usuario } from './usuario';

// export interface HojaRuta {
//   estado: string;
//   emisor: Usuario;
//   responsableActual: Usuario;
//   id: number;
//   prioridad: string;
//   deletedAt: null;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface HojaRuta {
  id: number;
  estado: string;
  prioridad: string;
  referencia: string;
  cite: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  historialMovimientos: HistorialMovimiento[];
  emisor: User;
  responsableActual: User;
}

export interface HistorialMovimiento {
  id: number;
  accion: string;
  instruccion: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  procedencia: User;
  documento: Documento;
}

export interface Documento {
  id: number;
  cite: string;
  tipo: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  archivo: ArchivoElement[];
}

export interface ArchivoElement {
  id: number;
  tipo: string;
  archivo: ArchivoArchivo;
}

export interface ArchivoArchivo {
  id: number;
  key: string;
  bucket: string;
  tipo: string;
  url: null;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BuzonHojaRuta {
  id: number;
  estado: string;
  prioridad: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  historialMovimientos: HistorialMovimiento;
  emisor: User;
}
