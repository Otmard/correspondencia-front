import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataView, DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { HojasRutaService } from '../../core/services/hojas-ruta.service';
import { HojaRuta } from '../../core/models/hojaRuta';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { PadNumberPipe } from '../../core/pipe/pad-number.pipe';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { formatDistanceToNow } from 'date-fns';
import { es, ru } from 'date-fns/locale';
import { formatRelative, subDays } from 'date-fns';
import { MinioService } from '../../core/services/minio.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [
    JsonPipe,
    DataViewModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    NgClass,
    PadNumberPipe,
    DatePipe,
    DialogModule,
    TimelineModule,
    CardModule,
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css',
})
export class BuscarComponent implements OnInit {
  minioService = inject(MinioService);
  getdownloadUrl(arg0: string) {
    this.minioService
      .generateDownloadUrl(environment.bucketDocumento, arg0)
      .subscribe((res) => {
        window.open(res, '_blank');
      });
  }

  getFileType(mimeType: string) {
    return mimeType.split('/')[1];
  }
  getdate(fecha: Date): string | undefined {
    return formatRelative(fecha, new Date(), { locale: es });
  }
  modalHojaRuta: boolean = false;
  verHojaRuta(_t14: HojaRuta) {
    this.selectedHojaRuta = _t14;
    this.modalHojaRuta = true;
  }
  selectedHojaRuta!: HojaRuta;

  hojasRutaService = inject(HojasRutaService);
  HojasRuta: HojaRuta[] = [];
  ngOnInit() {
    this.hojasRutaService.getAllHojasRuta().subscribe((res) => {
      console.log(res);
      this.HojasRuta = res;
    });
  }
  buscar($event: Event) {
    const inputValue = ($event.target as HTMLInputElement).value;
    return inputValue;
  }
}
