require('malta').checkDeps('epub-gen', 'markdown');

var epub = require('epub-gen')
	markdown = require('markdown').markdown,
	path = require('path'),
	fs = require('fs');

function malta_pug(o, options) {
	var self = this,
		start = new Date(),
		msg,
		oldname = o.name,
		baseDir = path.dirname(self.tplPath),
        pluginName = path.basename(path.dirname(__filename)),
        data = JSON.parse(o.content),
        i = 0, l = data.content.length,
        contents = [];

    fs.unlink(o.name);
	
	o.name = o.name.replace(/json$/, 'epub');

	for (null; i < l; i++) {
		try {
			self.listen(baseDir + '/' + data.content[i].data);
			data.content[i].data = markdown.toHTML(fs.readFileSync(baseDir + '/' + data.content[i].data) + "");
		} catch (e) {
			data.content[i].data = "**NO CONTENT FOUND**";
		}
	}

	return function (solve, reject){

		new epub(data, o.name).promise.then(function(){
	        msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			solve(o);
			self.notifyAndUnlock(start, msg);
	   	}, function(err){
	        self.doErr(err, o, pluginNamee);
	    });
	};

}
malta_pug.ext = ['json'];
module.exports = malta_pug;