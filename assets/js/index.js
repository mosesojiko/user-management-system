$("#add-user").submit(function(event){
     alert("Data inserted successfully")
})

//update a user
$("#update-user").submit(function(event){
     event.preventDefault();
    //return all the data in the form
    var unindexed_array = $("#update-user").serializeArray();
    //map through the data
    var data = {};
    $.map(unindexed_array, function(n,i){
      data[n['name']] = n['value']
    })
    console.log(data)
    //pass the data to the put request for update
    var request = {
         "url": `http://localhost:3000/api/users/${data.id}`,
         "method": "PUT",
         "data": data
    }
    $.ajax(request).done(function(response){
         alert("Data updated successfully")
    })
   
})

//delete a user
if(window.location.pathname == '/'){
     $ondelete = $(".table tbody td a.delete");
     $ondelete.click(function(){
          var id = $(this).attr('data-id')

          var request = {
               "url": `http://localhost:3000/api/users/${id}`,
               "method": "DELETE",
          }

          //confirm before delete
          if(confirm("Do you really want to delete this record?")){
               $.ajax(request).done(function(response){
                    alert("Data deleted successfully")
                    location.reload()
               })

          }
     })
}