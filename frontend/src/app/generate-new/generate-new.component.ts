import { Component, OnInit } from '@angular/core';
import { PeopleTree } from '../models/people.model';
import {  ViewChild, ElementRef } from '@angular/core';
import { Line } from '../models/line.model';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import { saveAs } from 'file-saver';
import { RelationsService } from '../services/relations.service';
@Component({
  selector: 'app-generate-new',
  templateUrl: './generate-new.component.html',
  styleUrls: ['./generate-new.component.css']
})
export class GenerateNewComponent implements OnInit{

  constructor(private scroller: ViewportScroller, private servis: RelationsService) { }

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;  

  @ViewChild('pozadina', { static: true }) div;
  pozadina: ElementRef<HTMLDivElement>;  
  
  private ctx: CanvasRenderingContext2D;

  @ViewChild('modalChoice') modalChoice; 


  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
   
    
    this.countries = [ 
      {name: 'Afghanistan', code: 'AF'}, 
      {name: 'Åland Islands', code: 'AX'}, 
      {name: 'Albania', code: 'AL'}, 
      {name: 'Algeria', code: 'DZ'}, 
      {name: 'American Samoa', code: 'AS'}, 
      {name: 'AndorrA', code: 'AD'}, 
      {name: 'Angola', code: 'AO'}, 
      {name: 'Anguilla', code: 'AI'}, 
      {name: 'Antarctica', code: 'AQ'}, 
      {name: 'Antigua and Barbuda', code: 'AG'}, 
      {name: 'Argentina', code: 'AR'}, 
      {name: 'Armenia', code: 'AM'}, 
      {name: 'Aruba', code: 'AW'}, 
      {name: 'Australia', code: 'AU'}, 
      {name: 'Austria', code: 'AT'}, 
      {name: 'Azerbaijan', code: 'AZ'}, 
      {name: 'Bahamas', code: 'BS'}, 
      {name: 'Bahrain', code: 'BH'}, 
      {name: 'Bangladesh', code: 'BD'}, 
      {name: 'Barbados', code: 'BB'}, 
      {name: 'Belarus', code: 'BY'}, 
      {name: 'Belgium', code: 'BE'}, 
      {name: 'Belize', code: 'BZ'}, 
      {name: 'Benin', code: 'BJ'}, 
      {name: 'Bermuda', code: 'BM'}, 
      {name: 'Bhutan', code: 'BT'}, 
      {name: 'Bolivia', code: 'BO'}, 
      {name: 'Bosnia and Herzegovina', code: 'BA'}, 
      {name: 'Botswana', code: 'BW'}, 
      {name: 'Bouvet Island', code: 'BV'}, 
      {name: 'Brazil', code: 'BR'}, 
      {name: 'British Indian Ocean Territory', code: 'IO'}, 
      {name: 'Brunei Darussalam', code: 'BN'}, 
      {name: 'Bulgaria', code: 'BG'}, 
      {name: 'Burkina Faso', code: 'BF'}, 
      {name: 'Burundi', code: 'BI'}, 
      {name: 'Cambodia', code: 'KH'}, 
      {name: 'Cameroon', code: 'CM'}, 
      {name: 'Canada', code: 'CA'}, 
      {name: 'Cape Verde', code: 'CV'}, 
      {name: 'Cayman Islands', code: 'KY'}, 
      {name: 'Central African Republic', code: 'CF'}, 
      {name: 'Chad', code: 'TD'}, 
      {name: 'Chile', code: 'CL'}, 
      {name: 'China', code: 'CN'}, 
      {name: 'Christmas Island', code: 'CX'}, 
      {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
      {name: 'Colombia', code: 'CO'}, 
      {name: 'Comoros', code: 'KM'}, 
      {name: 'Congo', code: 'CG'}, 
      {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
      {name: 'Cook Islands', code: 'CK'}, 
      {name: 'Costa Rica', code: 'CR'}, 
      {name: 'Cote D\'Ivoire', code: 'CI'}, 
      {name: 'Croatia', code: 'HR'}, 
      {name: 'Cuba', code: 'CU'}, 
      {name: 'Cyprus', code: 'CY'}, 
      {name: 'Czech Republic', code: 'CZ'}, 
      {name: 'Denmark', code: 'DK'}, 
      {name: 'Djibouti', code: 'DJ'}, 
      {name: 'Dominica', code: 'DM'}, 
      {name: 'Dominican Republic', code: 'DO'}, 
      {name: 'Ecuador', code: 'EC'}, 
      {name: 'Egypt', code: 'EG'}, 
      {name: 'El Salvador', code: 'SV'}, 
      {name: 'Equatorial Guinea', code: 'GQ'}, 
      {name: 'Eritrea', code: 'ER'}, 
      {name: 'Estonia', code: 'EE'}, 
      {name: 'Ethiopia', code: 'ET'}, 
      {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
      {name: 'Faroe Islands', code: 'FO'}, 
      {name: 'Fiji', code: 'FJ'}, 
      {name: 'Finland', code: 'FI'}, 
      {name: 'France', code: 'FR'}, 
      {name: 'French Guiana', code: 'GF'}, 
      {name: 'French Polynesia', code: 'PF'}, 
      {name: 'French Southern Territories', code: 'TF'}, 
      {name: 'Gabon', code: 'GA'}, 
      {name: 'Gambia', code: 'GM'}, 
      {name: 'Georgia', code: 'GE'}, 
      {name: 'Germany', code: 'DE'}, 
      {name: 'Ghana', code: 'GH'}, 
      {name: 'Gibraltar', code: 'GI'}, 
      {name: 'Greece', code: 'GR'}, 
      {name: 'Greenland', code: 'GL'}, 
      {name: 'Grenada', code: 'GD'}, 
      {name: 'Guadeloupe', code: 'GP'}, 
      {name: 'Guam', code: 'GU'}, 
      {name: 'Guatemala', code: 'GT'}, 
      {name: 'Guernsey', code: 'GG'}, 
      {name: 'Guinea', code: 'GN'}, 
      {name: 'Guinea-Bissau', code: 'GW'}, 
      {name: 'Guyana', code: 'GY'}, 
      {name: 'Haiti', code: 'HT'}, 
      {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
      {name: 'Holy See (Vatican City State)', code: 'VA'}, 
      {name: 'Honduras', code: 'HN'}, 
      {name: 'Hong Kong', code: 'HK'}, 
      {name: 'Hungary', code: 'HU'}, 
      {name: 'Iceland', code: 'IS'}, 
      {name: 'India', code: 'IN'}, 
      {name: 'Indonesia', code: 'ID'}, 
      {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
      {name: 'Iraq', code: 'IQ'}, 
      {name: 'Ireland', code: 'IE'}, 
      {name: 'Isle of Man', code: 'IM'}, 
      {name: 'Israel', code: 'IL'}, 
      {name: 'Italy', code: 'IT'}, 
      {name: 'Jamaica', code: 'JM'}, 
      {name: 'Japan', code: 'JP'}, 
      {name: 'Jersey', code: 'JE'}, 
      {name: 'Jordan', code: 'JO'}, 
      {name: 'Kazakhstan', code: 'KZ'}, 
      {name: 'Kenya', code: 'KE'}, 
      {name: 'Kiribati', code: 'KI'}, 
      {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
      {name: 'Korea, Republic of', code: 'KR'}, 
      {name: 'Kuwait', code: 'KW'}, 
      {name: 'Kyrgyzstan', code: 'KG'}, 
      {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
      {name: 'Latvia', code: 'LV'}, 
      {name: 'Lebanon', code: 'LB'}, 
      {name: 'Lesotho', code: 'LS'}, 
      {name: 'Liberia', code: 'LR'}, 
      {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
      {name: 'Liechtenstein', code: 'LI'}, 
      {name: 'Lithuania', code: 'LT'}, 
      {name: 'Luxembourg', code: 'LU'}, 
      {name: 'Macao', code: 'MO'}, 
      {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
      {name: 'Madagascar', code: 'MG'}, 
      {name: 'Malawi', code: 'MW'}, 
      {name: 'Malaysia', code: 'MY'}, 
      {name: 'Maldives', code: 'MV'}, 
      {name: 'Mali', code: 'ML'}, 
      {name: 'Malta', code: 'MT'}, 
      {name: 'Marshall Islands', code: 'MH'}, 
      {name: 'Martinique', code: 'MQ'}, 
      {name: 'Mauritania', code: 'MR'}, 
      {name: 'Mauritius', code: 'MU'}, 
      {name: 'Mayotte', code: 'YT'}, 
      {name: 'Mexico', code: 'MX'}, 
      {name: 'Micronesia, Federated States of', code: 'FM'}, 
      {name: 'Moldova, Republic of', code: 'MD'}, 
      {name: 'Monaco', code: 'MC'}, 
      {name: 'Mongolia', code: 'MN'}, 
      {name: 'Montenegro', code: 'ME'}, 
      {name: 'Montserrat', code: 'MS'}, 
      {name: 'Morocco', code: 'MA'}, 
      {name: 'Mozambique', code: 'MZ'}, 
      {name: 'Myanmar', code: 'MM'}, 
      {name: 'Namibia', code: 'NA'}, 
      {name: 'Nauru', code: 'NR'}, 
      {name: 'Nepal', code: 'NP'}, 
      {name: 'Netherlands', code: 'NL'}, 
      {name: 'Netherlands Antilles', code: 'AN'}, 
      {name: 'New Caledonia', code: 'NC'}, 
      {name: 'New Zealand', code: 'NZ'}, 
      {name: 'Nicaragua', code: 'NI'}, 
      {name: 'Niger', code: 'NE'}, 
      {name: 'Nigeria', code: 'NG'}, 
      {name: 'Niue', code: 'NU'}, 
      {name: 'Norfolk Island', code: 'NF'}, 
      {name: 'Northern Mariana Islands', code: 'MP'}, 
      {name: 'Norway', code: 'NO'}, 
      {name: 'Oman', code: 'OM'}, 
      {name: 'Pakistan', code: 'PK'}, 
      {name: 'Palau', code: 'PW'}, 
      {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
      {name: 'Panama', code: 'PA'}, 
      {name: 'Papua New Guinea', code: 'PG'}, 
      {name: 'Paraguay', code: 'PY'}, 
      {name: 'Peru', code: 'PE'}, 
      {name: 'Philippines', code: 'PH'}, 
      {name: 'Pitcairn', code: 'PN'}, 
      {name: 'Poland', code: 'PL'}, 
      {name: 'Portugal', code: 'PT'}, 
      {name: 'Puerto Rico', code: 'PR'}, 
      {name: 'Qatar', code: 'QA'}, 
      {name: 'Reunion', code: 'RE'}, 
      {name: 'Romania', code: 'RO'}, 
      {name: 'Russian Federation', code: 'RU'}, 
      {name: 'RWANDA', code: 'RW'}, 
      {name: 'Saint Helena', code: 'SH'}, 
      {name: 'Saint Kitts and Nevis', code: 'KN'}, 
      {name: 'Saint Lucia', code: 'LC'}, 
      {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
      {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
      {name: 'Samoa', code: 'WS'}, 
      {name: 'San Marino', code: 'SM'}, 
      {name: 'Sao Tome and Principe', code: 'ST'}, 
      {name: 'Saudi Arabia', code: 'SA'}, 
      {name: 'Senegal', code: 'SN'}, 
      {name: 'Serbia', code: 'RS'}, 
      {name: 'Seychelles', code: 'SC'}, 
      {name: 'Sierra Leone', code: 'SL'}, 
      {name: 'Singapore', code: 'SG'}, 
      {name: 'Slovakia', code: 'SK'}, 
      {name: 'Slovenia', code: 'SI'}, 
      {name: 'Solomon Islands', code: 'SB'}, 
      {name: 'Somalia', code: 'SO'}, 
      {name: 'South Africa', code: 'ZA'}, 
      {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
      {name: 'Spain', code: 'ES'}, 
      {name: 'Sri Lanka', code: 'LK'}, 
      {name: 'Sudan', code: 'SD'}, 
      {name: 'Suriname', code: 'SR'}, 
      {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
      {name: 'Swaziland', code: 'SZ'}, 
      {name: 'Sweden', code: 'SE'}, 
      {name: 'Switzerland', code: 'CH'}, 
      {name: 'Syrian Arab Republic', code: 'SY'}, 
      {name: 'Taiwan, Province of China', code: 'TW'}, 
      {name: 'Tajikistan', code: 'TJ'}, 
      {name: 'Tanzania, United Republic of', code: 'TZ'}, 
      {name: 'Thailand', code: 'TH'}, 
      {name: 'Timor-Leste', code: 'TL'}, 
      {name: 'Togo', code: 'TG'}, 
      {name: 'Tokelau', code: 'TK'}, 
      {name: 'Tonga', code: 'TO'}, 
      {name: 'Trinidad and Tobago', code: 'TT'}, 
      {name: 'Tunisia', code: 'TN'}, 
      {name: 'Turkey', code: 'TR'}, 
      {name: 'Turkmenistan', code: 'TM'}, 
      {name: 'Turks and Caicos Islands', code: 'TC'}, 
      {name: 'Tuvalu', code: 'TV'}, 
      {name: 'Uganda', code: 'UG'}, 
      {name: 'Ukraine', code: 'UA'}, 
      {name: 'United Arab Emirates', code: 'AE'}, 
      {name: 'United Kingdom', code: 'GB'}, 
      {name: 'United States', code: 'US'}, 
      {name: 'United States Minor Outlying Islands', code: 'UM'}, 
      {name: 'Uruguay', code: 'UY'}, 
      {name: 'Uzbekistan', code: 'UZ'}, 
      {name: 'Vanuatu', code: 'VU'}, 
      {name: 'Venezuela', code: 'VE'}, 
      {name: 'Viet Nam', code: 'VN'}, 
      {name: 'Virgin Islands, British', code: 'VG'}, 
      {name: 'Virgin Islands, U.S.', code: 'VI'}, 
      {name: 'Wallis and Futuna', code: 'WF'}, 
      {name: 'Western Sahara', code: 'EH'}, 
      {name: 'Yemen', code: 'YE'}, 
      {name: 'Zambia', code: 'ZM'}, 
      {name: 'Zimbabwe', code: 'ZW'} 
    ];
    this.countriesFiltered = this.countries;
    this.filter = null;
    this.enteredMyself = false;
    this.addNew = false;
    this.display = 'none';
    this.startListeningClicks = false;
    this.showClickMessage = false;
    this.errorMissingInformation = null;
    this.canUndo = false;
    this.undoNode = null;
    this.canEdit = false;
    this.editNode = null;
    this.female = 'female';
    this.language = sessionStorage.getItem("language");
    this.slob= 0;
    this.highlightRelatives = [];
    this.delay = 0;
   
    this.showStatistics = false;
  }

  me : PeopleTree;
  enteredMyself : boolean;
  //adding
  addNew: boolean;
  chosenNode: PeopleTree;
  display;
  errorAddMessage: string;
  showAddForm: boolean;
  newPersonKind: string;
  startListeningClicks: boolean;
  showClickMessage: boolean;
  errorMissingInformation: string;
  canUndo: boolean;
  undoNode: PeopleTree;

  female: string;

  canEdit: boolean;
  editNode: PeopleTree;

   //edit person info
  
   editPersonDateOfBirth: Date;
   editPersonDateOfDeath: Date;
   
   

  //new person info
  newPersonName: string;
  newPersonSurname: string;
  newPersonDateOfBirth: Date;
  newPersonDateOfDeath: Date;
  newPersonPlaceOfBirth: string;
  newPersonGender: string;
  newPersonPicture: string;
  newPersonProfession: string;

  successTextAlert : string;
  countries ;
  countriesFiltered;
  countriesTemp;
  filter: string;

  //languages
  language: string;
  
  //search
  showSearchForm: boolean;

  //statistics
  showStatistics: boolean;

  averageNumberOfChildren: number;
  averageLifespan: number;
  

  isEnglish(){
    return this.language=="English" || this.language==null;
  }
  isSerbian(){
    return this.language=="Srpski";
  }
  odabranaSlicica(e){
    let slika = [];
    if(e.target.files.length>0){
      slika = e.target.files[0];
      
    }
    
    
  }

  myURL;

  slob: number;
  successfulExport: boolean;

  addNewPerson(){

    if(this.newPersonName==null){
      if(this.isEnglish())
        this.errorMissingInformation = "Please enter a name."
      if(this.isSerbian())
        this.errorMissingInformation = "Молимо унесите име."
      return;
    }
    if(this.newPersonSurname==null){
      if(this.isEnglish())
        this.errorMissingInformation = "Please enter a surname."
      if(this.isSerbian())
        this.errorMissingInformation = "Молимо унесите презиме."
      return;
    }
    if(this.newPersonDateOfBirth==null){
      if(this.isEnglish())
        this.errorMissingInformation = "Please enter a date of birth."
      if(this.isSerbian())
        this.errorMissingInformation = "Молимо унесите датум рођења."
      return;
    }
    if(this.newPersonGender==null){
      if(this.isEnglish())
        this.errorMissingInformation = "Please choose a gender."
      if(this.isSerbian())
        this.errorMissingInformation = "Молимо одаберите пол."
      return;
    }
    if(this.newPersonKind=='mother' && (this.newPersonGender.toLowerCase()=='male' || this.newPersonGender.toLowerCase()=='мушки')  ){
      if(this.isEnglish())
        this.errorMissingInformation = "Mother has to be female."
      if(this.isSerbian())
        this.errorMissingInformation = "Мајка мора да буде женско."
      return;
    }
    if(this.newPersonKind=='father' && (this.newPersonGender.toLowerCase()=='female' || this.newPersonGender.toLowerCase()=='женски')){
      if(this.isEnglish())
        this.errorMissingInformation = "Father has to be male."
      if(this.isSerbian())
        this.errorMissingInformation = "Отац мора да буде мушко."
     
      return;
    }

    this.errorMissingInformation = null;

  this.newPersonDateOfBirth = new Date(this.newPersonDateOfBirth);
  if(this.newPersonDateOfDeath!=null)
    this.newPersonDateOfDeath = new Date(this.newPersonDateOfDeath);
    
  //console.log("POL "+this.slob+this.newPersonGender);
  console.log(this.newPersonPicture==null);
  console.log(this.newPersonPicture);
  this.slob = this.slob + 1;
  if(this.newPersonPicture==null){
    //console.log("EVO NAS BURAZENGIJO");
   
    if(this.newPersonGender.toLowerCase()=="female" || this.newPersonGender.toLowerCase()=="женски" ) this.newPersonPicture = "assets/images/woman.png";
    else  if(this.newPersonGender.toLowerCase()=="male"|| this.newPersonGender.toLowerCase()=="мушки") this.newPersonPicture = "assets/images/man.png";
   // console.log(this.newPersonPicture);
  }  
  else{
    
    if(this.newPersonPicture.lastIndexOf("images")!=-1)this.newPersonPicture = this.newPersonPicture.substring(this.newPersonPicture.lastIndexOf("images")+7);
    if(this.newPersonPicture.lastIndexOf("fakepath")!=-1)this.newPersonPicture =  this.newPersonPicture.substring(this.newPersonPicture.lastIndexOf("fakepath") + 9);
    
    if(this.newPersonPicture.charAt(0)!='a')this.newPersonPicture = "assets/images/"+this.newPersonPicture;
    //console.log(this.newPersonPicture);
  }

    if(!this.enteredMyself){
    this.ctx.canvas.width=window.innerWidth;
    this.ctx.canvas.height=window.innerHeight;
    this.ctx.canvas.addEventListener('mousedown', (e)=> {
      this.getCursorPosition(this.ctx.canvas, e);});
    this.ctx.canvas.addEventListener('click', (e)=> {
        this.clickedOnCanvas(this.ctx.canvas, e);});
    
    this.me = new PeopleTree(this.ctx);
    this.me.x = this.ctx.canvas.width/2;
    this.me.y = this.ctx.canvas.height/2;
    
    

    this.me.name = this.newPersonName;
    this.me.surname = this.newPersonSurname;
    this.me.date_of_birth = this.newPersonDateOfBirth;
    this.me.date_of_death = this.newPersonDateOfDeath;
    this.me.place_of_birth = this.newPersonPlaceOfBirth;
    this.me.profession = this.newPersonProfession;
    this.me.gender = this.newPersonGender;
    this.me.picture = this.newPersonPicture;
    if(PeopleTree.broj==null) PeopleTree.broj = 0;
    this.me.id = PeopleTree.broj+1;
    PeopleTree.broj=PeopleTree.broj + 1;
    this.me.draw();
    
    setInterval(()=>{
      this.bfsWithRedraw(this.me);
    }, 100);
      this.enteredMyself = true;
      this.newPersonPicture = null;
      return;
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    }); 
  // console.log(this.newPersonPicture);
   

    //this.startListeningClicks = true;
    this.showClickMessage = true;
    this.startListeningClicks = true;
    this.showAddForm=false;
    //console.log("Restart");
    
    
  }
  
  editPerson(b){
    //console.log("SKROZ DOLE");
    if(b==1){
      this.canEdit = true;
      this.editNode = this.chosenNode;
      this.showAddForm = false;
      this.display = 'none';
      //el.scrollIntoView({behavior: 'smooth'});
     // window.scrollTo(0, document.body.scrollHeight);
       document.getElementById("editFields").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
    else{
      if(this.editPersonDateOfBirth!=null)this.editNode.date_of_birth = new Date(this.editPersonDateOfBirth);
      if(this.editPersonDateOfDeath!=null) this.editNode.date_of_death = new Date(this.editPersonDateOfDeath);
   
      this.canEdit = false;
      this.editNode = null;
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      }); 
    }
    
  }

  export(){
    var canvas = document.getElementById("sloba") as HTMLCanvasElement;
    canvas.toBlob(function(blob) {
        saveAs(blob, "myFamilyTree.png");
    });
    

  setTimeout(() => {
    this.successfulExport = true;

  // 👇️ if you used `display` to hide element
  // el.style.display = 'block';
  }, 1000);
    
  }
  closeAlert(){
    this.successfulExport = false;
   
  }
  closeAlert1(){
    this.showStatistics = false;
   
  }

  //statistics
  //TODO:
  statistics(){
    let t = this.calculateStatistics(this.me);
    this.averageLifespan = t[0];
    
    this.averageNumberOfChildren = t[1];
    
    this.showStatistics = true;
    
  }
  calculateStatistics(start){

    let numberOfNodes = 0;
    let sumOfLifespans = 0;
    let sumOfChildren = 0;

    const visited = new Set();
    const queue = [start];
    visited.add(start);
    while (queue.length > 0) {
        const node = queue.shift(); // mutates the queue

        numberOfNodes = numberOfNodes + 1;
        if(node.children!=null) sumOfChildren = sumOfChildren + node.children.length;
        if(node.date_of_birth!=null && node.date_of_death!=null) {
          // To calculate the time difference of two dates
          var Difference_In_Time = node.date_of_death.getTime() - node.date_of_birth.getTime();
            
          // To calculate the no. of days between two dates
          var Difference_In_Years = Difference_In_Time / (1000 * 3600 *24 * 365);

          sumOfLifespans = sumOfLifespans + Difference_In_Years;
        }

        const destinations = [];
        if(node.mother != null) destinations.push(node.mother);
        if(node.father != null) destinations.push(node.father);
        if(node.children.length!=0 ) {
          node.children.forEach(element => {
            destinations.push(element);
          });
        }
        if(node.nextSibling != null) destinations.push(node.nextSibling);
        if(node.partner.length!=0 ) {
          node.partner.forEach(element => {
            destinations.push(element);
          });
        }
  
        for (const destination of destinations) {
            if (!visited.has(destination)) {
                visited.add(destination);
                queue.push(destination);
            }
           
        }
  
        
    }
    return [sumOfLifespans/numberOfNodes, sumOfChildren/numberOfNodes];
  }
  

  //search
  searchTree(){
    if(this.chosenNode==null){
      this.showSearchForm = false;
      return;
    }
    this.showSearchForm = true;
    this.display = "none";
    
    
    
  }

  highlightRelatives: PeopleTree[];

  highlight(b){
    if(b==1){
     this.highlightRelatives = this.servis.getRelative("mother",this.chosenNode);
      //console.log("Majka "+this.highlightRelatives.length );
    }
    else if(b==2){
      this.highlightRelatives = this.servis.getRelative("father",this.chosenNode);
    }
    else if(b==3){
      this.highlightRelatives = this.servis.getRelative("brother",this.chosenNode);
    }
    else if(b==4){
      this.highlightRelatives = this.servis.getRelative("sister",this.chosenNode);
    }
    else if(b==5){
      this.highlightRelatives = this.servis.getRelative("grandfather",this.chosenNode);
    }
    else if(b==6){
      this.highlightRelatives = this.servis.getRelative("grandmother",this.chosenNode);
    }
    else if(b==7){
      this.highlightRelatives = this.servis.getRelative("great grandfather",this.chosenNode);
    }
    else if(b==8){
      this.highlightRelatives = this.servis.getRelative("great grandmother",this.chosenNode);
    }
    else if(b==9){
      this.highlightRelatives = this.servis.getRelative("great great grandfather",this.chosenNode);
    }
    else if(b==10){
      this.highlightRelatives = this.servis.getRelative("great great grandmother",this.chosenNode);
    }
    else if(b==11){
      this.highlightRelatives = this.servis.getRelative("son",this.chosenNode);
    }
    else if(b==12){
      this.highlightRelatives = this.servis.getRelative("daughter",this.chosenNode);
    }
    else if(b==13){
      if(this.isEnglish())this.highlightRelatives = this.servis.getRelative("uncle",this.chosenNode);
      if(this.isSerbian())this.highlightRelatives = this.servis.getRelative("ујак",this.chosenNode);
    }
    else if(b==14){
      if(this.isEnglish())this.highlightRelatives = this.servis.getRelative("aunt",this.chosenNode);
      if(this.isSerbian())this.highlightRelatives = this.servis.getRelative("ујна",this.chosenNode);
    }
    else if(b==15){
      this.highlightRelatives = this.servis.getRelative("стриц",this.chosenNode);
    }
    else if(b==16){
      this.highlightRelatives = this.servis.getRelative("стрина",this.chosenNode);
    }

  }

  //edit

  edit(){
    this.canEdit = false;

      
  }

  undoPerson(){
    this.undoNode.removeNode();
    this.canUndo = false;
  }
  
  choosePersonKind(n){
    if(n==6){
      //close (Not now)
      this.errorAddMessage = null;
      this.display = "none";
      return;
    }
      
    
    if(n==1){
      
      let w = this.chosenNode;
      while(w.prevSibling!=null){
        w = w.prevSibling;
      }
     
      
      if(w.mother!=null){
        if(this.isEnglish())
          this.errorAddMessage = "Mother already added."
        if(this.isSerbian())
          this.errorAddMessage = "Мајка је већ додата."
        return;
      }
      
      this.newPersonKind = 'mother';
     // this.chosenNode.addMother();
    }
    else if (n==2){
      let w = this.chosenNode;
      while(w.prevSibling!=null){
        w = w.prevSibling;
      }
      if(w.father!=null){
        if(this.isEnglish())
          this.errorAddMessage = "Father already added."
        if(this.isSerbian())
          this.errorAddMessage = "Отац је већ додат."
        return;
        return;
      }
      this.newPersonKind = 'father';
    }
    else if (n==3){
      this.newPersonKind = 'sibling';
    }
    else if (n==4){
      this.newPersonKind = 'child';
    }
    else if (n==5){
      this.newPersonKind = 'partner';
    }
    this.showAddForm=true;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    }); 
    this.errorAddMessage = null;
    this.display = "none";
  }
  switch:boolean;
  delay:number;

  bfsWithRedraw(start){
     
    this.ctx.clearRect(0, 0, this.ctx.canvas.width,  this.ctx.canvas.height);

      if(this.canEdit) {
       
        if(this.editNode.picture.lastIndexOf("images")!=-1)this.editNode.picture = this.editNode.picture.substring(this.editNode.picture.lastIndexOf("images")+7);
        if(this.editNode.picture.lastIndexOf("fakepath")!=-1)this.editNode.picture =  this.editNode.picture.substring(this.editNode.picture.lastIndexOf("fakepath") + 9);
        if(this.editNode.picture.charAt(0)!='a')this.editNode.picture = "assets/images/"+this.editNode.picture;
      }

      const visited = new Set();
      
      const queue = [start];
      visited.add(start);

      while (queue.length > 0) {

          const node = queue.shift(); // mutates the queue
          //node.highlighted = false;
          console.log(this.delay);
          if(this.highlightRelatives.includes(node) ) {
            
            if(this.delay<12)node.drawHighlightedGlitter(true);
            else node.drawHighlightedGlitter(false);
          }
          
          else node.draw();
          this.delay=this.delay+1;
          if(this.delay>=25) this.delay=0;
          
          //console.log(this.switch+" KISA");
          const destinations = [];
          if(node.mother != null) destinations.push(node.mother);
          if(node.father != null) destinations.push(node.father);
          if(node.children.length!=0 ) {
            node.children.forEach(element => {
              destinations.push(element);
            });
          }
          if(node.nextSibling != null) destinations.push(node.nextSibling);
          if(node.partner.length!=0 ) {
            node.partner.forEach(element => {
              destinations.push(element);
            });
          }


          

          for (const destination of destinations) {

            
              
              if (!visited.has(destination)) {
                  visited.add(destination);
                  queue.push(destination);
              }
            
          }

          
      }
  
  }

  pomeri(br){
    if(br==1){
      //left
      this.me.pomeriSve(-50,0);
     // this.ctx.canvas.width = this.ctx.canvas.width+50;
    }
    else if(br==2){
      //up
      this.me.pomeriSve(0,-50);
     // this.ctx.canvas.height = this.ctx.canvas.height+50;
    }
    else if(br==3){
      //right
      this.me.pomeriSve(50,0);
      this.ctx.canvas.width = this.ctx.canvas.width+50;
    }
    else if(br==4){
      //down
      this.me.pomeriSve(0,50);
      this.ctx.canvas.height = this.ctx.canvas.height+50;
    }
    
  }
  clickedOnCanvas(canvas,event){
    if(!this.startListeningClicks){
      return;
    }
    if(this.canEdit) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if(this.newPersonKind == 'mother'){
      let ovaj = this.chosenNode;
      while(ovaj.prevSibling!=null){
        ovaj = ovaj.prevSibling;
      }
      this.undoNode = this.chosenNode.addMother(
        this.newPersonName, this.newPersonSurname, this.newPersonDateOfBirth,
        this.newPersonDateOfDeath, this.newPersonGender, this.newPersonPlaceOfBirth,
        this.newPersonPicture, this.newPersonProfession, x,y, ovaj
      );
    }
    else if(this.newPersonKind == 'father'){
      let ovaj = this.chosenNode;
      while(ovaj.prevSibling!=null){
        ovaj = ovaj.prevSibling;
      }
      this.undoNode = this.chosenNode.addFather(
        this.newPersonName, this.newPersonSurname, this.newPersonDateOfBirth,
        this.newPersonDateOfDeath, this.newPersonGender, this.newPersonPlaceOfBirth,
        this.newPersonPicture, this.newPersonProfession,x,y, ovaj
        );
    }
    else if(this.newPersonKind == 'sibling'){
      let ovaj = this.chosenNode;
      while(ovaj.nextSibling!=null){
        ovaj = ovaj.nextSibling;
      }
      this.undoNode = this.chosenNode.addSibling(
        this.newPersonName, this.newPersonSurname, this.newPersonDateOfBirth,
        this.newPersonDateOfDeath, this.newPersonGender, this.newPersonPlaceOfBirth,
        this.newPersonPicture, this.newPersonProfession,x,y,ovaj
        );
    }
    else if(this.newPersonKind == 'child'){
      this.undoNode = this.chosenNode.addChild(
        this.newPersonName, this.newPersonSurname, this.newPersonDateOfBirth,
        this.newPersonDateOfDeath, this.newPersonGender, this.newPersonPlaceOfBirth,
        this.newPersonPicture, this.newPersonProfession,x,y
        );
    }
    else if(this.newPersonKind == 'partner'){
      this.undoNode = this.chosenNode.addPartner(
        this.newPersonName, this.newPersonSurname, this.newPersonDateOfBirth,
        this.newPersonDateOfDeath, this.newPersonGender, this.newPersonPlaceOfBirth,
        this.newPersonPicture, this.newPersonProfession,x,y
        );
    }
    
    
    this.canUndo = true;
    this.startListeningClicks = false;
    this.showClickMessage = false;
   
  }

  getCursorPosition(canvas, event) {
    if(this.startListeningClicks){
      return;
    }
    if(this.canEdit) {
      return;
    }

    
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y)
    //console.log(this.me.isInside(x,y));
    if(this.showAddForm){
      return;
    }
    this.chosenNode=this.bfs(this.me, x, y);
    if(this.chosenNode != null){
      //this.showSearchForm = true;
      //highlight it
      this.chosenNode.highlighted = true; 
      //this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
      //this.chosenNode.draw();
      this.addNew= true;
      this.display = 'block';
    }
    else {
      this.showSearchForm = false;
      this.highlightRelatives = [];
    }

    //console.log("da ? "+this.me.highlighted);
  }
 
  bfs(start, x, y){
  const visited = new Set();

  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {

      const node = queue.shift(); // mutates the queue
      if (node.isInside(x,y))  {  
        return node;
      }
      const destinations = [];
      if(node.mother != null) destinations.push(node.mother);
      if(node.father != null) destinations.push(node.father);
      if(node.children.length!=0 ) {
        node.children.forEach(element => {
          destinations.push(element);
        });
      }
      if(node.nextSibling != null) destinations.push(node.nextSibling);
      if(node.partner.length!=0 ) {
        node.partner.forEach(element => {
          destinations.push(element);
        });
      }

      node.highlighted = false;

      for (const destination of destinations) {

         
          
          if (!visited.has(destination)) {
              visited.add(destination);
              queue.push(destination);
          }
         
      }

      
  }
  return null;
  }

  
  
  /* 
  Mama, 
tata, 
ID, 
Brat/Sestra, 
Dete, 
-Ime, 
-Prezime, 
-Datum rodj, 
Datum smrti, 
-Mesto r, 
Mesto s,
-Zanimanje,
-Slika*/
}
