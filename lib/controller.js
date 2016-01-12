const async = require('async')
const TROJAN = require('./TROJAN')

var exports = module.exports = {}

function watchUpdate(list,cb){

	TROJAN.sect(function(obj){
		if(obj.number_registered < obj.spaces_available){
			cb(true,obj.number_registered,obj.spaces_available)
		} else {
			cb(false,obj.number_registered,obj.spaces_available)
		}
	},{course: list[0],sect: list[1]})

}

exports.s = function(watchList,callback){
	async.each(watchList,function(list){
		watchUpdate(list,function(c,reg,spac){
			callback(list[0],list[1],c,reg,spac)
		})
	})
}