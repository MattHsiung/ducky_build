'use strict';

app.factory('CategoryFactory', function($http) {
    return {
        fetchAllCategories: function (){
            return $http.get('/api/categories/')
                .then(response => response.data)
        },
        fetchOneCategory: function (categoryId){
            return $http.get('/api/categories/' + categoryId)
                .then(response => response.data)
        },
        updateCategory: function (categorytoUpdate){
            return $http.put('/api/categories/' + categoryId, categoryToUpdate)
                .then(response => response.data)
        },
        createCategory: function (categoryToCreate){
            return $http.post('/api/categories/', categoryToCreate)
                .then(response => response.data)
        },
        deleteCategory: function (categoryId){
            return $http.delete('/api/categories/' + categoryId)
                .then(response => response.data)
        }
    }
})
