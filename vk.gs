var vk_token = '';
var vk_album = '';

//https://oauth.vk.com/authorize?client_id=7601135&display=page&scope=offline,wall,groups,photos&response_type=token&v=5.52

// Настройки поста в группах
var post_setling = 
    {
      access_token : vk_token,
      friends_only: '0',
      from_group: '0',
      signed: '0',
      close_comments:'1'
    }
// Создание поста на стене группы
function vk_post(group_id,text,photos)
{
  var url = 'https://api.vk.com/method/wall.post?v=5.52'+ '&owner_id='+group_id// + '&message='+text;
  
  for(var key in post_setling)
  {
    url += '&'+key+'='+post_setling[key];
  }
  
  if(typeof photos == 'object')
  {
    var phs = []
    for(var i in photos)
    {
      try { var ph = uploadPhotoVK(photos[i],text)['response'][0]; phs.push('photo'+ph['owner_id']+'_'+ph['id'])  } catch (er) { try { var ph = uploadPhotoVK(photos[i])['response'][0]; phs.push('photo'+ph['owner_id']+'_'+ph['id'])  } catch (er) { Logger.log(er)}}
    }
    if(phs.length > 0) { url += '&attachments=' + phs.join(','); }
  }
  return JSON.parse(UrlFetchApp.fetch(url,{method: 'post' ,payload:{message:text}}));
}

function uploadPhotoVK(photo, caption)
{
  var file = UrlFetchApp.fetch(photo)
  var link = JSON.parse(UrlFetchApp.fetch('https://api.vk.com/method/photos.getUploadServer?v=5.52'+'&album_id='+vk_album+'&access_token='+vk_token))['response']['upload_url']
  
  var upl = JSON.parse(uploadFile(link,file.getBlob()))
  
  var obj = {
    album_id:vk_album,
    access_token:vk_token,
    server:upl['server'],
    hash:upl['hash'],
    photos_list:upl['photos_list'],
  }
  if(typeof caption != 'undefined'){ obj['caption'] = caption; }
  var sav = UrlFetchApp.fetch('https://api.vk.com/method/photos.save?v=5.52',{payload:obj})
  return JSON.parse(sav);
}


function uploadFile(url,blob) {

  var boundary = "labnol";
//  var blob = DriveApp.getFileById(GOOGLE_DRIVE_FILE_ID).getBlob();

  var attributes = "{\"name\":\"abc.pdf\", \"parent\":{\"id\":\"FOLDER_ID\"}}";

  var requestBody = Utilities.newBlob(
    "--"+boundary+"\r\n"
    + "Content-Disposition: form-data; name=\"attributes\"\r\n\r\n"
    + attributes+"\r\n"+"--"+boundary+"\r\n"
    + "Content-Disposition: form-data; name=\"file\"; filename=\""+blob.getName()+"\"\r\n"
  + "Content-Type: " + blob.getContentType()+"\r\n\r\n").getBytes()
  .concat(blob.getBytes())
  .concat(Utilities.newBlob("\r\n--"+boundary+"--\r\n").getBytes());

  var options = {
    method: "post",
    contentType: "multipart/form-data; boundary="+boundary,
    payload: requestBody,
    muteHttpExceptions: true,
//    headers: {'Authorization': 'Bearer ' + getBoxService_().getAccessToken()}
  };

  var request = UrlFetchApp.fetch(url, options);
  return request
}
