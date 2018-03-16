const env = process.env.NODE_ENV || 'development';

if ( env === "test" ) {
	process.env.MONGODB_URI = 'mongodb://localhost:27017/testHeroApp';
}
else  {
	process.env.MONGODB_URI = 'mongodb://localhost:27017/HeroApp';
}
