$(document).ready(function(){
	Vue.component('item-row', {
  template: '#item-row',
  props: {
    item: Object
  },
   data: function () {
    return {
      editMode: false,
      errors: {}
    }
  },
  methods: {
      removeItem: function(){
    var that = this
    $.ajax({
      method: 'DELETE',
      url: '/api/item/' + that.item.id,
      success: function(res){
        that.$remove()
      }
    })
  },
    // ajax call for updating an Item
    updateItem: function () {
      var that = this;
      $.ajax({
        method: 'PUT',
        data: {
          item: that.item,
        },
        url: '/api/item/' + that.item.id,
        success: function(res) {
          that.errors = {}
          that.item = res
          that.editMode = false
        },
        error: function(res) {
          that.errors = res.responseJSON.errors
        }
      })
    }
  },

  })




var item = new Vue({
	el: "#app",
	data: {
		items: [],
		item: {
			name: '',
			details: ''
		},
		errors: {}
	},
	mounted: function() {
		var that; //pawimawh
		that = this;
		$.ajax({
        url: '/api/item',
        success: function(res) {
          that.items = res
        },
        errror: function(res){
          that.errors = res.responseJSON.errors
        }
      });
	},
	methods: {
    createItem: function () {
      var that = this;
      $.ajax({
        method: 'POST',
        data: {
          item: that.item,
        },
        url: '/api/item',
        success: function(res) {
          that.errors = {}
          that.items.push(res);
          that.item.name = "";
          that.item.details = "";
        },
        error: function(res) {
          that.errors = res.responseJSON.errors
        }
      })
    }
  }
   });
});