import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';
import { element } from 'protractor';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {
  
  marcadores : Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA : number;
  latB : number;
  lngA : number;
  lngB : number;
  //polyline = false;

  constructor(private storage: Storage){  }

  ngOnInit()
    {
      this.polygon = false;
      this.storage.get('Polygon').then((val) => 
      {
        let marcador : Marcador = JSON.parse(val);
        for (let i in marcador)
        {
          this.marcadores.push(marcador[i]);
          console.log(this.marcadores);
          if(1==1)
          {
            this.paths.push(marcador[i]);
          }
          if(parseInt(i) %2)
          {
            this.polygon=false;
            //this.latA = (marcador[i].lat);
            //this.lngA = (marcador[i].lng);
          }
          else {
            this.polygon=true;
          }
         // if(parseInt(i)==4)
          //{
            //this.latB = (marcador[4].lat);
            //this.lngB = (marcador[4].lng);
            //this.polyline = true;
          //}
        }        
      });
    }
    ingresarMarcador(lat, lng, title, description){
      const nuevoMarcador = new Marcador(lat, lng, title, description);
      this.marcadores.push(nuevoMarcador);
    }
    agregarMarcador(evento){
      this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
      //Almacenamiento en local storage
      this.storage.set('Polygon', JSON.stringify(this.marcadores) );
      console.log(this.marcadores.length);
      //Creación del polígono
       if(1==1){
        this.paths=this.marcadores;
        if (this.marcadores.length %2
          ){
          this.polygon=false;
        }
        else {
           
          this.polygon=true;
        }


      //Creación de la línea
       /*if(this.marcadores.length==4)
        {
          this.latA = parseFloat(evento.coords.lat);
          this.lngA = parseFloat(evento.coords.lng);
        }
       if(this.marcadores.length==5)
       {
         this.latB = parseFloat(evento.coords.lat);
         this.lngB = parseFloat(evento.coords.lng);
         this.polyline = true;
       }*/
      }
    }
  }
