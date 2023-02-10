import { Component, OnInit, NgZone } from '@angular/core';
import { CrudUserService } from 'src/app/service/crud-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crud: CrudUserService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('email');
    this.crud.GetUser(this.getId).subscribe(res => {
      this.updateForm.setValue({
        email: res['email'],
        nom: res['nom'],
        prenom: res['prenom']

      });
    });
    this.updateForm = this.formBuilder.group({
      email: [''],
      nom: [''],
      prenom: ['']

    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.crud.UpdateUser(this.updateForm.value)
    .subscribe((res) => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
      }, (err) => {
        console.log(err);
    });
  }
}
