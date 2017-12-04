//{**********************************************************}
function showTime() { 
// -- {Function Star_time(id,im,iyear : word) : real;
//{ по дате выдает звездное время истинное в радианах        }
//{   исходная программа Шутенков В.Р.  Фортран              }
//---Const
//--- r : real = 1296000.0;    //                 {    ! 360.*3600.}

var r = 1296000.0; 
var longitude_h=2.5086667;
var today = new Date();
//var iyear = 2001;//1900+ //test!
//today.getYear();


//var iyear =today.getYear(); // verno!
//var im = 1+today.getMonth();
//var iday = today.getDate();
//var l_hour = today.getHours();
//var l_min = today.getMinutes();
//var l_sec = today.getSeconds();

if (!document.loc_star.user_enter.checked)
{
var iyear =today.getFullYear(); // verno!
//if (iyear<1900) {iyear =iyear +1900};
//для Нетскэйпа!
var im = 1+today.getMonth();
var iday = today.getDate();
var l_hour = today.getHours();
var l_min = today.getMinutes();
var l_sec = today.getSeconds();
document.loc_star.timeLoc_ymd.value=
  iyear+"-"+im+"-"+today.getDate();
document.loc_star.d_UT.value=today.getTimezoneOffset()/60;  
var time_l=l_hour+":"+l_min+":"+l_sec;
document.loc_star.timeLoc_hms.value=time_l;
var delta=Math.abs(longitude_h*15);
document.loc_star.long_1.value=Math.floor(delta);
document.loc_star.long_2.value=Math.floor((delta-document.loc_star.long_1.value)*60);
document.loc_star.long_3.value=Math.round((delta-document.loc_star.long_1.value-document.loc_star.long_2.value/60)*3600);
if (longitude_h<0) {
document.loc_star.long_1.value=-document.loc_star.long_1.value;
document.loc_star.long_2.value=-document.loc_star.long_2.value;
document.loc_star.long_3.value=-document.loc_star.long_3.value;
};

//document.loc_star.test.value=document.loc_star.long_1.value+' y='+ iyear+ ' m='+im
//+' d='+iday+' h='+l_hour+' m='+l_min+' s='+l_sec;
}
else
{
longitude_h=(Math.floor(document.loc_star.long_1.value)+document.loc_star.long_2.value/60+document.loc_star.long_3.value/3600)/15;
//document.loc_star.test.value=document.loc_star.long_1.value+' '+
//(document.loc_star.long_1.value+document.loc_star.long_2.value/60)+' '
//+longitude_h+', ';
var str_tmp=document.loc_star.timeLoc_ymd.value;
var ind_tmp=str_tmp.indexOf("-");
iyear=str_tmp.substr(0,ind_tmp);
var tmp_=parseInt(ind_tmp);
ind_tmp=str_tmp.indexOf("-",parseInt(tmp_)+1);
im=str_tmp.substr(tmp_+1,ind_tmp-tmp_-1);
iday=str_tmp.substr(ind_tmp+1,str_tmp.length);
str_tmp=document.loc_star.timeLoc_hms.value;
ind_tmp=str_tmp.indexOf(":");
var l_hour=str_tmp.substr(0,ind_tmp);
tmp_=ind_tmp;
ind_tmp=str_tmp.indexOf(":",tmp_+1);
var l_min=str_tmp.substr(tmp_+1,ind_tmp-tmp_-1);
var l_sec=str_tmp.substr(ind_tmp+1,str_tmp.length);
//document.loc_star.test.value=iyear+','+im+","+iday+"; "+l_hour+":"+l_min+":"+l_sec;
//+tmp_+";"+ind_tmp+'.'+parseInt(ind_tmp-tmp_-1)+'.'+parseInt(tmp_+1);

//document.loc_star.test.value=document.loc_star.long_1.value+' y='+ iyear+ ' m='+im
//+' d='+iday+' h='+l_hour+' m='+l_min+' s='+l_sec;
};

let s0 = getStarTimeInSeconds(today);
 

//{*--------------------------------------------------------------------*
//*                            Print results                           *
//*--------------------------------------------------------------------*}
//{	ihs := int(sm/3600.0);
//	ims := int(sm/60.0-ihs*60.0);
//	sec := sm-ihs*3600.0-ims*60.0;
//
//	writeln(id:3,' ',im:2,' ',iyear:4,'   sm  :=  ',ihs:3:0,ims:3:0,sec:8:3);
//	pl := pl/15.0* cos (e);
//	ps := ps/15.0* cos (e);
//	writeln(pl:8:4);
//	writeln(ps:8:4);
//
//	ihs := int(s0/3600.0);
//	ims := int(s0/60.0-ihs*60.0);
//	sec := s0-ihs*3600.0-ims*60.0;
//
//	writeln(id:3,' ',im:2,' ',iyear:4,'   s0  :=  ',ihs:3:0,ims:3:0,sec:8:4);}
	//star_time := pi/12*s0/3600.0;
    // {v radianah!}

s0=s0/3600.0; //v chasah 
var t_1=Math.floor(l_hour)+l_min/60+l_sec/3600;
var t_=Math.floor(l_hour)+l_min/60+l_sec/3600;
//    document.loc_star.d_UT.value=today.getTimezoneOffset()/60;// - введено при входе по умолчанию
    t_=t_+
//today.getTimezoneOffset()/60;
parseInt(document.loc_star.d_UT.value); 
    //-3 popravka na -3 chasa - tipichno DLJA MOSKVY (zimoj) - pereveli k Grinvichu!
//	if (t_<0) t_+=24;


if (!document.loc_star.user_enter.checked)
{
//document.loc_star.test.value=s0+',    '+t_1;
}
else
{
//document.loc_star.test.value=s0+', '+l_hour+';'+l_min+';'+l_sec+':'+document.loc_star.d_UT.value+'='+t_1;
};

	
//if (document.loc_star.cor.checked) var corrtime=-1;
//if (!document.loc_star.cor.checked) var corrtime=0;	
var s_=s0+parseFloat(longitude_h)+(
//2.5086667
//???parseFloat(longitude_h)+
parseFloat(t_)
//+t_
//+corrtime
)*1.002737909350795;

//document.loc_star.test.value=longitude_h+', ';

if (s_<0) s_+=24;
if (s_>=24) s_-=24;

//var s_hour=Math.floor(s0);
//var s_min=(s0-s_hour)*60;
//var s_sec=(s_min-Math.floor(s_min))*60;

var s_hour=Math.floor(s_);
var s_min=(s_-s_hour)*60;
var s_sec=(s_min-Math.floor(s_min))*60;
	
//var time_l=iyear+"-"+im+"-"+today.getDate()+"="+l_hour+":"+l_min+":"+l_sec;
//var time_l=today.getTimezoneOffset()/60+"="+l_hour+":"+l_min+":"+l_sec;
//var time_l=l_hour+":"+l_min+":"+l_sec;
//str_tmp='&#177';
//var time_s=s_hour+":"+Math.floor(s_min)+":"//s_sec;
//var time_s=s_hour+":"+Math.floor(s_min)+":"+//s_sec;
//+Math.round(s_sec);
var time_s=s_hour+":"+Math.floor(s_min)+":";
if (!document.loc_star.user_enter.checked)
{time_s=time_s+Math.round(s_sec);
//+str_tmp
}
else
{time_s=time_s+(Math.round(s_sec*10000))/10000;};


//document.loc_star.timeLoc_year.value=iyear;
//document.loc_star.timeLoc_month.value=im;
//document.loc_star.timeLoc_day.value=today.getDate();

//if (document.loc_star.User_choise_loc.current) //current)  
//{
//var time_l=l_hour+":"+l_min+":"+l_sec;
//document.loc_star.timeLoc_hms.value=time_l;
//}
//else
//{
//document.loc_star.timeLoc_hms.value= //document.loc_star.cor.checked;
//document.loc_star.User_choise_loc.current;
//document.loc_star.User_choise_loc;
//"00000";
//};

//document.loc_star.timeLoc_m.value=l_min;
//document.loc_star.timeLoc_s.value=l_sec;
//var time_l=l_hour+":"+l_min+":"+l_sec;
//document.loc_star.timeLoc_hms.value=time_l;


document.loc_star.timeStar.value=time_s;
timerID=setTimeout("showTime()",1000);
//End;
}