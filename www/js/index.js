// defining variable for apikey and apiid
const appKey = "f5b9519940f58a7c287a4623eab68857";
const appId = "34910c4d";
const baseURI = `https://api.edamam.com/search`;

document.addEventListener('deviceready', function(){
    
    document.getElementById("hidden").addEventListener('mouseover',function(){
        $('#main-menu').css("display","none");
    });
    document.getElementById("title-bar").addEventListener('mouseover',function(){
        $('#main-menu').css("display","none");
    })
    $('#menu-icon').click(function(){
        $(document.getElementById("main-menu")).animate({width: 'toggle'});
    })

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
            if(data.count == 0){
                element = "Opps!! No Recipe's Found"
            }else{
                for (let index = 0; index < data.hits.length; index++) {
                        element +=`
                            <div class="col-md-12">
                                <div class="card mb-3 mt-4 mr-4 ml-4" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img height="250px" src="${data.hits[index].recipe.image}" class="card-img-top" alt="recipe image">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h3 class="card-title">${data.hits[index].recipe.label}</h3>
                                                <h6 class="card-title"><b>Time :</b> <small>${data.hits[index].recipe.totalTime}min</small></h3>
                                                <h6 class="card-title"><b>Calories :</b> <small>${data.hits[index].recipe.calories}gm</small></h3>
                                                <h6 class="card-title"><b>Ingredients :</b> <small>${data.hits[index].recipe.ingredients.length}</small></h6>
                                                <a href="#" onclick="getRecipe(this)" data-uri="${data.hits[index].recipe.uri}" id="see-full-recipe" class="btn btn-primary">see recipe</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                }
            }
           document.getElementById("recipe-result").style.display = "flex";
           document.getElementById("recipe-result").innerHTML = element;
           document.getElementById("single-recipe-result").style.display = "none";
       });
    }
}, false);

// to get a single recipe from uri
function getRecipe(object){
    var uri = object.getAttribute("data-uri");
    console.log(uri);

    // call to api to get single recipe
    $.get(baseURI,{
        r: uri,
        app_id: appId,
        app_key: appKey
    },function(data){
        console.log(data);
        // seperate ingredients from data
        var ingredients = "";
        for (let index = 0; index < data[0].ingredients.length; index++) {

            ingredients+=`
                    <li>${data[0].ingredients[index].text}</li>
            `;
        
        }

        var element =`
                    <div class="col-md-12">
                        <div class="card mb-3 mt-4 mr-4 ml-4" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img height="250px" src="${data[0].image}" class="card-img-top" alt="recipe image">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h3 class="card-title">${data[0].label}</h3>
                                        <h6 class="card-title"><b>Time :</b> <small>${data[0].totalTime}min</small></h3>
                                        <h6 class="card-title"><b>Calories :</b> <small>${data[0].calories}gm</small></h3>
                                        <h6 class="card-title"><b>Ingredients :</b></h6>
                                        <ul>
                                            ${ingredients}
                                        </ul>
                                        <h6 class="card-title"><b>See Recipe Instructions At :</b>
                                            <a href="${data[0].url}">instructions</a>                                        
                                        </h6>
                                        <a href="#" onclick="goBack()" id="see-full-recipe" class="btn btn-primary">Back</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById("single-recipe-result").style.display = "flex";
                document.getElementById("single-recipe-result").innerHTML = element;
                document.getElementById("recipe-result").style.display = "none";
    });

}
function goBack() {
    document.getElementById("recipe-result").style.display = "flex";
    document.getElementById("single-recipe-result").style.display = "none";
}