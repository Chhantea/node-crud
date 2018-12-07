$(document).ready(function(){
    var item = new Vue({
        el: "#app-2",
        data: {
            items: [],
            // item: {
            //     name: '',
            //     details: ''
            // },
            errors: {}
        },
        mounted: function() {   //ready in v1 mounted in v2
            var that; //pawimawh
            // that = this;
                axios.get('/api/item')
                    .then(response => {
                        console.log(response)
                        this.items = response.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

    });
});