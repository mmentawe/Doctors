$(function () {
  "use strict";
  // Control buttons

  var specialities = $.map(Doctors, function(d, i){
    return d.Speciality;
  });
  specialities = unique(specialities);

  //Get list of specialities
  ListSpecialities();

  function unique(array) {
    return $.grep(array, function(el, index) {
        return index == $.inArray(el, array);
    });
  }
  function ShowSpeciality(link)
  {
    var speciality = link.getAttribute('speciality');
    var specialText = document.getElementById("specialText");
    specialText.innerText = speciality;
    var specialityDoctors = $.grep(Doctors, function(d) {
      return d.Speciality == speciality;
    });

    $("#sliderindicators").remove();
    var MainDiv = document.getElementById("MainDiv");

    //<div id="sliderindicators" class="carousel slide" data-ride="carousel" data-interval="false">
    var carouseldiv =  document.createElement("div");
    carouseldiv.id = "sliderindicators";
    carouseldiv.className = "carousel slide";
    carouseldiv.setAttribute("data-ride", "carousel");
    carouseldiv.setAttribute("data-interval","false");

    MainDiv.appendChild(carouseldiv);
    
    var hammerEvent = new Hammer(carouseldiv);
    
    // listen to events...
    hammerEvent.on("swipeleft swiperight", function(ev) {
      if (ev.type == 'swiperight')
      {
        $("#sliderindicators").carousel("prev");
      }
      else
      {
        $("#sliderindicators").carousel("next");
      }
    });

    /*
      <ol class="carousel-indicators">                                                              
          <li data-target="#sliderindicators" data-slide-to="0" class="active"></li>                
          <li data-target="#sliderindicators" data-slide-to="1"></li>                               
          <li data-target="#sliderindicators" data-slide-to="2"></li>                               
      </ol>                                                                                         
    */
  var carouselol =  document.createElement("ol");
  carouselol.className = "carousel-indicators";
  carouseldiv.appendChild(carouselol);
  for (var i=0; i<specialityDoctors.length; i++)
  {
    var carouselli =  document.createElement("li");
    carouselli.className = "text-center carousel-indicators-text";
    if (i == 0){
      carouselli.className += " active";
    }
    carouselli.innerText = (i+1).toString();
    carouselli.setAttribute("data-target", "#sliderindicators");
    carouselli.setAttribute("data-slide-to",i.toString());
    carouselol.appendChild(carouselli);
  }     

  //  <div class="carousel-inner" role="listbox" id="doctorList"></div>                                                                                                                     \
  var carouselinner =  document.createElement("div");
  carouselinner.id = "doctorList";
  carouselinner.className = "carousel-inner";
  carouselinner.setAttribute("role", "listbox");
  carouseldiv.appendChild(carouselinner);

  for (var i=0; i<specialityDoctors.length; i++)
  {
    carouselinner.appendChild(myFunction(specialityDoctors[i], i));
  }     
  $('#collapse1').collapse("toggle");
}
function ListSpecialities()
{
  for (var i=0; i<specialities.length; i++)
  {

    var li = document.createElement('li');
    li.className = "list-group-item text-center";

    var a = document.createElement('a');
    a.className = "dropdownText";
    a.setAttribute('href', '#');
    a.setAttribute('speciality', specialities[i]);
    a.appendChild(document.createTextNode(specialities[i]));
    a.onclick = (function(){ 
      ShowSpeciality(this);
      return true; 
    });
    li.appendChild(a);

    var list = document.getElementById("specialtiesList");
    list.appendChild(li);
  }
  $('#collapse1').collapse("toggle");
}  
function myFunction(item, index) {
  //1 Create carddiv 
  var image = item.Image;
  if (image == null || image.length == 0) {
    image = "team2.jpg";
  }
  var div = document.createElement("div");
  if (index == 0) {
    div.className = "carousel-item active";
  } else {
    div.className = "carousel-item";
  }
  var innerHtml = '<div class="card"> <div class="card-body"><p class="card-title text-center">' + item.Name + 
                    '</p><img class="card-img-top" src="images/' + image + '" alt="' + item.Name + 
                    '" style="width:100%"><p class="card-text text-center">' + item.Bio + '</p>';
  for (var i in item.Clinics) {
    if (item.Clinics[i].Name != null) {
      innerHtml += '<p class="clinic">' + item.Clinics[i].Name + '</p>';
    }
    if (item.Clinics[i].Address != null || item.Clinics[i].Phone != null) {
      innerHtml +=  '<address>';
    }
    if (item.Clinics[i].Address != null) {
      innerHtml +=  item.Clinics[i].Address + '<br />';
    }
    if (item.Clinics[i].Phone != null) {
      innerHtml += '<div class="rtlA">';
      for (var j in item.Clinics[i].Phone) {
        innerHtml += '<a href="tel:'+item.Clinics[i].Phone[j]+'">'+item.Clinics[i].Phone[j]+'</a><br />';
      }
      innerHtml += '</div>';
    }
    if (item.Clinics[i].Address != null || item.Clinics[i].Phone != null) {
      innerHtml +=  '</address>';
    }
  };
  innerHtml +=  '</div><p><button class="contact">Contact</button></p>';
  div.innerHTML =  innerHtml;
  return div;
}
});
