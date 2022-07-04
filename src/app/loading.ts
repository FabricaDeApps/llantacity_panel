
import { Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'loading',
	template: `		<div class="preloader" id="pause">
	<div class="spinner">
	<div class="dot1"></div>
	<div class="dot2"></div>
  </div>
	<img style="text-align: center !important; padding-top: 45px;"  src="assets/images/logo.png" id="logo" class="light-logo img-fluid parpadea">
</div>`,
	styleUrls: ['loading.scss']
})

export class LoadingComponent {

}
