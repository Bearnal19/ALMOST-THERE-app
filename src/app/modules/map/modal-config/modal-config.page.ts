import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Utils } from 'src/app/core/config/utils';

@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.page.html',
  styleUrls: ['./modal-config.page.scss'],
})
export class ModalConfigPage implements OnInit {
  range: number;

  constructor(private modalController: ModalController, params: NavParams) {
    this.range = params.data.range;
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss({
      value: {
        range: this.range
      }
    });
  }

  plus() {
    this.range = (this.range < 10000) ? this.range + 100 : this.range;
  }

  minus() {
    this.range = (this.range > 100) ? this.range - 100 : this.range;
  }

  formatSize(size: number): string {
    if (size < 1000) {
      return size + 'm';
    } else {
      return Utils.mToKm(size) + 'km';
    }
  }
}
