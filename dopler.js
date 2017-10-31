
var light_vel = 299.792458;   //скорость света в км/с
var pi = Math.PI;

//===========================================================================
//---------------------------------------------------------------------------
void GorizontCoor(double hour, double del, double fi, double& a, double& A){
    //перевод из экваториальной СК в горизонтальную
    //hour - часовой угол (часы)
    //del - дельта (град)
    //а - высота (град) [-90;90]
    //A - азимут (град) [0;360]
 
    /*coor RT*/
    //double fi = 49.6444; // широта УТР-2
    //double fi = (45 + 11.3482/60.); // широта РТ-70
 
    del = del * pi / 180.; //rad
    hour = hour * pi / 12.; //rad
    fi = fi * pi / 180.; //rad
 
    a = asin( sin(del)*sin(fi) + cos(del)*cos(hour)*cos(fi) );
    A = acos( (sin(del)*cos(fi) - cos(del)*cos(hour)*sin(fi))/cos(a) );
    float tA = asin( -cos(del)*sin(hour)/cos(a) );
    if ( tA < 0 ) A = 2*pi - A;
 
    A = A * 180./pi;
    a = a * 180./pi;
 }
 //---------------------------------------------------------------------------
 void LMSTcount(TDateTime  Adate, TDateTime  Atime, int HourDeg, double dolgota,
                double& LMST, double& JD){
    TDateTime Adate00;
 
    /*coor RT*/
    //double dolgota = 36.85;   //долгота УТР-2 36.85
    //double dolgota = (33 + 11.2205/60.);   //долгота РТ-70
 
    dolgota = dolgota * 24./360.;
    Adate00 = EncodeDate(1900,1,1);
    int nd = Adate - Adate00 + 2415020 + 1; //2415020 - эпоха 12h00m
                                           //        0 января 1900 года
    unsigned short h1,m1,s1,ms1;
    DecodeTime(Atime,h1,m1,s1,ms1);
    double T  = h1 + m1*1./h + s1*1./h/h - HourDeg;
    if (T<12) JD = nd - (12. - T)/24;
    if (T==12) JD = nd;
    if (T>12) JD = nd + (T - 12.)/24;
 
    double Tu = (JD - 2415020  )*1./36525;
    double GMST0 = 6 + 38./h + 45.836/h2 + 8640184.542*Tu/h2
                 + 0.0929*Tu*Tu/h2;
 
 
 
    double LMST0 = GMST0 + dolgota;
 
    LMST = LMST0 + T;
 
    int q = LMST/24.;
    LMST = LMST - 24.*q;
 }
 //---------------------------------------------------------------------------
 void ConvertCoor(double RA, double Dec, double& RANow, double& DecNow,
                  int Coor,TDateTime YearNow){
   // delta, ddelta - градусы;
   // alfa, dalfa  - минуты
   double m,n,nd,N;
   double dDec,dRA;
   unsigned short year,monyh,day;
   DecodeDate(YearNow,year,monyh,day);
   //if(Coor==1950){  //по умолчанию
         m = 3.07327;  //сек. времени
         n = 1.33617;
         nd = 20.0426; //сек. дуги
         N = year - 1950;
   if(Coor==2000){
          m = 3.07420;  //сек. времени
          n = 1.33589;
          nd = 20.0383; //сек. дуги
          N = year - 2000;
   }
   dRA = (m + n * sin(RA*2*pi/24.) * tan(Dec*pi/180))*N;
   dDec = (nd * cos(RA*2*pi/24.))*N;
 
   dRA =  dRA / 3600.0; 	RANow = RA + dRA;
   dDec = dDec / 3600.0; DecNow = Dec + dDec;
 }
 //---------------------------------------------------------------------------
//============================================================================ 
 
 
 


double F_sun_vel(double alfa,double delta, float a, float d, float S_vel){
	   // alfa, delta - rad
	   // a,d - градусы
	   // S_vel - km/s
   double
	   aa = a * (2*pi/360), //alfa_apeks (rad)
	   da = d * (2*pi/360);//delta_apeks (rad)


   return S_vel*(cos(aa)*cos(da)*cos(alfa)*cos(delta)+
				sin(aa)*cos(da)*sin(alfa)*cos(delta)+
				sin(da)*sin(delta)); //km/s
}// end of function sun velocity
//---------------------------------------------------------------------------
double F_earth_vel(double alfa,double delta,TDateTime _Adate){

   double const
	   e=0.016707,//ексцентриситет земной орбиты
	   v=29.974;//km/s
   double  a_day, naklon, gamma, T;
   int  n_dat,n_day, day;
   unsigned short _year,m,d;

   TDateTime Adate_y;

   DecodeDate(_Adate,_year,m,d);
   Adate_y = EncodeDate(_year,1,1);
   n_day = _Adate-Adate_y; //порядковый номер дня наблюдений
   day = n_day;

   if (n_day>80) n_day = n_day-80;
   else n_day = 365-80+n_day;

   a_day = ((2*pi)/365.25)*n_day;    //долгота Солнца

   T = (_year-2000 + day*1./365 )*1./100;
   gamma = ( 1018578.046 + 6190.046*T + 1.666*T*T + 0.012*T*T*T )/3600;//degree
   gamma = (2*pi/360)*gamma;//rad

   naklon = ( 23*3600+26*60+19.81 - 0.47*(_year-2000) )/3600;//degree
   naklon = (2*pi/360)*naklon;//rad


return -v*(sin(a_day)*cos(delta)*cos(alfa)-
cos(a_day)*(cos(delta)*sin(alfa)*cos(naklon)+sin(delta)*sin(naklon)))+
v*e*(sin(gamma)*cos(delta)*cos(alfa)-
cos(gamma)*(cos(delta)*sin(alfa)*cos(naklon)+sin(delta)*sin(naklon)));//{km/s}

}//end of function earth velocity
//----------------------------------------------------------------------------
double Dopler(double alfa,double delta, TDateTime Adate,double Fr, int par){
   double v_sun, v_earth;
   double f_sun, f_earth;
   double aapeks, dapeks, S_vel;
   int y;

   alfa =   (2*M_PI*alfa/24);
   delta = (2*M_PI*delta/360);

   if (par==2000)  aapeks = 271.6, dapeks = 29.2; // координаты апекса
   if (par==1950)  aapeks = 271.1, dapeks = 29.2; // для разных эпох
   //if (RB1900->Checked)  aapeks = 270.6, dapeks = 29.2, y = 1900;// взяты из Крауса (с. 51)

   S_vel = 19.5;  // скорость взята из Ленга (ч.II, c.250)
   // S_vel = 19.7;  // скорость взята из Крауса (с. 51)


   v_sun = F_sun_vel(alfa,delta,aapeks,dapeks,S_vel);  //km/s
   f_sun = -v_sun*Fr/light_vel;

   v_earth = F_earth_vel(alfa,delta,Adate); //km/s
   f_earth = -v_earth*Fr/light_vel;

   if (Fr==0) return v_sun+v_earth;
   else       return f_sun+f_earth;
   /*
   Memo->Lines->Add("v_sun = " + FloatToStrF(v_sun,ffFixed,8,4)+ " км/с" +
			   + "   f_sun = " + FloatToStrF(f_sun,ffFixed,8,4)+ " кГц");
   Memo->Lines->Add("v_earth = " + FloatToStrF(v_earth,ffFixed,8,4)+ " км/с" +
			   + "   f_earth = " + FloatToStrF(f_earth,ffFixed,8,4)+ " кГц");
   Memo->Lines->Add("Dopler shift = " + FloatToStrF(f_sun+f_earth,ffFixed,8,4) +
					" кГц");
   ViewForm->DoplerEdit->Text = FloatToStrF(f_sun+f_earth,ffFixed,8,4);
   Memo->Lines->Add("Скорость Солнца = " + FloatToStrF(S_vel,ffFixed,4,1) +
					" км/с, эпоха " + IntToStr(y));
   */
}
//----------------------------------------------------------------------------
double DoplerLang(double alfa,double delta,TDateTime Adate,
				  double hour_angle,double obs_latitude, int epoch){
   alfa =   (2*M_PI*alfa/24);
   delta = (2*M_PI*delta/360);
   hour_angle =   (2*M_PI*hour_angle/24);
   obs_latitude = (2*M_PI*obs_latitude/360);

   //-Correction for solar motion-----------------------------------------------
   double Vr_sun, aapeks, dapeks;

   if (epoch==2000)  aapeks = 271.6, dapeks = 29.2; // координаты апекса
   if (epoch==1950)  aapeks = 271.1, dapeks = 29.2; // для разных эпох
   if (epoch==1900)  aapeks = 270.6, dapeks = 29.2;// взяты из Крауса (с. 51)
   double   aa = aapeks * (2*pi/360), //alfa_apeks (rad)
			da = dapeks * (2*pi/360); //delta_apeks (rad)

   Vr_sun = 19.5*(cos(aa)*cos(da)*cos(alfa)*cos(delta)+
				sin(aa)*cos(da)*sin(alfa)*cos(delta)+
				sin(da)*sin(delta)); //[km/s]

   double v_sun = F_sun_vel(alfa,delta,aapeks,dapeks,19.5);  //km/s


   //-Correction for earth's orbital motion about the Sun=----------------------
   double V,G,T,Vr_earth;
   double const
		  e = 0.016707,       //     eccentricity of the earth orbit
		  a = 1.49597892e08,  //[km] semi-major axis of the earth
		  P = 31470758;       //[sec] maen siderial seconds in solar year

   V = 2*M_PI*a/(P*sqrt(1-e*e)); //~ 29.974 km/sec

   unsigned short y,m,d;
   DecodeDate(Adate,y,m,d);
   int n_day = Adate - EncodeDate(y,1,1); //порядковый номер дня наблюдений
   T = (y - 2000 +n_day*1./365 )*1./100;

   //G = 281*3600+13*60+15.0 + 6189.03*T +1.63*T*T + 0.012*T*T*T;  //[sec]  (epoch 1900)
   G = 1018578.046 + 6190.046*T + 1.666*T*T + 0.012*T*T*T;       //[sec]   (epoch 2000)

   G = (2*M_PI/360) * G/3600; //[rad]

   double lamda,betta,lamda_sun;
   if (n_day>80) n_day = n_day-80;
   else n_day = 365-80+n_day;
   lamda_sun = ((2*M_PI)/365.25)*n_day;    //[rad] долгота Солнца
   double ecl = 23.4392911;  //epoch 2000  //ecl = 23.4457889;  //epoch 1950
   ecl =  (2*M_PI/360) * ecl;//[rad]    //ecl - obliquity of the ecliptic

   lamda = atan( (sin(alfa)*cos(ecl) + tan(delta)*sin(ecl))/cos(alfa) );
   betta = asin( sin(delta)*cos(ecl) - cos(delta)*sin(ecl)*sin(alfa) );

   Vr_earth = -V * cos(betta)*sin(lamda_sun - lamda) +
			   V * e * sin(G - lamda)*cos(betta);

   double v_earth = F_earth_vel(alfa,delta,Adate); //km/s

   //-Rotation of earth about its axis-----------------
   double const
		  Ve = 0.465; //[km/s] equatorial rotational velocity
   double Vr_earth_rot = Ve * sin(hour_angle) * cos(delta) * cos (obs_latitude);

   return Vr_sun + Vr_earth + Vr_earth_rot;
}
//----------------------------------------------------------------------------
