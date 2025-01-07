// src/app/s3-upload.service.ts

import { Injectable } from '@angular/core';
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { from, Observable } from 'rxjs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'; // Importa el método para generar la URL firmada
import { Upload } from '@aws-sdk/lib-storage';

@Injectable({
  providedIn: 'root',
})
export class MinioService {
  private s3: S3Client;

  constructor() {
    // Configura el cliente S3 para MinIO
    this.s3 = new S3Client({
      endpoint: 'https://minio-kokscc0scssowkwc0k8wk8kc.92.112.176.8.sslip.io', // Dirección de tu servidor MinIO
      region: 'us-east-1', // MinIO no necesita una región específica, usa un valor genérico
      credentials: {
        accessKeyId: 'AEASZ5NEAnVEcGoncofi', // Usa las credenciales de MinIO
        secretAccessKey: 'tPU9IX3AGblLylWn3z0imbjL66HzlE1wW8AKO8c8', // Usa las credenciales de MinIO
      },
      forcePathStyle: true, // MinIO requiere que uses path style para acceder a los buckets
    });
  }

  // Método para listar los buckets
  listBuckets() {
    const command = new ListBucketsCommand({});
    return from(this.s3.send(command));
  }

  // Método para subir un archivo a un bucket
  uploadFile(bucketName: string, file: File, uuid: string) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `${uuid}/${file.name}`,
      Body: file,
    });
    return from(this.s3.send(command));
  }

  uploadFileAdjunto(bucketName: string, file: File, uuid: string) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `${uuid}/${Date.now()}_${file.name}`,
      Body: file,
    });
    return from(this.s3.send(command));
  }

  generateDownloadUrl(
    bucketName: string,
    objectKey: string,
    expiresIn: number = 3600,
  ) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    return from(getSignedUrl(this.s3, command, { expiresIn }));
  }
  getObject(bucketName: string, objectKey: string) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });
    return from(this.s3.send(command));
  }
}
