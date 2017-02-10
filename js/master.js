(function(){

  var carImages = document.querySelectorAll('.thumbInfo img'),
      carName = document.querySelectorAll(".modelName"),
      carInfoBox = document.querySelector('.modelInfo'),
      carDesc = document.querySelector('.modelDetails'),
      carPrice = document.querySelector('.priceInfo'),
      httpRequest;

      function makeRequest(){
            httpRequest = new XMLHttpRequest();

            if(!httpRequest){
              console.log('Giving up, can\'t use Ajax.');
              return false;
            }
            //? = to the $ sign in php  = it makes it a variable
            var url = 'includes/ajaxQuery.php'+'?model='+this.id;
            console.log(url);

            httpRequest.onreadystatechange = showResults;
            httpRequest.open('GET', url);
            httpRequest.send();
        }

function showResults(){
  console.log("also fired");
  //console.log(httpRequest.status);
  //console.log(httpRequest.readyState);
  //httpRequest.status === 200 - 200 means that the httprequest has worked properly
  if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
      console.log("ready");
      var carData = JSON.parse(httpRequest.responseText);
      console.log(carData);
      carInfoBox.firstChild.nodeValue = carData.modelName;

      [].forEach.call(document.querySelectorAll('.hidden'), function(item){
        item.classList.remove('hidden');
      });
      
      carName.innerHTML = carData.modelName;
      carDesc.innerHTML = carData.modelDetails;
      carPrice.innerHTML = carData.pricing;


  }
}

[].forEach.call(carImages, function(img){
  img.addEventListener('click', makeRequest, false);
});

})();
