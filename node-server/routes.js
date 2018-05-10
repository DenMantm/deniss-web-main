var auth = require('./auth'),
  path = require('path');

var fs = require('fs');

var dbIO = require('./service/database-io.service');
var fileUpload = require('./service/file-upload.service');
var pageService = require('./service/page.service');

module.exports = function(app) {
  //Custom paths
    app.get('/projects', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
  //Title page API Here...
  
  //Getting the list of avalible elements that we can put on the template...
  app.get('/api/getTemplateItemList', dbIO.getTemplateItemList);
  app.get('/api/createTemplateItemListItem', dbIO.createTemplateItemListItem);
  
  //tittle page manipulations
  app.post('/api/changeTitlePageAlignment', dbIO.changeTitlePageAlignment);
  app.post('/api/saveTitlePageModel', dbIO.saveTitlePageModel);
  
  app.get('/api/initializeTitlePage', dbIO.initializeTitlePage);
  
  
  
  //manipulating images
  app.get('/api/getImageList', dbIO.getImageList);
  app.post('/api/upload', fileUpload.uploadImg);
  
  
  //create new pages here
  app.post('/api/generateNewPage', pageService.addSimplePage);
  
  //app.post('/api/getSimplePage',dbIO.getSimplePage);
  
  //app.get('/api/getTitlePageData',dbIO.getTitlePageData);
  
  //Blog Post Section
  
      app.get('/blog-posts', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
        app.get('/blog-posts/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
    app.post('/api/createNewBlogPost', dbIO.createNewBlogPost);
    app.post('/api/editBlogPost', dbIO.editBlogPost);
    app.get('/api/getBlogPostList', dbIO.getBlogPostList);
    app.get('/api/getBlogPost', dbIO.getBlogPost);
  
  
  //Snippet section
    app.post('/api/createSnippetGroup', dbIO.createSnippetGroup);
    app.post('/api/saveSnippetGroup', dbIO.saveSnippetGroup);
    app.get('/api/getSnippetGroupList', dbIO.getSnippetGroupList);
    app.get('/api/getSnippetGroup', dbIO.getSnippetGroup);
    
    
    //page templates and related
   // app.get('/api/getTemplateItemList', dbIO.getTemplateItemList);
    app.get('/api/getPageData', dbIO.getPageData);
    
    //app.post('/api/savePageData', dbIO.savePageData);
  
  
  
  

  //snippet-repository
    app.get('/snippet-repository', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
      app.get('/snippet-repository/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
    app.get('/title-page', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
  //all user created pages
      app.get('/pages/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });


  //API
  //USER LOGIN
  app.post('/api/login', auth.authenticate);
  app.get('/api/currentIdentity', auth.getCurrentIdentity);
  
  //USER SIGNUP
  app.post('/api/signup', auth.signup);
  
  app.get('/api/logout', function(req, res) {
    req.logout();
    res.end();
  });


  app.get('/app/*', function(req, res) {
    res.sendStatus(404);
  });
  
  app.get('/node_modules/*', function(req, res) {
    res.sendStatus(404);
  });

    app.get('/node-server/*', function(req, res) {
    res.sendStatus(404);
  });

  app.get('*', function(req, res) {
    console.log('404 error', req.path);
    res.sendStatus(404);
  });


  app.get('/404', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });


}


// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.send({error:"You are not logged in"});
}