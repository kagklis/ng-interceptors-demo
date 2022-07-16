import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequiredFieldComponent } from './required-field/required-field.component';

@NgModule({
   declarations: [RequiredFieldComponent],
   imports: [CommonModule],
   exports: [FormsModule, RequiredFieldComponent],
})
export class SharedModule {}
