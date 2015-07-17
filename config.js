module.exports = {
	'port': process.env.PORT || 8080,
	//'database': 'mongodb://john:john@apollo.modulusmongo.net:27017/ubU8texe',
	//'database': 'mongodb://john:john@ds045882.mongolab.com:45882/hackrfarm',
	'database': process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',
	 'superSecret': 'ilovescotchscotchyscotchscotch'
//http://localhost:8080/auth/linkedin/callback
	//mongodb://<user>:<pass>@apollo.modulusmongo.net:27017/ubU8texe
};