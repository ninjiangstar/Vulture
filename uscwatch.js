const async = require('./async.js')
const TROJAN = require('./TROJAN.js')

function watchUpdate(list,date,callback){

	function coursewatch(course,sect,callback){
		TROJAN.sect(function(obj){
			if(obj.number_registered < obj.spaces_available){
				callback(course,sect,true)
			} else {
				callback(course,sect,false)
			}
		},{course: course,sect: sect})
	}

	coursewatch(list[0],list[1],function(c,s,b){
		console.log(date)
		if(b){
			callback(course,sect)
			console.log(c + "/" + s + " OPEN.")
		}
		else console.log(c + "/" + s + " CLOSED.")
	})

}

exports.USCWatch = function(watchList,date){
	async.each(watchList,function(list){
		watchUpdate(list,date,function(course,sect){
			// do nothing yet...
		})
	})
}