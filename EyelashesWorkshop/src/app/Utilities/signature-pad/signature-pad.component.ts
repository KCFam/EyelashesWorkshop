import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit {
  @ViewChild('signpad') viewSignPad: ElementRef;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 375,
    'canvasHeight': 300
  }
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth',5);
    this.signaturePad.set('canvasWidth',document.getElementById("SignPad").clientWidth);
    this.signaturePad.clear();
  }

  drawClear() {
    this.signaturePad.clear();
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

}
