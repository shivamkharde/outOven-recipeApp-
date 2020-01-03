document.addEventListener('deviceready', function(){
    // defining variable for apikey and apiid
    const appKey = "f5b9519940f58a7c287a4623eab68857";
    const appId = "34910c4d";
    const baseURI = `https://api.edamam.com/search`;
    
    document.getElementById("searchrecipe").addEventListener('click',function(){
            //get field values
            var recipename = document.getElementById("recipename").value;
            if(recipename == ""){
                // if empty
                alert('please Enter recipe name to search');
            }else{
                // call to api for getting recipes
                callApi(recipename);
                
            }
    });
    document.getElementById("recipename").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        var recipename = document.getElementById("recipename").value;
        if(recipename == ""){
            // if empty
            alert('please Enter recipe name to search');
        }else{
            // call to api for getting recipes
            callApi(recipename);
        }
    }
    });
   function callApi(recipename){
       $.get(baseURI,{
           q: recipename,
           app_id: appId,
           app_key: appKey,
           from: 0,
           to: 20,
       },function(data){
           console.log(data);
           var element = "";
           for (let index = 0; index < data.hits.length; index++) {
                element +=`
                    <div class="col-md-12">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${data.hits[index].recipe.image}" class="card-img-top" alt="recipe image">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h3 class="card-title">${data.hits[index].recipe.label}</h3>
                                        <h6 class="card-title"><b>Time :</b> <small>${data.hits[index].recipe.totalTime}min</small></h3>
                                        <h6 class="card-title"><b>Calories :</b> <small>${data.hits[index].recipe.calories}gm</small></h3>
                                        <h6 class="card-title"><b>Ingredients :</b> <small>${data.hits[index].recipe.ingredients.length}</small></h6>
                                        <a href="#" id="see-full-recipe" class="btn btn-primary">see recipe</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
           }
           document.getElementById("recipe-result").innerHTML = element;
       });
   }
   document.getElementById("see-full-recipe").addEventListener('click',function(){
        
   });

}, false);
