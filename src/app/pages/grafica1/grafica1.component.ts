import { Component} from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public doughnutChartLabels: Label[]=['Producto 1','Producto 2']
  public doughnutChartData: MultiDataSet = [
    [350,450,100],
    
  ];
  public colors: Color[]=[
    { backgroundColor: ['#6857E6','#009FEE','#F02059']}
  ];

}
