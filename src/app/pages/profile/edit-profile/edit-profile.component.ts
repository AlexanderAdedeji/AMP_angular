import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/Business/tools/storage/storge-service.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public isAdmin = false;
  constructor(
    public storageService: StorageService
  ) 
  {
    
   }

  ngOnInit(): void {
    this.authenticateCurrentUserForPages()
  }



  
  authenticateCurrentUserForPages(){
    
    const userType: any = this.storageService.UserType; 
    this.isAdmin = userType.name == "SUPERUSER"?  true:false;
    
}

}
