#placeType() = [home] | [weather] | [mail] | [calendar];
@results
	0 { "home" }
	1 { "weather" }
	2 { "mail" }
	3 { "calendar" }
@

show #placeType;
@results
	#placeType { 'show("' #placeType'")' }
@
