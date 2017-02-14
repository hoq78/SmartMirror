//this is our function for use in the below rule
#placeType() = [restaurant] | [cafe] | [gas station];
@results
    1 { "restaurant" }
    2 { "cafe" }
    3 { "gas" }
@

show me the [nearest | closest] #placeType (to $place)? (that has ($item (and)?)+)?;
@results
    //take note of the usages of double and single quotes. If you need to use a certain type of quote in your result, choose the other kind of quote as your surrounding quotation.
    #placeType { "closest('" #placeType "')" }

    //here, we utilize the variable $place to output whatever may have been said in place ;) of $place
    #placeType place { "closest('" #placeType "', '" $place "')" }

    //now let's handle that pesky kleene. How could we possibly do this?
    //k_0 { k_0<','>($item) }
    #placeType, place, k_0 { "closest('" #placeType "', '" $place "', '" k_0<','>($item) "')" }
@
