var sheet_vvod = 'Ввод';
var rang_vvod = 'A2:L';
var sheet_sprv = 'Справочник';
var rang_sprv = 'A2:F';

function check()
{
  var dat = new Date();
  if(dat.getHours() < 7 || dat.getHours() > 22) { return; }
  var info = getInfo();
  var range = SpreadsheetApp.getActive().getSheetByName(sheet_vvod).getRange(rang_vvod)
  var values = range.getValues();
  
  var head = CreateHeading(range,-1)
  values.forEach( function (el,ind)
                 {
                   if(el[head['Тип']] == '' || el[head['Ссылка']]  == '' || el[head['Отправлено']]  != '' || el[head['Фото']]  == '') { return; }
                   
                   var objT = info[el[head['Тип']]];
                   if(!objT['stat']) { return; }
                   
                   var url = el[head['Ссылка']];
                   var text = el[head['Финал']];
                   var phots = el[head['Фото']].split('\n');
                   
                   try 
                   { 
                     url = createLink(url,el[head['ID']])[0]
                     Logger.log(url)
                     
                     var short = shortLink(url);
                     text = text.replace('REPLACE', short );
                     vk_post(objT['vk'],text,phots)
                     tg_post(objT['tg'],text.replace('₽ #', 'Р #'),phots[0])
                     objT['stat'] = false;
                     
                     range.offset(ind, head['Short Link'],1,3).setValues([[short,'+',new Date()]])
                   } catch (er) { Logger.log(er) }
                   
                 })
}

function getInfo()
{
  var obj = {};
  var range = SpreadsheetApp.getActive().getSheetByName(sheet_sprv).getRange(rang_sprv)
  var values = range.getValues();
  
  var head = CreateHeading(range,-1)
  
  values.forEach( function (el,ind)
                 {
                   if(el[head['Тип']] == '') { return; }
                   obj[el[head['Тип']]] = { tg: ""+el[head['ТГ']] ,vk: ""+ el[head['ВК']],ost: el[head['Осталось']],stat:true}
                 })
  return obj;
}
