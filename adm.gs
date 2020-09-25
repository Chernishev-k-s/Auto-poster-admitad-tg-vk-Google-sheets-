var access_token;
var id = '1570028';
var ali = '6115'
var client_id = 'fVsnJcv12XNySyr0aoxbjD9Lcjc5YN';
var token_adm = 'ZlZzbkpjdjEyWE55U3lyMGFveGJqRDlMY2pjNVlOOlRDQ240ZkdhaHRSZjRwOUJ2TUl0YmxFTm5xa3l0Vw==';


function reg()
{
  var url = 'https://api.admitad.com/token/';
  var obj = { 
    'method' : 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'headers' : {'Authorization': 'Basic '+token_adm,},
    
    
    'payload' : 
    {
      'grant_type': 'client_credentials',
      'client_id': client_id,
      'scope': 'deeplink_generator websites advcampaigns_for_website',
    }
  };
  var ret = JSON.parse(UrlFetchApp.fetch(url, obj));
  access_token = ret['access_token']
  return ret;
}

function createLink(urls,teg)
{
  var url = 'https://api.admitad.com/deeplink/'+id+'/advcampaign/'+ali+'/'; 
  if(!access_token) { reg() }
  var obj = { 
    'muteHttpExceptions':true,
    'headers' : {'Authorization': 'Bearer '+access_token,},
  };
  return JSON.parse(UrlFetchApp.fetch(url+'?'+'ulp='+urls,obj))
}

function getProgram()
{
  var url = 'https://api.admitad.com/advcampaigns/'+ali+'/website/'+id+'/'; 
  if(!access_token) { reg() }
  var obj = { 
    'muteHttpExceptions':true,
    'headers' : {'Authorization': 'Bearer '+access_token,},
  };
  var ret = JSON.parse(UrlFetchApp.fetch(url, obj));
  return ret;
}
function getPlatform()
{
  var url = 'https://api.admitad.com/websites/v2/'; 
  if(!access_token) { reg() }
  var obj = { 
    'muteHttpExceptions':true,
    'headers' : {'Authorization': 'Bearer '+access_token,},
  };
  return JSON.parse(UrlFetchApp.fetch(url,obj))
}
