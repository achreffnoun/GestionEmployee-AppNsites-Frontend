import { Component, OnInit } from '@angular/core';
import { CrudUserService } from 'src/app/service/crud-user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  Users:any = [];
  constructor(private crud: CrudUserService,) { }

  ngOnInit(): void {
    this.crud.getUsers().subscribe(res=>{
      console.log(res);
      this.Users = res;
    })
  }

  delete(id:any, i:any){
    console.log(id);
    if(window.confirm('Etes-vous sur de vouloir supprimer cet utilisateur ?')){
      this.crud.DeleteUser(id).subscribe(res=>{
        this.Users.splice(i,1);
      })
    }
  }

}
