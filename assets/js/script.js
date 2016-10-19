var App = (function () {

    var privateMethod = function () {};
    
    var htmlTask = function (taskValue) {
        return '<li class="task-wrap"><div class="checkbox"> <label> <input class="checkbox-task" type="checkbox" value="">  '+ taskValue +'  </label>  <button type="button" class="btn btn-default delete-task"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></li>';
    };
    
    return {
        
        init: function(){
            
        },

        addNewTask: function(val){
            jQuery('#task-list').append(htmlTask(val));
        },
    };
    
})();




jQuery('#add-task-btn').click(function(){
    var taskValue = jQuery('#add-task-input').val();
    if(taskValue != ''){
        App.addNewTask(taskValue);
    }
});
