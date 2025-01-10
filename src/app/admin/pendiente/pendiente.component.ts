import { Component, inject, OnInit } from '@angular/core';
import { HojasRutaService } from '../../core/services/hojas-ruta.service';
import { BuzonHojaRuta, HojaRuta } from '../../core/models/hojaRuta';
import { getAuth } from '@angular/fire/auth';
import { JsonPipe, NgClass, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { PadNumberPipe } from '../../core/pipe/pad-number.pipe';
import { Router } from '@angular/router';
import { BuzonVacioComponent } from '../../components/buzon-vacio/buzon-vacio.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pendiente',
  standalone: true,
  imports: [
    PadNumberPipe,
    JsonPipe,
    DataViewModule,
    ButtonModule,
    TagModule,
    NgClass,
    DatePipe,
    BuzonVacioComponent,
  ],
  templateUrl: './pendiente.component.html',
  styleUrl: './pendiente.component.css',
})
export class PendienteComponent implements OnInit {
  messageService = inject(MessageService);
  archivar(item: HojaRuta) {
    this.hojasRutaService
      .archivar(item.id, this.currentUser!.uid)
      .subscribe((res) => {},()=>{},()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Archivado correctamente',
          detail: `El documento se ha archivado correctamente.`,
        });
        this.loadPendientes();
      });
  }
  router = inject(Router);
  responderHojaRuta(_t12: BuzonHojaRuta) {
    this.router.navigate(['/admin/nuevo'], { state: _t12 });
  }
  hojasRutaService = inject(HojasRutaService);
  pendientes: BuzonHojaRuta[] = [];
  currentUser = getAuth().currentUser;
  layout: 'list' | 'grid' = 'list';

  ngOnInit() {
    this.loadPendientes();
  }
  loadPendientes() {
    this.hojasRutaService
      .getPendientes(this.currentUser?.uid!)
      .subscribe((res: BuzonHojaRuta[]) => {
        this.pendientes = res;
      });
  }
}
