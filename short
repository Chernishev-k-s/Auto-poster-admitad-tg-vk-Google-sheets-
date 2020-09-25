var url_short = 'http://ali.onl/';
function shortLink(link)
{
  var obj = {
    'method' : 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'payload': { url:link,antispam_method:'',basic_antispam:'' },
  }
  try { var ret = UrlFetchApp.fetch(url_short,obj); } catch (er) { try { var ret = UrlFetchApp.fetch(url_short,obj); } catch (er) {  } }
  return ret.getContentText().match('value="https://ali.onl/[^-][^-][^-][^-]"')[0].split('"')[1]
}
