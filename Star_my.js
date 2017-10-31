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


//document.loc_star.d_UT=today.getTimezoneOffset()/60;

//20-ja stroka
 month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

//Var
//	iday,iy,Dweek : word;
var i;
//integer
var t,sm,p,e,q,d,f,m,l,pl,ps,s0,ihs,ims,sec;
// : real;


//Begin
//{*--------------------------------------------------------------------*
//*                        Calculate iday and t                        *
//*--------------------------------------------------------------------*}
//35-ja stroka
//--	if (id <=0) or (im <= 0) or (iyear <= 0) then
//--	GetDate(iYear,iM,iD,Dweek);
//--	iday := id;

if (im != 1) {
//--	i = (iyear div 4)*4;
var tmp_=Math.floor(iyear/4);
i=Math.round(4*tmp_);
if (iyear == i)
    {month[1] = 29};
//[1] - v JS s 0 numeracija massiva!
for (i=1; i<=im-1; i++)  {iday = Math.round(iday)+month[i-1]};
};

//50-ja stroka

var iy = iyear - 1900;
//--- iday = (iday-1)+(iy-1) div 4;

//document.loc_star.test.value=iy+', d='+iday+"; hms="+l_hour+":"+l_min+":"+l_sec;
iday = Math.floor((iday-1)+(iy-1)/4);

//document.loc_star.test.value=iy+', d='+iday+"; hms="+l_hour+":"+l_min+":"+l_sec;


//--t := Longint(iday) + Longint(iy)*365.0;
t=iday + iy*365.0;
t = (t+0.5)/36525.0;   // {   ! 00.01.1900 12h UT}
t = t - 1;    // {   ! 01.01.2000 12h UT1}
//60-ja stroka
//{*--------------------------------------------------------------------*
//*                    Calculate mean sidereal time                    *
//*--------------------------------------------------------------------*}
sm = 24110.548410 + 8640184.8128660*t + 0.093104*t*t- 0.00000620*t*t*t;
while (sm <= 0) {sm = sm + 86400.0};
while (sm > 86400) {sm = sm - 86400.0};
//{*--------------------------------------------------------------------*
//*             Calculate long and short periodic nutation             *
//*--------------------------------------------------------------------*}
//70-ja stroka
p = Math.PI/180.0/3600.0;
//{-------------------}
e = p*(84381.448 - 46.8150*t - 0.00059*t*t + 0.0018130*t*t*t);
//{-------------------}
q = p*( 450160.280 -   5.0*r*t - 482890.539*t+ 7.455*t*t + 0.0080*t*t*t);
d = p*(1072261.3070 + 1236.0*r*t + 1105601.328*t - 6.891*t*t+ 0.0190*t*t*t);
f = p*( 335778.8770 + 1342.0*r*t + 295263.1370*t - 13.2570*t*t+ 0.0110*t*t*t);
m = p*(1287099.804 +  99.0*r*t+1292581.2240*t -  0.5770*t*t - 0.0120*t*t*t);
l = p*( 485866.7330+1325.0*r*t + 715922.633*t + 31.3100*t*t+ 0.0640*t*t*t);
//80-ja stroka{*-------------------}


pl =  -(17.19960 + 0.017420*t)*Math.sin(q);

//pl=sin(q);
pl = pl + (0.20620 + 0.000020*t)*Math.sin(2.0*q);
pl = pl +   0.00460            *Math.sin(q+2.0*f-2.0*l);
pl = pl +   0.00110            *Math.sin(2.0*(l-f));
pl = pl -   0.00030            *Math.sin(2.0*(q+f-l));
pl = pl-   0.00030            * Math.sin (l-m-d);
pl = pl-   0.00020            * Math.sin (q-2.0*d+2.0*f-2.0*m);
pl = pl+   0.00010            * Math.sin (q-2.0*f+2.0*l);
pl = pl-( 1.31870+ 0.000160*t)* Math.sin (2.0*(q-d+f));
pl = pl+(  0.14260-0.000340*t)* Math.sin (m);
pl = pl-(  0.05170-0.000120*t)* Math.sin (2.0*q-2.0*d+2.0*f+m);
pl = pl+(  0.02170-0.000050*t)* Math.sin (2.0*q-2.0*d+2.0*f-m);
pl = pl+(  0.01290+0.000010*t)* Math.sin (q-2.0*d+2.0*f);
pl = pl+   0.00480            * Math.sin (2.0*(l-d));
pl = pl-   0.00220            * Math.sin (2.0*(f-d));
pl = pl+(  0.00170-0.000010*t)* Math.sin (2.0*m);
pl = pl-   0.00150            * Math.sin (q+m);
pl = pl-(  0.00160-0.000010*t)* Math.sin (2.0*(q-d+f+m));
pl = pl-   0.00120            * Math.sin (q-m);
pl = pl-   0.00060            * Math.sin (q+2.0*d-2.0*l);
pl = pl-   0.00050            * Math.sin (q-2.0*d+2.0*f-m);
pl = pl+   0.00040            * Math.sin (q-2.0*d+2.0*l);
pl = pl+   0.00040            * Math.sin (q-2.0*d+2.0*f+m);
pl = pl-   0.00040            * Math.sin (l-d);
pl = pl+   0.00010            * Math.sin (2.0*l+m-2.0*d);
pl = pl+   0.00010            * Math.sin (q+2.0*d-2.0*f);
pl = pl-   0.00010            * Math.sin (2.0*d-2.0*f+m);
pl = pl+   0.00010            * Math.sin (2.0*q+m);
pl = pl+   0.00010            * Math.sin (q+d-l);
pl = pl-   0.00010            * Math.sin (m+2.0*f-2.0*d);
//111-ja stroka{*------------------- }
ps =   -(  0.22740+0.000020*t)* Math.sin (2.0*(q+f));
ps = ps+(  0.07120+0.000010*t)* Math.sin (l);
ps = ps-(  0.03860+0.000040*t)* Math.sin (q+2.0*f);
ps = ps-   0.03010            * Math.sin (2.0*q+2.0*f+l);
ps = ps-   0.01580            * Math.sin (l-2.0*d);
ps = ps+   0.01230            * Math.sin (2.0*q+2.0*f-l);
ps = ps+   0.00630            * Math.sin (2.0*d);
ps = ps+(  0.00630+0.000010*t)* Math.sin (q+l);
ps = ps-(  0.00580+0.000010*t)* Math.sin (q-l);
ps = ps-   0.00590            * Math.sin (2.0*q+2.0*d+2.0*f-l);
ps = ps-   0.00510            * Math.sin (q+2.0*f+l);
ps = ps-   0.00380            * Math.sin (2.0*(q+d+f));
ps = ps+   0.00290            * Math.sin (2.0*l);
ps = ps+   0.00290            * Math.sin (2.0*q-2.0*d+2.0*f+l);
ps = ps-   0.00310            * Math.sin (2.0*(q+f+l));
ps = ps+   0.00260            * Math.sin (2.0*f);
ps = ps+   0.00210            * Math.sin (q+2.0*f-l);
ps = ps+   0.00160            * Math.sin (q+2.0*d-l);
ps = ps-   0.00130            * Math.sin (q-2.0*d+l);
ps = ps-   0.00100            * Math.sin (q+2.0*d+2.0*f-l);
ps = ps-   0.00070            * Math.sin (l+m-2.0*d);
ps = ps+   0.00070            * Math.sin (2.0*q+2.0*f+m);
ps = ps-   0.00070            * Math.sin (2.0*q+2.0*f-m);
ps = ps-   0.00080            * Math.sin (2.0*q+2.0*d+2.0*f+l);
ps = ps+   0.00060            * Math.sin (2.0*d+l);
ps = ps+   0.00060            * Math.sin (2.0*(q-d+f+l));
ps = ps-   0.00060            * Math.sin (q+2.0*d);
ps = ps-   0.00070            * Math.sin (q+2.0*d+2.0*f);
ps = ps+   0.00060            * Math.sin (q-2.0*d+2.0*f+l);
ps = ps-   0.00050            * Math.sin (q-2.0*d);
ps = ps+   0.00050            * Math.sin (l-m);
ps = ps-   0.00050            * Math.sin (q+2.0*f+2.0*l);
ps = ps-   0.00040            * Math.sin (m-2.0*d);
ps = ps+   0.00040            * Math.sin (l-2.0*f);
ps = ps-   0.00040            * Math.sin (d);
ps = ps-   0.00030            * Math.sin (l+m);
ps = ps+   0.00030            * Math.sin (l+2.0*f);
ps = ps-   0.00030            * Math.sin (2.0*q+2.0*f-m+l);
ps = ps-   0.00030            * Math.sin (2.0*q+2.0*d+2.0*f-m-l);
ps = ps-   0.00020            * Math.sin (q-2.0*l);
ps = ps-   0.00030            * Math.sin (2.0*q+2.0*f+3.0*l);
ps = ps-   0.00030            * Math.sin (2.0*q+2.0*d+2.0*f-m);
ps = ps+   0.00020            * Math.sin (2.0*q+2.0*f+m+l);
ps = ps-   0.00020            * Math.sin (q-2.0*d+2.0*f-l);
ps = ps+   0.00020            * Math.sin (q+2.0*l);
ps = ps-   0.00020            * Math.sin (2.0*q+l);
ps = ps+   0.00020            * Math.sin (3.0*l);
ps = ps+   0.00020            * Math.sin (2.0*q+d+2.0*f);
ps = ps+   0.00010            * Math.sin (2.0*q-l);
ps = ps-   0.00010            * Math.sin (l-4.0*d);
ps = ps+   0.00010            * Math.sin (2.0*(q+d+f-l));
ps = ps-   0.00020            * Math.sin (2.0*q+4.0*d+2.0*f-l);
ps = ps-   0.00010            * Math.sin (2.0*l-4.0*d);
ps = ps+   0.00010            * Math.sin (2.0*q-2.0*d+2.0*f+m+l);
ps = ps-   0.00010            * Math.sin (q+2.0*d+2.0*f+l);
ps = ps-   0.00010            * Math.sin (2.0*q+4.0*d+2.0*f-2.0*l);
ps = ps+   0.00010            * Math.sin (2.0*q+4.0*f-l);
ps = ps+   0.00010            * Math.sin (l-m-2.0*d);
ps = ps+   0.00010            * Math.sin (q-2.0*d+2.0*f+2.0*l);
ps = ps-   0.00010            * Math.sin (2.0*(q+d+f+l));
ps = ps-   0.00010            * Math.sin (q+2.0*d+l);
ps = ps+   0.00010            * Math.sin (2.0*q-2.0*d+4.0*f);
ps = ps+   0.00010            * Math.sin (2.0*q-2.0*d+2.0*f+3.0*l);
ps = ps-   0.00010            * Math.sin (l+2.0*f-2.0*d);
ps = ps+   0.00010            * Math.sin (q+2.0*f+m);
ps = ps+   0.00010            * Math.sin (q+2.0*d-m-l);
ps = ps-   0.00010            * Math.sin (q-2.0*f);
ps = ps-   0.00010            * Math.sin (2.0*q-d+2.0*f);
ps = ps-   0.00010            * Math.sin (2.0*d+m);
ps = ps-   0.00010            * Math.sin (l-2.0*f-2.0*d);
ps = ps-   0.00010            * Math.sin (q+2.0*f-m);
ps = ps-   0.00010            * Math.sin (q-2.0*d+m+l);
ps = ps-   0.00010            * Math.sin (l-2.0*f+2.0*d);
ps = ps+   0.00010            * Math.sin (2.0*(l+d));
ps = ps-   0.00010            * Math.sin (2.0*q+4.0*d+2.0*f);
ps = ps+   0.00010            * Math.sin (d+m);
//{*--------------------------------------------------------------------*
//*                    Calculate true sidereal time                    *
//*--------------------------------------------------------------------*}
s0 = sm+(pl+ps)/15.0* Math.cos (e);
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