//Catching the first element of the title
//pass string with separators and return string without separators
function omn_catchFirsElementOfTitle(stringWithSeparator, separator){
    var array_stringWithSeparator= stringWithSeparator.split(separator);
    var stringWithoutSeparator= array_stringWithSeparator[0];
    return stringWithoutSeparator;
}