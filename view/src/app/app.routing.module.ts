import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Default
    import { HomeComponent } from './home/home.component';
    import { OnlineFormComponent } from './online-form/online-form.component';

const appRoutes: Routes = [
    { path: '',
        component: HomeComponent,
        data: { animation: { value: 'Home', } }
    },
    { path: 'Online_Form/:Type',
        component: OnlineFormComponent,
        data: { animation: { value: 'Online_Form', } }
    },

];


@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forRoot(appRoutes,
        { enableTracing: true }
      )],
    providers: [],
    bootstrap: []
  })
  export class AppRoutingModule { }
