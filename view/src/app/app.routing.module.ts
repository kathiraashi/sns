import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OnlineExamMainComponent } from './online-exam/online-exam-main/online-exam-main.component';

// Default
    import { HomeComponent } from './home/home.component';
    import { OnlineFormComponent } from './online-form/online-form.component';

const appRoutes: Routes = [
   { path: '',
      component: HomeComponent,
      data: { animation: { value: 'Home', } }
   },
   { path: 'Online_Form/:Institution_Id',
      component: OnlineFormComponent,
      data: { animation: { value: 'Online_Form', } }
   },
   { path: 'Online_Exam/:Exam_Id',
      component: OnlineExamMainComponent,
      data: { animation: { value: 'Online_Exam', } }
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
