function CreateHeading(Range,RowOffset)
{
  var MassHead = Range.offset(RowOffset,0,1).getValues();
  var ObjectHead = new Object();
  
  MassHead[0].forEach( function (el,ind)
                      {
                        ObjectHead[el] = ind;
                      })
  return ObjectHead;  
}
function toStringFormatData (Data, FormatData)
{
  var GMT = new Date(Data).toString().substr(25,6)+":00";  
  return Utilities.formatDate(Data, GMT, FormatData);
}
