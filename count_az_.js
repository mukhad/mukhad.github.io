//{**********************************************************}
//{**********************************************************}
function StarTime(iday,im,iyear) { 
//---Const
//--- r : real = 1296000.0;    //                 {    ! 360.*3600.}

var r = 1296000.0; 

 month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);


var i;
//integer
var t,sm,p,e,q,d,f,m,l,pl,ps,s0,ihs,ims,sec;
// : real;
//{*--------------------------------------------------------------------*
//*                        Calculate iday and t                        *
//*--------------------------------------------------------------------*}

if (im != 1) {
//--	i = (iyear div 4)*4;
var tmp_=Math.floor(iyear/4);
i=Math.round(4*tmp_);
if (iyear == i)
    {month[2] = 29};
//[1] - v JS s 0 numeracija massiva!, no v dannom sluchae - my uzhe pribavili izvne funkcii
for (i=1; i<=im-1; i++)  {iday += month[i-1]};
};

//50-ja stroka

var iy = iyear - 1900;
//--- iday = (iday-1)+(iy-1) div 4;
iday = Math.floor((iday-1)+(iy-1)/4);

//document.loc_star.test.value=iy+','+iday+"; "+l_hour+":"+l_min+":"+l_sec;


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

var s0 = sm+(pl+ps)/15.0* Math.cos (e);
//{*--------------------------------------------------------------------*
//*                            Print results                           *
//*--------------------------------------------------------------------*}

var star_time = Math.PI/12*s0/3600.0;

//document.AZ_H.test.value="s0="+s0+" star_time_rad="+star_time;

return star_time;
//в радианах
};
//


//{**********************************************************}
function J_day_(Day,Month,Year) {
var i,d;
d = 0;

for (i=1995; i<=Year-1; i++)
{
if  ( ( i/4-Math.floor(i/4) ) == 0 )
 {d = parseFloat(d) + 366}
else 
 {d = parseFloat(d) + 365};
};

for (i=1; i<=Month-1; i++)
//{ 
//if ( (i==1) || (i==3) || (i==5) || 
//   (i==7) || (i==8) || (i==10) || (i==12) )
//   {d = parseFloat(d) + 31};
//if ( (i==4) || (i==6) || (i==9) || (i==11) )
//   {d = parseFloat(d) + 30};  
//if ( (i==2) )
//   {if  ((i/4-Math.floor(i/4)) == 0 ) 
//    {d = parseFloat(d) + 29}
//    else
//    {d = parseFloat(d) + 28};
//   };       
//};
//for (i=1; i<=_month-1; i++)
{ 
if ((i==1) || (i==3) || (i==5) || (i==7) || (i==8) || (i==10) || (i==12))
   {d = Math.floor(d) + 31};
if ( (i==4) || (i==6) || (i==9) || (i==11) )
   {d = Math.floor(d) + 30};  
if ( (i==2) )
   {if  ((i/4-Math.floor(i/4)) == 0 ) 
    {d = Math.floor(d) + 29}
    else
    {d = Math.floor(d) + 28};
   };       
};
//var J_day = parseFloat(d) + parseFloat(Day) + parseFloat(2449717.5);
var J_day = Math.floor(d) + day + 2449717.5;
return J_day;
};


//{**********************************************************}
function L_star_jd(j_d)
//{       определяется долгота солнца юлианскому дню         }
//{              cредняя ошибка - 12"                        }
//{Const
{
var  e = 0.01671;
var  r =1296000;
var  l,m,lam,t2000;
  t2000 = (j_d - 2451545)/36525;
  l = parseFloat(1009678) + (100*r + 2771)*t2000;    //{ средняя долгота }
 // document.AZ_H.test.value="t2000="+t2000+ " j_d="+ j_d+" l="+l;  
  l = l*2*Math.PI/1296000;
  m = parseFloat(1287100) + parseFloat((99*r + 1292581)*t2000);  
//  document.AZ_H.test.value="m="+m+ " l="+l;  
  //{ средняя аномалия }
  m = m*2*Math.PI/1296000;
  lam = l + 2*e*Math.sin(m) + 1.25*e*e*Math.sin(2*m);// { истинная долгота }
  
//document.AZ_H.test.value="lam="+lam+ " m="+ m+" l="+l;  
  return lam; //J_day;
};

//{**********************************************************}
function MS(s)
{
//Begin
  while (s < 0) {s = s + 24};
  while (s > 24) {s = s - 24};
  s = s*(Math.PI/12);
  return s; 
//End;
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function count_az_h() { 

var pi= Math.PI;
var p0 = pi/12;
var e1 = 23;  //{ наклон эклиптики }
var e2 = 26;
var e3 = 23;

var v1 = -16;   //{ лучевая скорость }
var Year = 1996; //{ год }

//{v1 -  лучевая скорость источника (V_lsr), из файла}
//{V2-ПОПРАВКА ЗА ДВИЖЕНИЕ СОЛНЦА К АПЕКСУ}
//{V3 - ПОПРАВКА ЗА ОРБИТАЛЪНОЕ ДВИЖЕНИЕ ЗЕМЛИ}
//{V4 - ПОПРАВКА ЗА ВРАЩЕНИЕ ЗЕМЛИ}
//{V - окончательная скорость}
//{Н-ПОПРАВКА ЗА ЭКСЦЕНТРИСИТЕТ ОРБИТЫ ЗЕМЛИ}
//{АК0 - МОМЕНТ ВЕРХНЕЙ КУЛЪМИНАЦИИ ПО МОСК. ВРЕМЕНИ}
//{Т9 - ЧАСОВОЙ УГОЛ ИСТОЧНИКА, B5=СОS(Т9), В6=SIN(Т9)}
//{В9 = SIN Н,  В0 = СОS Н}
//{В3 = SIN АZ, В4 = СОS АZ, В8 - ВЫСОТА ИСТОЧНИКА, В7 - АЗИМУТ ИСТОЧНИКА}
 
var today = new Date(); 
 
var r = 1296000.0; 
var longitude_h=2.5086667;//2.50556;
//2.5086667;
var Latitude=54+49/60+14.24/3600;
//54+49/60+14/3600;//- верно для РТ-22
//Пущино - было у Рудницкого 54 44 59.8 , 
//а на самом деле верно Lat= 54 49 14.24336
// Long= 37 37 41.84074
//longitude_h=2.50556 - у Рудницкого!, но верно =2.5086667;

 
//document.AZ_H.test.value="test"+ ' ' +document.AZ_H.user_enter.checked;
 
var a1 = 19;   //{ задание начального альфа }
var a2 = 21;
var a3 = 26;
 
var d1 = 14;   //{ задание начального дельта }
var d2 = 24;
var d3 = 41;
 
if (!document.AZ_H.user_enter.checked)
{
//document.AZ_H.a1.value=a1; //альфа
//+a1=parseFloat(document.AZ_H.a1.value);
//+document.AZ_H.a2.value=a2;
//+document.AZ_H.a3.value=a3;

//+document.AZ_H.d1.value=d1; //дельта
//+document.AZ_H.d2.value=d2;
//+document.AZ_H.d3.value=d3;

var iyear =today.getYear(); // verno!
if (iyear<1900) {iyear =iyear +1900};
//для Нетскэйпа!
var im = 1+today.getMonth();
var iday = today.getDate();
//--document.AZ_H.timeLoc_ymd.value=iyear+":"+im+":"+today.getDate();
document.AZ_H.year.value=iyear;
document.AZ_H.month.value=im;
document.AZ_H.day.value=iday;

var l_hour = today.getHours();
var l_min = today.getMinutes();
var l_sec = today.getSeconds();
var time_l=l_hour+":"+l_min+":"+l_sec;
document.AZ_H.timeLoc_hms.value=time_l;

document.AZ_H.d_UT.value=today.getTimezoneOffset()/60;  

var delta=Math.abs(longitude_h*15); //находим долготу
//+document.AZ_H.long_1.value=Math.floor(delta);
//+document.AZ_H.long_2.value=Math.floor((delta-document.AZ_H.long_1.value)*60);
//+document.AZ_H.long_3.value=Math.round((delta-document.AZ_H.long_1.value-document.AZ_H.long_2.value/60)*3600);
//+if (longitude_h<0) 
//+ {
//+  document.AZ_H.long_1.value=-document.AZ_H.long_1.value;
//+  document.AZ_H.long_2.value=-document.AZ_H.long_2.value;
//+  document.AZ_H.long_3.value=-document.AZ_H.long_3.value;
//+ };

var Fi=Math.abs(Latitude);  //находим широту
//+document.AZ_H.lat_1.value=Math.floor(Fi);
//+document.AZ_H.lat_2.value=Math.floor((Fi-document.AZ_H.lat_1.value)*60);
//+document.AZ_H.lat_3.value=Math.round((Fi-document.AZ_H.lat_1.value-
//+document.AZ_H.lat_2.value/60)*3600);
//+if (Latitude<0) 
//+ {
//+  document.AZ_H.lat_1.value=-document.AZ_H.lat_1.value;
//+  document.AZ_H.lat_2.value=-document.AZ_H.lat_2.value;
//+  document.AZ_H.lat_3.value=-document.AZ_H.lat_3.value;
//+ };



//+++
a1 = document.AZ_H.a1.value;   //{ альфа }
a2 = document.AZ_H.a2.value;
a3 = document.AZ_H.a3.value;
d1 = document.AZ_H.d1.value;   //{ дельта }
d2 = document.AZ_H.d2.value;
d3 = document.AZ_H.d3.value;
longitude_h=(Math.floor(document.AZ_H.long_1.value)+document.AZ_H.long_2.value/60+document.AZ_H.long_3.value/3600)/15;
Latitude=(Math.floor(document.AZ_H.lat_1.value)+document.AZ_H.lat_2.value/60+document.AZ_H.lat_3.value/3600);
//+++


}
else
{
longitude_h=(Math.floor(document.AZ_H.long_1.value)+document.AZ_H.long_2.value/60+document.AZ_H.long_3.value/3600)/15;
Latitude=(Math.floor(document.AZ_H.lat_1.value)+document.AZ_H.lat_2.value/60+document.AZ_H.lat_3.value/3600);

a1 = document.AZ_H.a1.value;   //{ альфа }
a2 = document.AZ_H.a2.value;
a3 = document.AZ_H.a3.value;
d1 = document.AZ_H.d1.value;   //{ дельта }
d2 = document.AZ_H.d2.value;
d3 = document.AZ_H.d3.value;

var iyear=Math.floor(document.AZ_H.year.value);
var im=Math.floor(document.AZ_H.month.value);
var iday=Math.floor(document.AZ_H.day.value);

str_tmp=document.AZ_H.timeLoc_hms.value;
ind_tmp=str_tmp.indexOf(":");
var l_hour=str_tmp.substr(0,ind_tmp);
var tmp_=ind_tmp;
ind_tmp=str_tmp.indexOf(":",tmp_+1);
var l_min=str_tmp.substr(tmp_+1,ind_tmp-tmp_-1);
var l_sec=str_tmp.substr(ind_tmp+1,str_tmp.length);

}; 

var e = pi*(e1 + e2/60 + e3/3600)/180;
var e4 = Math.cos(e);
var e5 = Math.sin(e);
var p1 = Math.cos(pi/6);
var p2 = Math.sin(pi/6);
//document.AZ_H.test.value="e="+ e+ ' ' + "e4="+ e4+ " e5="+e5+" p1="+p1+
//" p2="+p2;


var t =  iyear - 1950 + (im - 0.5)/12;
var t0 = t/100 + 0.5;
var a5 = pi*(1.5 + t0*0.00532578);
var a6 = Math.cos(a5);
var a7 = Math.sin(a5);
//document.AZ_H.test.value="t="+ t+ " t0="+ t0+ " a5="+a5+" a6="+a6+
//" a7="+a7;


//  { эксцентриситет орбиты земли }
var e0 = 0.0167510 - (0.0000418 + 0.000000126*t0)*t0;
//  { g - долгота солнца в перигелии }
var g = 4.90816 + pi*(15 + (6189.03 + (1.63 + 0.012*t0)*t0)*t0)/648000;
var g1 = Math.cos(g);
var g2 = Math.sin(g);
//document.AZ_H.test.value="e0="+e0+ " g="+ g+ " g1="+g1+" g2="+g2;

var j_d = J_day_(iday,im,iyear);
//var j_d = 2452421.5 ;
  
var a4 = pi/12*( parseInt(a1) + a2/60.0 + (a3)/3600.0);
    // WrRad(a1,a2,a3,0);
  //d4 := GrRad(d1,d2,d3);
//if (gr < 0) or (m < 0) or (sec < 0) then ir := - 1 else ir := 1;
//GrRad := ir*pi/180*(abs(gr) + abs(m)/60 + abs(sec)/3600);  
var d4= //ir*
pi/180*( parseInt(d1) + d2/60 + d3/3600);
//document.AZ_H.test.value="a1="+a1+ " a2="+ a2+ " a3="+a3+" a4="+a4;
//document.AZ_H.test.value="a4="+a4+ " d4="+ d4+ " pi="+pi+" d1="+d1;

//  { приведение за прецессию }
  
var  a = a4 + t*p0*(3.07327 +
1.33617*Math.sin(a4)*Math.sin(d4)/Math.cos(d4))/3600;
var  d = d4 + t*pi*Math.cos(a4)*3.09299e-5;
var  d5 = Math.cos(d);
var  d6 = Math.sin(d);
//document.AZ_H.test.value="a="+a+ " d="+ d+ " d5="+d5+" d6="+d6;
var  c1 = d5*Math.cos(a);
var  c2 = d5*Math.sin(a);
var  c4 = c2*e4 + d6*e5;
//document.AZ_H.test.value="c1="+c1+ " c2="+ c2+ " c4="+c4+" //sin_Lat="+sin_Latitude;

var sin_Latitude=Math.sin(Latitude/180*pi);
var cos_Latitude=Math.cos(Latitude/180*pi);
//document.AZ_H.test.value="c1="+c1+ " c2="+ c2+ " c4="+c4+" //sin_Lat="+sin_Latitude;
//document.AZ_H.test.value="sin_lat="+sin_Latitude+" cos_lat="+cos_Latitude;
//{вшивается широта - sin , cos}
//  d7 := 0.816641*d6;
//  - поправку для  Калязино вталкиваем вместо текущей строки}
//Пущино - было 54 44 59.8 , а на самом деле верно Lat= 54 49 14.24336
// Long= 37 37 41.84074
//(*  d7 := sin((57+13/60+23.6/3600)/180*Pi){0.816641}*d6;*)
//  d8 := 0.577146*d5;
//(*  d8 := cos((57+13/60+23.6/3600)/180*Pi){0.577146}*d5;*)
//  d9 := 0.577146*d6;
//(*  d9 := cos((57+13/60+23.6/3600)/180*Pi){0.577146}*d6;*)
//  d0 := 0.816641*d5;
//(*  d0 := sin((57+13/60+23.6/3600)/180*Pi){0.816641}*d5; *)



var  d7 = sin_Latitude//0.816641
*d6;
var  d8 = cos_Latitude//0.577146
*d5;
var  d9 = cos_Latitude//0.577146
*d6;
var  d0 = sin_Latitude//0.816641
*d5;   
//document.AZ_H.test.value="d7=" +d7+ " d8="+ d8+ " d9="+d9+" d0="+d0;


//  { v2 поправка за движение солнца к апексу }
var  v2 = -19.5*((c1*a6 + c2*a7)*p1 + p2*d6);
//  { поправка за эксцентриситет орбиты земли }
var  h = e0*(c1*g2 - c4*g1);
var  y = (L_star_jd(j_d + 1) - L_star_jd(j_d))/24;
// -- смещение долготы Солнца за день!
//document.AZ_H.test.value="L+1=" +L_star_jd(j_d + 1)+ " L="+  L_star_jd(j_d)+ " y="+y;

var s0 = StarTime(iday,im,iyear);
//var s0 ='0';

//{**********************************************************}
//Procedure RadWr(Var rad,h,m,sec : real);
var ir = s0*12/pi;
var	gr = Math.floor(ir);
var	min_ =  Math.floor((ir-gr)*60);
var	sec =(ir-gr-min_/60)*3600;
//document.AZ_H.test.value="s0="+s0+ " gr="+ gr+ " min_="+min_+" sec="+sec;


//RadWr(s0,gr,min_,sec);

var t_=Math.floor(l_hour)+l_min/60+l_sec/3600;
t_=t_+parseInt(document.AZ_H.d_UT.value); 
//-3 popravka na -3 chasa - tipichno DLJA MOSKVY (zimoj) - pereveli k Grinvichu!
//if (t_<0) {t_+=24};
//if (t_>24) {t_-=24};//Нашли UT!!


s0 = parseInt(gr) + min_/60 + sec/3600 + longitude_h;
//2.50556 - у Рудницкого!
var s_00=s0-longitude_h;

//document.AZ_H.test.value="s0="+s0+ " gr="+ gr+ " min_="+min_+" sec="+sec;

//var t_=Math.floor(l_hour)+l_min/60+l_sec/3600;
// ///   document.loc_star.d_UT.value=today.getTimezoneOffset()/60;
// - введено при входе по умолчанию
//    t_=t_+
//today.getTimezoneOffset()/60;
//parseInt(document.loc_star.d_UT.value); 
//-3 popravka na -3 chasa - tipichno DLJA MOSKVY (zimoj) - pereveli k Grinvichu!
    
var s=s0 //в часах - на местную полночь
+(
//2.5086667
//parseFloat(longitude_h)
//+parseFloat(t_)
parseInt(document.AZ_H.d_UT.value) 
//+t_
//+corrtime
)*1.002737909350795;   
//document.AZ_H.test.value="s0="+s0+ " gr="+ gr+ " min_="+min_+" sec="+sec;

var s_=parseFloat(s)+(parseFloat(t_))*1.002737909350795;
//текущее звездное время в часах!

//document.AZ_H.test.value="s_00="+s_00+" s0="+s0+ " s="+ s+ " t_="+t_; 

//var  u = -3;//lz - 4;
//var  s = s0 + u + 9.85*u/3600;

s=MS(s);
//s- в радианах!
var  ak0 = (a - s)*0.997271/p0;
  //{ ak0 - момент верхней кульминации по моск. времени }
while (ak0 < 0) {ak0 = ak0 + 24 - 0.0656667};
while (ak0 > 24) {ak0 = ak0 - 24};
//document.AZ_H.test.value="ak0="+ak0+ " s="+ s+" s_00="+s_00+" s0="+s0;


var  k1 = Math.floor(ak0);
var  k2 = Math.floor((ak0-k1)*60); //frac(ak0)*60;
var  k3 = Math.floor((ak0-k1-k2/60)*3600);
  //if (mode = 0) then 
//////!!!
document.AZ_H.test.value=k1+":" +k2+":"+ k3;


var  r1 = k1; 
var  r2 = k2; //exit;
  //{захват времени кульминации}
  
//  if ((r1 < 0) or (r2 < 0)) 
//  then begin
//  GetTime(hour,minute,second,sec100);
//  r1 = hour;
//  r2 = minute;
//       end;


                               
//var  am = r1 + r2/60; - по замыслу - текущее московское время
//var  u = am +parseInt(document.AZ_H.d_UT.value);//- 4.0 + lz; - по замыслу UT
var  u = t_;
//var l__=L_star_jd(j_d);
var  z = L_star_jd(j_d) + parseFloat(y*u);
var  q = Math.cos(z);
var  r = Math.sin(z);
//document.AZ_H.test.value="u="+u+ " z="+ z+" y="+y+ " r="+ r;
s = s0 + u + 9.85*u/3600;
//текущее время захватили, ранее в s было время полночи!
s= MS(s);

//var  t9 = s - a;
var  t9 = s - a;
//текущее  
//зв. время в радианах минус альфа - часовой угол!
//document.AZ_H.test.value="s0="+s0+ " s="+ s+" s_="+s_+ " t9="+ t9;

var  b5 = Math.cos(t9);
var  b6 = Math.sin(t9);
var  b9 = d7 + d8*b5;

//document.AZ_H.test.value="t9="+t9+ " b5="+ b5+" b6="+b6+ " b9="+ b9;

//  //  if ((b9 <= 0) or (b9 > 99)) then begin
//  //                                   end;

var  b0 = Math.sqrt(1 - b9*b9);
var  b3 = d5*b6/b0;
var  b4 = (d0*b5 - d9)/b0;
var H_all=180*Math.atan(b9/b0)/pi;
//document.AZ_H.test.value="b0="+b0+ " b3="+ b3+" b4="+b4+ " H_all="+ H_all;
var  b8 = Math.floor(180*Math.atan(b9/b0)/pi + 0.5);
var  b7 = 180*Math.atan(b3/b4)/pi;
//document.AZ_H.test.value="b8="+b8+ " b7="+ b7+" H_all="+ H_all;
if (b4 > 0) 
 { 
 if (b7 < 0) 
  {b7 = b7 + 360}
 } 
else 
 {b7 = b7 + 180};  

if (b7>180) {b7=b7-360};
var azimut=Math.abs(b7);

//--document.AZ_H.az1.value=Math.floor(azimut);
//--document.AZ_H.az2.value=Math.floor((azimut-document.AZ_H.az1.value)*60);
//--document.AZ_H.az3.value=Math.floor((azimut-document.AZ_H.az1.value-document.AZ_H.az2.value/60)*3600);
var az1=Math.floor(azimut);
var az2=Math.floor((azimut-az1)*60);
var az3=Math.floor((azimut-az1-az2/60)*3600);

if (b7<0)
 {
 //--document.AZ_H.az1.value=-document.AZ_H.az1.value;
 //--document.AZ_H.az2.value=-document.AZ_H.az2.value;
 //--document.AZ_H.az3.value=-document.AZ_H.az3.value;
  az1=-az1;
  az2=-az2;
  az3=-az3;
 };
document.AZ_H.az1.value=az1;
document.AZ_H.az2.value=az2;
document.AZ_H.az3.value=az3; 
 

var H_=H_all;
H_all=Math.abs(H_all);
//--document.AZ_H.h1.value=Math.floor(H_all);
//--document.AZ_H.h2.value=Math.floor((H_all-document.AZ_H.h1.value)*60);
//--document.AZ_H.h3.value=Math.floor((H_all-document.AZ_H.h1.value-document.AZ_H.h2.value/60)*3600);
var h1=Math.floor(H_all);
var h2=Math.floor((H_all-h1)*60);
var h3=Math.floor((H_all-h1-h2/60)*3600);

if (H_<0)
{
 //--document.AZ_H.h1.value=-document.AZ_H.h1.value;
 //--document.AZ_H.h2.value=-document.AZ_H.h2.value;
 //--document.AZ_H.h3.value=-document.AZ_H.h3.value;
 h1=-h1;
 h2=-h2;
 h3=-h3;
};
document.AZ_H.h1.value=h1;
document.AZ_H.h2.value=h2;
document.AZ_H.h3.value=h3;
  
  
//document.AZ_H.test.value="test"+ ' ' +document.AZ_H.user_enter.checked+ ' ==' 
//iday+ ' '+ s0;
//+ "jd=" + j_d ;

timerID=setTimeout("count_az_h()",1000);

}