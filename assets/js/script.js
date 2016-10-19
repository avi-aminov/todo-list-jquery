var App = (function () {
    'use strict';
    var privateMethod = function () {};
    
    var makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    
    var htmlTask = function (id, text, checked) {
        return '<li id="id-'+id+'" class="task-wrap"><div class="checkbox"> <label> <input class="checkbox-task" type="checkbox" value="" '+ (checked ? "checked" : "") +'><apan class="task-text '+ (checked ? "is_checked" : "") +'">'+ text +' </span> </label>  <button type="button" class="btn btn-default delete-task"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></li>';
    };
    
    var data = [];
    
    return {
        
        init: function(){
            
        },

        addNewTask: function(val){
            
            data.push({
                    id:makeid(),
                    text:val,
                    is_checked: true });
            
            jQuery('#task-list').html("");
            data.forEach(function (value, key) {
                console.log(value);
                jQuery('#task-list').append(htmlTask(value.id, value.text, value.is_checked));
            });
            jQuery('#add-task-input').val("");
        },
    };
    
})();


jQuery('#add-task-btn').click(function(){
    var taskValue = jQuery('#add-task-input').val();
    if(taskValue != ''){
        App.addNewTask(taskValue);
    }
});


jQuery( "#task-list" ).on( "click", ".checkbox-task", function() {
    var _this = jQuery(this);
    var is_checked = _this.is(':checked');   
    var _wrap = _this.closest(".task-wrap");
    var _label = _wrap.find('.task-text');

    _label.toggleClass("is_checked", is_checked);
});

