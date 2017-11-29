//-----------------------------------------------------------------------------------------------------------------
//Mukhad    30.10.17
//-----------------------------------------------------------------------------------------------------------------
function Hour2hms(val){
     let h = Math.floor(val);
     let m = Math.floor((val - h)*60);
     let s = (val - h - m/60)*3600;
     
     return h + " h " + m + " m " + s.toFixed(3) +" s ";
}
//-----------------------------------------------------------------------------------------------------------------
function getJDay(thedata,hour_angle){
    //hour_angle - часовой угол (час) со знаком "-" для восточного полушария
    if(hour_angle == undefined)
            hour_angle = thedata.getTimezoneOffset()/60;    
    //console.log("h = ", hour_angle);
    
    let dd = new Date(1900,0,1);
    let jd = (thedata - dd)/(24*3600*1000) + 2415020 + 0.5 + hour_angle/24;
        
    //Расчет по формуле из Википедии 
    /*
    let a= Math.floor((14 - (thedata.getMonth()+1) )/12);
    let y = thedata.getFullYear() + 4800 - a;    
    let m = thedata.getMonth()+1 + 12*a -3;
    let JDN = thedata.getDate() + 
       Math.floor((153.*m+2)/5) + 365*y +
       Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
    console.log(JDN);

    let JD = JDN + (thedata.getUTCHours()-12 + 
    thedata.getUTCMinutes()/60 + 
    thedata.getUTCSeconds()/3600 + 
    thedata.getUTCMilliseconds()/(3600*1000) )/24;
    
    console.log("1) jd:" + jd);        
    console.log("2) JD:" + JD);
    console.log("JD - jd:" + (JD-jd));
    */
            
    return jd;
}
//-----------------------------------------------------------------------------------------------------------------
function getLMST(thedata, hour_angle, longitude){
    //get Local Mean Siderial Time
    
    //hour_angle - часовой угол (час) со знаком "-" для восточного полушария    
    if(hour_angle == undefined)
        hour_angle = thedata.getTimezoneOffset()/60;
    
    //double longitude = 36.85;   //долгота УТР-2 36.85
    //double longitude = (33 + 11.2205/60.);   //долгота РТ-70
    if(longitude == undefined)
        longitude = (33 + 11.2205/60.);
    
    longitude = longitude * 24./360.;

    let jd = getJDay(thedata);
    let nowtime = thedata.getHours() + thedata.getMinutes()/60 + 
                    (thedata.getSeconds()+ 0.001*thedata.getMilliseconds())/3600;
    
    //расчет по 1950 Jan 1, 12h UT1
    let Tu_50 = (jd - 2415020  )*1./36525;
    let GMST0_50 = 6 + 38./60 + 45.836/3600 + 8640184.542*Tu_50/3600 + 0.0929*Tu_50*Tu_50/3600;
    
 
    //from Lang - Astrophysical formulae
    let Tu = (jd - 2451545.0)*1./36525;
        //2451545.0 == 2000 Jan 1, 12h UT1
    let GMST0 = 24110.54841 + 8640184.812866*Tu + 0.093104*Tu*Tu - 0.0000062*Tu*Tu*Tu;
       // 24110.54841 == 6h 41m 50.54841s 
    
    while (GMST0 <= 0) {GMST0 = GMST0 + 86400.0};  ///из алгоритмов Самодурова
    while (GMST0 > 86400) {GMST0 = GMST0 - 86400.0};  
    GMST0 = GMST0 / 3600;

    //let delta = (GMST0%24 - GMST0_50%24)*3600;
    //console.log("GMST0 - GMST0_50 [sec]: " + delta);    

    //let LMST0 = GMST0_50 + longitude;    
    let LMST0 = GMST0 + longitude;
 
    let LMST = LMST0 + nowtime + hour_angle;    
    
    LMST = LMST - 24*Math.floor(LMST/24);
    return LMST;
}
//-----------------------------------------------------------------------------------------------------------------
function getToday_Jday(thedata){
    //thedata = new Date();
    month = thedata.getMonth();
    _month = (month * 1) + 1;
    
    //month = 6;
    name_day_week = new Array("воскресенье","понедельник","вторник","среда","четверг","пятница","суббота");
    week = thedata.getDay();
    week = name_day_week[week]; 
    name_Month = new Array("января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");
    month =name_Month[month];
    day = thedata.getDate();
    year = thedata.getFullYear();
    
    var i,d;
    d = 0;
    for (i=1995; i<=year-1; i++)
    {
    if  ((i/4-Math.floor(i/4)) == 0 )
     {d = Math.floor(d) + 366}
    else 
     {d = Math.floor(d) + 365};
    };
    
    for (i=1; i<=_month-1; i++)
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
    var J_day = Math.floor(d) + day + 2449717.5;
    
    let s  = week + ", " + day + " " + month + " " + year +" г. </b><br>Юлианская дата на сегодня: <b>" + J_day;
    
    var dd = new Date(1900,0,1);    
    var jd = (thedata - dd)/(24*3600*1000) + 2415020 + 0.5 + thedata.getTimezoneOffset()/(24*60);
    s = s + "<br><br>" + jd + "<br>" + thedata + "<br>";
    
    return s;
}
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

function getStarTime(dothis){
    
//dothis = new Date();
    im = 1+dothis.getMonth();
    iday = dothis.getDate();
    iyear = dothis.getFullYear();
    var r = 1296000.0;    //=360*3600
    month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    var i;    //integer
    var t,sm,p,e,q,d,f,m,l,pl,ps,s0,ihs,ims,sec;    // real;
//{*--------------------------------------------------------------------*
//*                        Calculate iday and t                        *
//*--------------------------------------------------------------------*}

if (im != 1) {
//--	i = (iyear div 4)*4;
var tmp_=Math.floor(iyear/4);
i=Math.round(4*tmp_);
if (iyear == i)
    {month[1] = 29};
//[1] - v JS s 0 numeracija massiva!
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

console.log(ps);
console.log(pl);


var s0 = sm+(pl+ps)/15.0* Math.cos (e);

var s_hour_=Math.floor(s0/3600);
var s_min_=Math.floor((s0-s_hour_*3600)/60);
var s_sec_=Math.floor((s0-s_hour_*3600-s_min_*60)*10000)/10000;

let s = s_hour_ + " h " + s_min_ + " m " + s_sec_ +" s ";
return s;
};