import { Component,Output,EventEmitter,Injectable, Input } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import {MainPage} from '../main/main';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
//import {UserService} from '../../app/shared/user.service';
import {DisclaimerPage} from '../disclaimer/disclaimer';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  @Output() cleanInput :  EventEmitter<string>;
  @Output() setUsername: EventEmitter<any> = new EventEmitter<any>();
  @Input() theusername: string;
  mainPage = MainPage;
  homePage = HomePage;
  passValue : string = "HMA2018";
  userValue : string = "HydmechUser";
  tempPass : string = "";
  tempUser : string = "";
  tempUsers : JSON;
  tempFlag: boolean = false;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
  private http: Http) {
    this.cleanInput = new EventEmitter();
  }


 //https://api.myjson.com/bins/ https://jsonblob.com/850ee672-9d9a-11e7-aa97-09434374a2b8 https://quarkbackend.com/getfile/wearetamo/hydmech //https://www.jasonbase.com
 //http://myjson.com
  changePage( myPass: string, username:string){
    if(myPass === "HMA2018" && username === "HydmechUser"){
         this.tempFlag = true;
         this.setUsername.emit(username);
         this.theusername = username;
      }
      
    if(this.tempFlag) {
      this.navCtrl.push(this.mainPage);
      /*this.passValue = '';
      this.userValue = '';*/
      this.tempFlag = false;
    } else {
      const alert = this.alertCtrl.create({
        title:'Wrong Username or Password',
        subTitle: 'Please enter the correct Username and Password',
        message: "All new customers/users please contact Hydmech contact to obtain credentials.",
        buttons: [
          {
            text: 'Close',
            handler: ()=> {
              this.passValue = '';
              this.userValue = '';              
            }
          }
        ]
      });
      alert.present();
    }
  }

  getJSON(){
    return this.http.get('https://www.jasonbase.com/things/B8Jm.json').map((res) => res.json()).subscribe(data => {
     console.log(data.users);
     this.tempUsers= data.users;     
    }, (rej) => {console.error("Could not load local data",rej)});
  }//https://www.jasonbase.com/things/B8Jm/edit

  ionViewDidEnter(){
    //this.getJSON();
    console.log("enter");
  }

  openDisclaimer() {
    this.navCtrl.push(DisclaimerPage);
  }
}
    

  


