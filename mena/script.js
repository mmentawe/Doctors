$(function () {
  "use strict";
  // Control buttons
  $('.dropbtn').click(function () {
    $(".dropdown-content").show();
    return false;
  });
  
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
  var div = document.getElementById("doctorList");
  while(div.firstChild){
    div.removeChild(div.firstChild);
  }
  specialityDoctors.forEach(myFunction);
  $(".dropdown-content").hide();
}
function ListSpecialities()
{
  for (var i=0; i<specialities.length; i++)
  {
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    var list = document.getElementById("specialtiesList");
    a.setAttribute('speciality', specialities[i]);
    a.appendChild(document.createTextNode(specialities[i]));
    a.onclick = (function(){ 
      ShowSpeciality(this);
      return true; 
    });
    list.appendChild(a);
  }
}  
function myFunction(item, index) {
  //1 Create carddiv 
  var image = item.Image;
  if (image == null || image.length == 0) {
    image = "team2.jpg";
  }
  var tableRow = document.createElement("tr");
  var tableCol = document.createElement("td")
  tableRow.appendChild(tableCol);

  tableCol.className = "tableCol active";
  var innerHtml = '<div class="card"> <div class="card-body"><p class="card-title text-center">' + item.Name + 
                    '</p>'+ 
                    //'<p class="card-title text-center">'+item.Speciality+'</p>'+
                    '<img class="card-img-top" src="images/' + 
                    image + '" alt="' + item.Name + '" style="width:100%"><p class="card-text text-center">' +
                    item.Bio + '</p>';
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
      innerHtml += '<abbr title="Phone">P:</abbr>' + item.Clinics[i].Phone;
    }
    if (item.Clinics[i].Address != null || item.Clinics[i].Phone != null) {
      innerHtml +=  '</address>';
    }
  };
  innerHtml +=  '</div><p><button class="contact">Contact</button></p></div>';
  tableCol.innerHTML =  innerHtml;
  //2 Get the   
  document.getElementById("doctorList").appendChild(tableRow);
}
});
