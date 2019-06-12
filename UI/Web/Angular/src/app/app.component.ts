import { Component,OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute ,Params} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

// implements OnInit 
export class AppComponent {
  title = 'User Registraion System';
  constructor(private router: Router) {}
  ngOnInit() {
    console.log('welcome page'); 
  //  this.router.navigate(['/register'])
  }

}
