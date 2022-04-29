import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { ODataConfiguration, ODataServiceFactory } from 'angular-odata-es5';
import { MesODataConfig } from './mes-odata-config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductionStepComponent } from './components/production-step/production-step.component';
import {MatCardModule} from '@angular/material/card';
import { TokenInterceptor } from './services/token.interceptor';
import { NgtCoreModule } from '@angular-three/core';
import { NgtBoxGeometryModule } from '@angular-three/core/geometries';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls'
import  { NgtAmbientLightModule,  NgtSpotLightModule} from '@angular-three/core/lights'
import { NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { PartComponent } from './components/part/part.component';
import {PlatformModule} from '@angular/cdk/platform';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    ProductionStepComponent,
    PartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    NgtCoreModule,
    NgtBoxGeometryModule,
    NgtMeshModule,
    NgtSobaOrbitControlsModule,
    NgtAmbientLightModule,
    NgtSpotLightModule,
    NgtMeshStandardMaterialModule,
    PlatformModule,
    LayoutModule
  ],
  providers: [ODataServiceFactory,
    { provide: ODataConfiguration,  useClass:MesODataConfig},
    { provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
