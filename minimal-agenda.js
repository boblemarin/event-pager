(function(){
  'use strict';
  // config
  var apiKey = "AIzaSyCUOqKRlhKCZLrZs_UP_WLykbqlexkgwIw";
  var calendarID = "1g8pgg0329a42r5nsa898hsc4s@group.calendar.google.com";
  var monthNames = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var now = new Date();

  console.log(now.toISOString());

  function loadError(oError) {
    throw new URIError("The script " + oError.target.src + " didn't load correctly.");
  }

  function prefixScript(url, onloadFunction) {
    /*
    var newScript = document.createElement("script");
    newScript.onerror = loadError;
    newScript.async = true;
    if (onloadFunction) { newScript.onload = onloadFunction; }
    document.currentScript.parentNode.insertBefore(newScript, document.currentScript);
    newScript.src = url;
    */

    var s = document.createElement('script'); // Create a script element
    s.type = "text/javascript";               // optional in html5
    s.async = true;                           // asynchronous? true/false
    s.src = url; 
    var fs = document.getElementsByTagName('script')[0];  // Get the first script
    fs.parentNode.insertBefore(s, fs);
  }

  function check(calendar) {
    //var agendaRoot = document.querySelector('.agenda');
    //var oldRoot = document.querySelector('.agenda-old');
    var numEvents = calendar.items.length;
    //calendar.items.reverse();
    if ( numEvents > 0 ) {
      for(var i=0;i<numEvents;++i) {
        var event = calendar.items[i];
        //console.log(event);
        /*
        
        if (event.attachments.length) {
          // show attachment(s) -> define strategy for multiple attachments
          for each attachment {
            check mime/type -> image/*, or video/*, or else ?
          }
        } else if (event.description) {
          // display text (or detect html code or BBCode ?)
        }
  

        */


        if (event.attachments.length) {
          var img = document.createElement('img');
          //img.src = event.description;
          //console.log( 'https://drive.google.com/uc?export=view&id=' + event.attachments[0].fileId);
          img.src = 'https://drive.google.com/uc?export=view&id=' + event.attachments[0].fileId;
          document.querySelector('.container').appendChild(img);
        //} else {
        //  console.log("no attachments");
        }
        /*
        var eventDate = new Date(event.end.dateTime);
        if (eventDate > now) {
          var li = document.createElement('li');
          //li.className = "agenda-event";
          li.innerHTML = formatEvent(event);
          agendaRoot.appendChild(li);
        }else {
          //console.log("PAST: " + event.start.dateTime + " : " + event.summary);
          var s = document.createElement("span");
          s.innerHTML = formatEvent(event);
          oldRoot.appendChild(s);
        }
        */
        return;
      }
    } else {
      //agendaRoot.innerHTML = "Aucun spectacle à l'agenda pour l'instant."
      var img = document.createElement('img');
      img.src = 'logo.png';
      document.querySelector('.container').appendChild(img);
    }

    //console.log("minimal-agenda is UP");
  }

  function formatEvent(event) {
    var date = new Date(event.start.dateTime);
    var dateString = '<span class="agenda-event"> <span class="agenda-date"> <span class="agenda-date-day">' + date.getDate() + '</span>-<span class="agenda-date-month">' + monthNames[date.getMonth()] + '</span>-<span class="agenda-date-year">' + date.getFullYear() + '</span></span> <span class="agenda-summary">' + event.summary + '</span> </span>';
    return dateString;
  }

  window.onload = function() {
  // prefixScript( "https://www.googleapis.com/calendar/v3/calendars/" + calendarID + "/events?key=" + apiKey + "&callback=check&orderBy=startTime&singleEvents=true&timeMin=" + now.toISOString() );
  window._agenda_check_ = check;
  let dateAfter = new Date(now.getTime() + 60000);
  prefixScript( "https://www.googleapis.com/calendar/v3/calendars/" + calendarID + "/events?key=" + apiKey + "&callback=_agenda_check_&timeMin=" + now.toISOString() + "&timeMax=" + dateAfter.toISOString() );
  
};
  

})();