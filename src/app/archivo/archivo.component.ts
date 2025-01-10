import { Component, inject, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { BuzonHojaRuta } from '../core/models/hojaRuta';
import { HojasRutaService } from '../core/services/hojas-ruta.service';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { BuzonVacioComponent } from '../components/buzon-vacio/buzon-vacio.component';
import { DatePipe, NgClass } from '@angular/common';
import { PadNumberPipe } from '../core/pipe/pad-number.pipe';

@Component({
  selector: 'app-archivo',
  standalone: true,
  imports: [
    ButtonModule,
    DataViewModule,
    BuzonVacioComponent,
    NgClass,
    PadNumberPipe,
    DatePipe,
  ],
  templateUrl: './archivo.component.html',
  styleUrl: './archivo.component.css',
})
export class ArchivoComponent implements OnInit {
  currentUser = getAuth().currentUser;
  hojasRutaService = inject(HojasRutaService);
  archivadas: BuzonHojaRuta[] = [];
  layout: 'list' | 'grid' = 'list';

  ngOnInit() {
    this.loadArchivadas();
  }
  loadArchivadas() {
    this.hojasRutaService
      .getArchivadas(this.currentUser?.uid!)
      .subscribe((res: BuzonHojaRuta[]) => {
        this.archivadas = res;
      });
  }
}
