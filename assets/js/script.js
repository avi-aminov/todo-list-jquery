/*!
 * @author: Avi Aminov
 */
/* Todo list with jQuery (very simple code) */

var App = (function () {
    'use strict';
    
    var data = [];
    var localStorageKey = 'todo-list';
    
    var makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    
    var htmlTask = function (id, text, checked) {
        return '<li id="'+id+'" class="task-wrap"><div class="checkbox"> <label> <input class="checkbox-task" type="checkbox" value="" '+ (checked ? "checked" : "") +'><apan class="task-text '+ (checked ? "is_checked" : "") +'">'+ text +' </span> </label>  <button type="button" class="btn btn-default delete-task"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></li>';
    };
     
    var setlocalStorageParameter = function(data) {
        localStorage.setItem(localStorageKey , JSON.stringify(data));
    };
    
    var getlocalStorageParameter = function() {
       return JSON.parse(localStorage.getItem(localStorageKey));
    };
      
    return {
        init: function() {
            if(getlocalStorageParameter()) {
                data = getlocalStorageParameter();
            }
        },
        
        addNewTask: function(val) {
            data.push(
                {
                    id:makeid(),
                    text:val,
                    is_checked: false 
                }
             );
            jQuery('#task-list').html("");
            data.forEach(function (value, key) {
                console.log(value);
                jQuery('#task-list').append(htmlTask(value.id, value.text, value.is_checked));
            });
            jQuery('#add-task-input').val("");
            setlocalStorageParameter(data);
        },
        
        toggleCheckedTask: function(id) {
            for(var i=0; i < data.length; i++){
                if(data[i].id == id) {
                    //data.splice(i,1);
                    data[i].is_checked = !data[i].is_checked;
                    setlocalStorageParameter(data);
                    return false;
                }
            }
        }, 
        
        toggleDeleteTask: function(id) {
            for(var i=0; i < data.length; i++){
                if(data[i].id == id) {
                    data.splice(i,1);
                    setlocalStorageParameter(data);
                    return false;
                }
            }
        },
        
        getData: function() {
            return data;
        },
        
        updateToDoList: function() {
            jQuery('#task-list').html("");
            data = getlocalStorageParameter();
            if(data){
                data.forEach(function (value, key) {
                    console.log(value);
                    jQuery('#task-list').append(htmlTask(value.id, value.text, value.is_checked));
                });
            }
        },
    };
})();

App.init();
App.updateToDoList();

jQuery('#add-task-btn').click(function() {
    var taskValue = jQuery('#add-task-input').val();
    if(taskValue != ''){
        App.addNewTask(taskValue);
    }
});

jQuery( "#task-list" ).on( "click", ".checkbox-task", function() {
    var _this = jQuery(this),
        is_checked = _this.is(':checked'),  
        _wrap = _this.closest(".task-wrap"),
        id = _wrap.attr('id'),
        _label = _wrap.find('.task-text');
    _label.toggleClass("is_checked", is_checked);
    App.toggleCheckedTask(id);
    App.updateToDoList();
});

jQuery( "#task-list" ).on( "click", ".delete-task", function() {
    var _this = jQuery(this),
        is_checked = _this.is(':checked'),  
        _wrap = _this.closest(".task-wrap"),
        id = _wrap.attr('id');
    App.toggleDeleteTask(id);
    App.updateToDoList();
});
