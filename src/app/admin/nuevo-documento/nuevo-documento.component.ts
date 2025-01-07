import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StepperModule } from 'primeng/stepper';
import { DocxtemplaterService } from '../../core/services/docxtemplater.service';

import { FieldsetModule } from 'primeng/fieldset';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadModule,
} from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Documento, NuevoDocumento, User } from '../../core/models/documentos';
import { MinioService } from '../../core/services/minio.service';

import { JsonPipe, NgClass } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { environment } from '../../../environments/environment';
import { BuzonHojaRuta, HistorialMovimiento, HojaRuta } from '../../core/models/hojaRuta';
import { FilesService } from '../../core/services/files.service';
import { HojasRutaService } from '../../core/services/hojas-ruta.service';
import { DocumentoService } from '../../core/services/documento.service';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { PadNumberPipe } from '../../core/pipe/pad-number.pipe';

@Component({
  selector: 'app-nuevo-documento',
  standalone: true,
  imports: [
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    FormsModule,
    FloatLabelModule,
    ReactiveFormsModule,
    StepperModule,
    ButtonModule,
    ProgressSpinnerModule,
    FileUploadModule,
    FieldsetModule,
    PdfViewerModule,
    SidebarModule,
    DialogModule,
    NgClass,
    JsonPipe,
    TooltipModule,
    RouterLink,
    PadNumberPipe,
  ],
  templateUrl: './nuevo-documento.component.html',
  styleUrl: './nuevo-documento.component.css',
})
export class NuevoDocumentoComponent implements OnInit {
  getdownloadUrl(arg0: string) {
    this.minioService
      .generateDownloadUrl(environment.bucketDocumento, arg0)
      .subscribe((res) => {
        window.open(res, '_blank');
      });
  }
  getFileType(mimeType:string) {
    return mimeType.split('/')[1];
  }
  getProcedencia(procedencia: HistorialMovimiento[]) {
    console.log(procedencia);
    const elementoConIdMasAlto = procedencia.reduce(
      (max, item) => (item.id > max.id ? item : max),
      procedencia[0],
    );
    return elementoConIdMasAlto;
  }
  cargarPendientes() {
    this.hojaRutaService
      .getPendientes(this.currentUser.uuid)
      .subscribe((res) => {
        this.pendientes = res;
      });
  }
  @ViewChild('pf1') fileUpload!: FileUpload; // Captura el componente p-fileUpload

  documentoService = inject(DocumentoService);
  documento!: Documento;
  crearDocumento(nextCallback: any) {
    this.confirmationService.confirm({
      message: '¿Confirma la creación del documento?',
      header: 'Confirmacion',
      icon: 'pi pi-question-circle',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.documentoService
          .crearDocumento({
            userId: this.currentUser.uuid,
            cite: this.formDocumento.value.cite!,
            archivoPrincipal: this.datosArchivoPrincipal.id,
            adjuntos: this.idsArchivosAdjuntos,
          })
          .subscribe((res) => {
            this.documento = res;
            nextCallback.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Documento creado correctamente',
              detail: `El documento se ha creado correctamente.`,
            });
          });
      },
    });
  }
  confirmationService = inject(ConfirmationService);
  confimarDevivacion(_t134: any) {
    this.confirmationService.confirm({
      message: '¿Confima la derivacion de la hoja de ruta?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.hojaRutaService
          .derivarHojaRuta({
            idHojaRuta: this.hojaruta.id,
            idprocedencia: this.currentUser.uuid,
            iddestino: this.Selectdestinatario.uuid,
            instruccion: this.instruccionSeleccionada,
            documento: this.documento.id,
          })
          .subscribe((res) => {
            console.log(res);
          });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
    console.log(_t134);
    _t134.emit();
  }

  presionounateclas($event: Event) {
    console.log($event);
  }
  hojaRutaService = inject(HojasRutaService);
  modalSelecionarHojaRuta!: boolean;
  instrucciones = [
    'Para Su Conocimiento',
    'Analizar y Emitir Opinion',
    'Revisar y Emitir Informe',
    'Archivese',
  ];
  instruccionSeleccionada: any;

  selecionarHojaRuta() {
    throw new Error('Method not implemented.');
  }
  hojaruta!: HojaRuta;

  crearHojaRuta() {
    this.hojaRutaService
      .crearHojaRuta({
        emisorId: this.currentUser.uuid,
        responsableActualId: this.currentUser.uuid,
        estado: 'EMITIDA',
      })
      .subscribe(
        (res) => {
          this.hojaruta = res;
        },
        undefined,
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Hoja de ruta creada correctamente',
            detail: `La hoja de ruta se ha creado correctamente.`,
          });
        },
      );
  }
  archivosAdjuntos: File[] = [];
  idsArchivosAdjuntos: number[] = [];

  handleFileUploadAdjuntos($event: FileUploadHandlerEvent) {
    $event.files.forEach((element) => {
      this.minioService
        .uploadFileAdjunto(
          environment.bucketDocumento,
          element,
          this.currentUser.uuid,
        )
        .subscribe(
          (res) => {
            this.filesService
              .subitFileServer(
                element.type,
                `${this.currentUser.uuid}/${Date.now()}_${element.name}`,
                environment.bucketDocumento,
              )
              .subscribe((res: any) => {
                this.idsArchivosAdjuntos.push(res.id);
                this.verDocumentoPrincipal = false;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Archivo subido correctamente',
                  detail: `El archivo ${element.name} se ha subido correctamente.`,
                });
              });

            this.uploading = false;
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al subir archivo',
              detail: `Error al subir el archivo ${element.name}. Por favor, inténtelo de nuevo.`,
            });
          },
        );
    });
    this.archivosAdjuntos = $event.files;
  }
  messageService = inject(MessageService);
  verDocumentoPrincipal: any;

  pdfSrc: any;
  archivoPrincipal!: File | null;
  buttonArchivoPrincipal!: FileUpload;
  minioService = inject(MinioService);

  handleFileUpload($event: FileSelectEvent, fileUpload: FileUpload) {
    if ($event.files.length > 0) {
      this.buttonArchivoPrincipal = fileUpload;
      const file = $event.files[0];
      this.archivoPrincipal = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.pdfSrc = e.target.result;
        }
      };
      reader.readAsArrayBuffer(file);
      if (file.size > 5000000) {
        this.messageService.add({
          severity: 'error',
          summary: 'Archivo demasiado grande',
          detail: `El archivo ${file.name} es demasiado grande. El tamaño máximo permitido es de 5MB.`,
        });
      } else {
        this.verDocumentoPrincipal = true;
        fileUpload.clear();
      }
    }

    // this.handleFileUploadd({ files: $event.files });
  }

  uploading = false;

  datosArchivoPrincipal!: any;

  filesService = inject(FilesService);
  subitFileMinioArchivoPrincipal(file: File) {
    this.uploading = true;
    this.minioService
      .uploadFile(environment.bucketDocumento, file, this.currentUser.uuid)
      .subscribe(
        (res) => {
          this.filesService
            .subitFileServer(
              file.type,
              `${this.currentUser.uuid}/${file.name}`,
              environment.bucketDocumento,
            )
            .subscribe((res) => {
              this.datosArchivoPrincipal = res;
              this.verDocumentoPrincipal = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Archivo subido correctamente',
                detail: `El archivo ${file.name} se ha subido correctamente.`,
              });
            });

          this.uploading = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al subir archivo',
            detail: `Error al subir el archivo ${file.name}. Por favor, inténtelo de nuevo.`,
          });
        },
      );
  }
  Selectdestinatario!: User;
  saveDestinatario($event: DropdownChangeEvent) {
    this.Selectdestinatario = $event.value;
    this.formDocumento.patchValue({
      destinatario: $event.value.fullName,
      cargoDestinatario: $event.value.cargo,
    });
  }

  nuevoCite!: string;

  docxtemplaterService = inject(DocxtemplaterService);
  generarPlantillaDocx() {
    this.docxtemplaterService.generateDocument(this.formDocumento.value);
  }
  destinatarios: User[] = [];
  currentUser!: User;
  pendientes!: BuzonHojaRuta[];
  respondiendo = true;
  ngOnInit() {
    console.log(history.state);
    if (history.state.id) {

      this.respondiendo = false;
      this.hojaruta = history.state
    }

    this.docxtemplaterService.getNextCite().subscribe((res: NuevoDocumento) => {
      this.nuevoCite = res.cite;
      this.destinatarios = res.destinatarios;
      this.formDocumento.patchValue({
        cite: res.cite,
        remitente: res.user.fullName,
        cargoRemitente: res.user.cargo,
      });
      this.currentUser = res.user;
    });
  }
  fb = inject(FormBuilder);
  options: any[] | undefined = [
    { label: 'Categoria 1', value: 'categoria1' },
    { label: 'Categoria 2', value: 'categoria2' },
    { label: 'Categoria 3', value: 'categoria3' },
  ];
  selectedOption: any;

  formDocumento = this.fb.group({
    cite: ['', Validators.required],
    proceso: ['', Validators.required],
    destinatario: ['', Validators.required],
    cargoDestinatario: ['', Validators.required],
    referencia: ['', Validators.required],
    remitente: ['', Validators.required],
    cargoRemitente: ['', Validators.required],
  });
}
