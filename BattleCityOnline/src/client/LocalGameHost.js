define([
	"dojo/_base/declare",

	"dojo/Deferred",

	"bco-client/_GameHost"
], function (
	declare,

	Deferred,

	_GameHost) {

	return declare([_GameHost], {
		waiting: false,
		_started: false,
		_turns: null,

		sendCommands: function(commands) {
			var dfd = new Deferred();
			
			this.waiting = true;

			if (commands.some(function (command) {
				return command.name === "START";
			})) {
				this._started = true;
			}

			setTimeout(function () {
				dfd.resolve(this._started ? commands.filter(function (command) { return !!command.target; }) : []);
				this.waiting = false;		
			}.bind(this), 40);

			return dfd.promise;
		}
	});	
});