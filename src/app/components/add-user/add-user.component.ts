import { Component, OnInit , NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudUserService } from 'src/app/service/crud-user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  UserForm:FormGroup;
  constructor(
    private FormBuilder: FormBuilder,
    private router: Router,
    private ngZone:NgZone,
    private crud: CrudUserService) {
      this.UserForm = this.FormBuilder.group({
        nom: [''],
        prenom: [''],
        email : [''],
        age: ['']
      })
    }

  ngOnInit(): void {

  }

  onSubmit():any{
    this.crud.AddUser(this.UserForm.value).subscribe((res:any)=>{
      console.log("Utilisateur ajouté avec succes");
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/users-list')
      },(err: any)=>{
        console.log(err);
      })
    })
  }

}
