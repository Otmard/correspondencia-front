import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css',
})
export class GraficoComponent implements OnInit {
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Enviado',
          backgroundColor: documentStyle.getPropertyValue('--primary-600'),
          data: this.random(),
        },
        {
          type: 'bar',
          label: 'Pendiente',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          data: this.random(),
        },
        {
          type: 'bar',
          label: 'Respondida',
          backgroundColor: documentStyle.getPropertyValue('--primary-300'),
          data: this.random(),
        },
        {
          type: 'bar',
          label: 'Archivada',
          backgroundColor: documentStyle.getPropertyValue('--primary-100'),
          data: this.random(),
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  random() {
    var array: any[] = [];
    for (let i = 0; i < 12; i++) {
      array[i] = Math.random() * (100 - 1) + 1;
    }
    return array;
  }
}
