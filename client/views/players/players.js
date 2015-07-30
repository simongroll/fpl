Template.player_photo.helpers({

    photo_link: function() {
        if (this.photo) return "http://cdn.ismfg.net/static/plfpl/img/shirts/photos/" + this.photo;
        return "http://lorempixel.com/50/50/sports"
    },
    name: function() {
        return this.name;
    },
    id: function() {
        return this._id;
    }

});
