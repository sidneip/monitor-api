var mongoose = require( 'mongoose' );

var websiteSchema = new mongoose.Schema({
 uri: String,
});
mongoose.model( 'Website', websiteSchema );

mongoose.connect( 'mongodb://localhost/websites' );
