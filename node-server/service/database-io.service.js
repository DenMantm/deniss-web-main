var blogPost = require('../database/models/blog-post');
var userImage = require('../database/models/user-image');
var snippetGroup = require('../database/models/snippet-group');
var templateItemList = require('../database/models/page-item-list');
var page = require('../database/models/page');
var pageService = require('../service/page.service');



//IMAGES

exports.getImageList = function(req, res) {

    userImage.find({}).exec(function(err, userImage) {
        if (!err)
            res.json(userImage);
        else {
            return res.send(500, { error: err });
        }
    });
}



// ~~~~~~~~~~~~~~~~~ BLOG POSTS SECTION

exports.createNewBlogPost = function(req, res) {
    var newBlogPost = new blogPost();

    //mapping the values=
    newBlogPost.title = req.body.title;
    newBlogPost.description = req.body.description;
    newBlogPost.date = Date();
    newBlogPost.author = req.user.username;
    newBlogPost.blogElements = req.body.blogElements;
    newBlogPost.isPosted = false;
    newBlogPost.isDeleted = false;
    newBlogPost.background = {"color":"","image":"app/assets/bootstrap-templates/blog-template/post-bg.jpg"}

    newBlogPost.save(function(err, blog) {
        if (err)
            return res.send(2, { error: err });
        else
            res.json(blog);
    });

}
exports.getBlogPostList = function(req, res) {

    //logic that specifies if user is logged in or not and then returning drafts or not..

    blogPost.find({ isDeleted: false }).select({ title: 1, date: 1, author: 1, description: 1 }).sort('-date').exec(function(err, blogList) {
        if (!err)
            res.json(blogList);
        else {
            return res.send(500, { error: err });
        }
    });

}


exports.getBlogPost = function(req, res) {
    blogPost.findOne({ '_id': req.query.blogId }, function(err, blog) {

        if (err) {
            return res.send({ error: err });
        }
        else if (!blog) {
            res.send('Error, blog post does not exist');
        }
        else res.json(blog);


    });
}
exports.editBlogPost = function(req, res) {
    //delete req.body._id;
    var query = { '_id': req.body._id };
    delete req.body._id;
    delete req.body.author;


    blogPost.findOneAndUpdate(query, req.body, { upsert: true }, function(err, doc) {
        if (err)
            return res.send({ error: err });
        else if (!doc) {
            res.send('Error, blog post does not exist');
        }
        else return res.send("succesfully saved");
    });

}



//~~~~~~~~~~~~~~~~~~~~~~~~ SNIPPETS SECTION
// /snippetGroup
exports.createSnippetGroup = function(req, res) {
    var tmpId;
    snippetGroup.findOne({}).sort('-id').exec(function(err, doc) {
        if (!doc) { tmpId = 0 }
        else tmpId = doc.id + 1;
        console.log(doc);
        var newSnippetGroup = new snippetGroup();
        newSnippetGroup.id = tmpId;
        newSnippetGroup.group = newSnippetGroup.nextGroup();
        newSnippetGroup.groupName = req.body.groupName;
        newSnippetGroup.shortDescription = req.body.shortDescription;
        newSnippetGroup.snippets = [];
        newSnippetGroup.isDeleted = false;

        newSnippetGroup.save(function(err, blog) {
            if (err)
                res.send(err);
            else
                res.json(blog);
        });

    });

};
exports.getSnippetGroupList = function(req, res) {
    snippetGroup.find({ isDeleted: false }).select({ id: 1, group: 1, groupName: 1, snippetCounter: 1 }).sort('id').exec(function(err, snippetList) {
        if (!err)
            res.json(snippetList);
        else {
            return res.send(500, { error: err });
        }
    });
};
exports.saveSnippetGroup = function(req, res) {
    var query = { '_id': req.body._id };
    delete req.body._id;

    //adding snippet counter here for convenience
    if (req.body.snippets) {
        req.body.snippetCounter = req.body.snippets.length;
    }


    snippetGroup.findOneAndUpdate(query, req.body, { upsert: true }, function(err, doc) {
        if (err)
            return res.send({ error: err });
        else if (!doc) {
            res.send('Error, blog post does not exist');
        }
        else return res.send(doc);
    });


};

exports.getSnippetGroup = function(req, res) {

    snippetGroup.findOne({ 'id': req.query.snippetId }, function(err, sGroup) {

        if (err) {
            return res.send({ error: err });
        }
        else if (!sGroup) {
            // res.status(404)
            // res.send('Error, blog post does not exist');
            res.send({});
        }
        else res.json(sGroup);

    });

};


exports.deleteSnippetGroup = function(req, res) {};
exports.moveUpSnippetGroup = function(req, res) {};
exports.moveDownSnippetGroup = function(req, res) {};



//Page templating, get items depending on category??

exports.getTemplateItemList = function(req, res) {
    templateItemList.find({}).exec(function(err, templateItemList) {
        if (!err)
            res.json(templateItemList);
        else {
            return res.send(500, { error: err });
        }
    });
}


exports.createTemplateItemListItem = function(req, res) {
    var newTemplateItemList = new templateItemList();
    //mapping the values=
    newTemplateItemList.itemName = "Name1";

    newTemplateItemList.save(function(err, item) {
        if (err)
            return res.send(2, { error: err });
        else
            res.json(item);
    });
}

exports.getPageData = function(req, res) {
    page.findOne({ 'pageType': req.query.pageType }, function(err, p) {

        if (err) {
            return res.send({ error: err });
        }
        else if (!p) {

            // res.status(404)
            // res.send('Error, blog post does not exist');
            res.send({ error: "No page " + req.query.itemPage + " found..." });
        }
        else res.json(p);
    });
}
exports.savePageModel = function(req, res) {

}


exports.saveNavBar = function(req, res) {

    page.findOneAndUpdate({ "pageType": "titlepage" }, { "navbarElement": req.body }, { upsert: true }, function(err, p) {
        if (err)
            return res.send({ error: err });
        else if (!p) {
            res.send('Error, no title page found');
        }
        else {
            //assemble page from the model
            p.navbarElement = req.body;

            res.json(p);
        };
    });

}

exports.saveBlogSection = function(req, res) {

    page.findOneAndUpdate({ "pageType": "titlepage" }, { "blog": req.body }, { upsert: true }, function(err, p) {
        if (err)
            return res.send({ error: err });
        else if (!p) {
            res.send('Error, no title page found');
        }
        else {
            //assemble page from the model
            p.blog = req.body;

            res.json(p);
        };
    });

}

exports.saveSnippetSection = function(req, res) {

    page.findOneAndUpdate({ "pageType": "titlepage" }, { "snippet": req.body }, { upsert: true }, function(err, p) {
        if (err)
            return res.send({ error: err });
        else if (!p) {
            res.send('Error, no title page found');
        }
        else {
            //assemble page from the model
            p.blog = req.body;

            res.json(p);
        };
    });

}



exports.getNavBar = function(req, res) {

    page.findOne({ 'pageType': "titlepage" }, function(err, p) {

        if (err) {
            return res.send({ error: err });
        }
        else if (!p) {

            // res.status(404)
            // res.send('Error, blog post does not exist');
            res.send({ error: "No page " + req.query.itemPage + " found..." });
        }
        else res.json(p.navbarElement);
    });
}

exports.getFooter = function(req, res) {
    
    page.findOne({ 'pageType': "titlepage" }, function(err, p) {

        if (err) {
            return res.send({ error: err });
        }
        else if (!p) {

            // res.status(404)
            // res.send('Error, blog post does not exist');
            res.send({ error: "No page " + req.query.itemPage + " found..." });
        }
        else res.json(p.footer);
    });
}


exports.changePageAlignment = function(req, res) {
    //adding snippet counter here for convenience


    page.findOneAndUpdate({ "pageType": req.body.pageType }, { "pageData": req.body.data }, { upsert: true }, function(err, p) {
        if (err)
            return res.send({ error: err });
        else if (!p) {
            res.send('Error, no title page found');
        }
        else {
            //assemble page from the model
            p.pageData = req.body.data;
            var pageTemplate = pageService.assembleTemplate(p);

            //write the page content to the disk...
            if (req.body.pageType == 'titlepage')
                pageService.writeToDisk('/../../app/title-page/templates/generated-title-page.html', pageTemplate);
            else
                pageService.writeToDisk('/../../app/other-pages/' + req.body.pageType + '/simple-page.component.html', pageTemplate);

            res.json(p);
        };
    });


}


exports.savePageModel = function(req, res) {
    //adding snippet counter here for convenience


    page.findOneAndUpdate({ "pageType": req.body.pageType }, { "pageData": req.body.data }, { upsert: true }, function(err, p) {
        if (err)
            return res.send({ error: err });
        else if (!p) {
            res.send('Error, no title page found');
        }
        else {
            //assemble page from the model
            p.pageData = req.body;
            res.json(p);
        };
    });

}


//INITIALIZATION PART, WHERE WE CREATE NEW APPLICATION FOR THE USER....

exports.initializeTitlePage = function(req, res) {

    page.find({ "pageType": "titlepage" }).remove().exec();

    //producing template of the title page

    let dataAgencyService = [{
            sequence: 0,
            icon: 'fa-shopping-cart',
            heading: 'E-Commerce',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        }, {
            sequence: 1,
            icon: 'fa-laptop',
            heading: 'Responsive Design',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. '
        },
        {
            sequence: 2,
            icon: 'fa-lock',
            heading: 'Web Security',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
        }
    ];

    let dataCreativeHeadder = {
        "title": "Your Favorite Source of Free Bootstrap Themes",
        "subtitle": "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
        "background": "./app/assets/bootstrap-templates/img-tmp1/header.jpg",
        "buttonLink": {
            "isEnabled":true,
            "link": { "page": "/title-page", "slideTo": "#agency-amazing-team6" },
            "buttonText": "Meet the team",
            "isExternam": false
        }
    };

    let dataAgencyHeadder = {
        "title": "Your Favorite Source of Free Bootstrap Themes",
        "subtitle": "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
        "background": "./app/assets/bootstrap-templates/img-tmp2/header-bg.jpg",
        "buttonLink": {
            "isEnabled":true,
            "link": { "page": "/title-page", "slideTo": "#agency-amazing-team6" },
            "buttonText": "Meet the team",
            "isExternam": false
        }
    };

    let dataCreativeService = [{
            sequence: 0,
            icon: 'fa-diamond',
            heading: 'Sturdy Templates',
            text: 'Our templates are updated regularly so they dont break.'
        },
        {
            sequence: 1,
            icon: 'fa-paper-plane',
            heading: 'Ready to Ship',
            text: 'You can use this theme as is, or you can make changes!'
        },
        {
            sequence: 2,
            icon: 'fa-newspaper-o',
            heading: 'Up to Date',
            text: 'We update dependencies to keep things fresh.'
        },
        {
            sequence: 3,
            icon: 'fa-heart',
            heading: 'Made with Love',
            text: 'You have to make your websites with love these days!'
        }
    ];

    let dataCreativePortfolio = [{
            "title": "Threads",
            "subtitle": "Illustration",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/1.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Explore",
            "subtitle": "Graphic Design",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/2.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Finish",
            "subtitle": "Identity",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/3.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },

        {
            "title": "Lines",
            "subtitle": "Branding",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/4.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Southwest",
            "subtitle": "Website Design",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/5.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Window",
            "subtitle": "Photography",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/6.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        }
    ];


    let dataAgencyPortfolio = [{
            "title": "Threads",
            "subtitle": "Illustration",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-thumbnail.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Explore",
            "subtitle": "Graphic Design",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-thumbnail.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Finish",
            "subtitle": "Identity",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-thumbnail.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },

        {
            "title": "Lines",
            "subtitle": "Branding",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-thumbnail.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Southwest",
            "subtitle": "Website Design",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-thumbnail.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        },
        {
            "title": "Window",
            "subtitle": "Photography",
            "smallImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-thumbnail.jpg" },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": { "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg" },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        }
    ];
    let dataAgencyAmazingTeam = [{ "title": "Kay Garland", "subtitle": "Lead Designer", "img": "app/assets/bootstrap-templates/img-tmp2/team/1.jpg" },
        { "title": "Larry Parker", "subtitle": "Lead Marketer", "img": "app/assets/bootstrap-templates/img-tmp2/team/2.jpg" },
        { "title": "Diana Pertersen", "subtitle": "Lead Developer", "img": "app/assets/bootstrap-templates/img-tmp2/team/3.jpg" }
    ];
    let dataAgencyAbout = [{ "title": "2009-2011 Our Humble Beginnings", "subtitle": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!", "img": "app/assets/bootstrap-templates/img-tmp2/about/1.jpg" },
        { "title": "March 2011 An Agency is Born", "subtitle": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!", "img": "app/assets/bootstrap-templates/img-tmp2/about/2.jpg" },
        { "title": "December 2012 Transition to Full Service", "subtitle": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!", "img": "app/assets/bootstrap-templates/img-tmp2/about/3.jpg" },
        { "title": "July 2014 Phase Two Expansion", "subtitle": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!", "img": "app/assets/bootstrap-templates/img-tmp2/about/4.jpg" }
    ];
    let dataAgencyFooter = "";
    let dataAgencyNavbar = {
        "additionalElements": [{
            "page": "/title-page",
            "elements": [{
                    "navName": "Services",
                    "slideTo": "#agency-service1"
                },
                {
                    "navName": "Services",
                    "slideTo": "#creative-service2"
                },
                {
                    "navName": "Portfolio",
                    "slideTo": "#creative-portfolio3"
                },
                {
                    "navName": "HEadder",
                    "slideTo": "#agency-headder4"
                },
                {
                    "navName": "Portfolio",
                    "slideTo": "#agency-portfolio5"
                },
                {
                    "navName": "Team",
                    "slideTo": "#agency-amazing-team6"
                },
                {
                    "navName": "About",
                    "slideTo": "#agency-about7"
                }
            ]
        }],
        "title": "Template"
    };


    //     <layout-editor *ngIf="loginCheck() && showElementTools" ></layout-editor>
    //     <agency-nav></agency-nav>
    //     <creative-headder [showElementTools]="showElementTools"></creative-headder>
    //     <agency-service [showElementTools]="showElementTools"></agency-service>
    //     <creative-service [showElementTools]="showElementTools"></creative-service>
    //     <creative-portfolio [showElementTools]="showElementTools"></creative-portfolio>
    //     <agency-headder [showElementTools]="showElementTools" ></agency-headder>
    //     <agency-portfolio [showElementTools]="showElementTools" ></agency-portfolio>
    //     <agency-amazing-team [showElementTools]="showElementTools" ></agency-amazing-team>
    //     <agency-about [showElementTools]="showElementTools"></agency-about>
    //     <footer-component></footer-component>

    var p = new page();
    p.pageName = "Title Page";
    p.blog = {
            "isActive": true,
            "background": {
                "color": "",
                "image": "app/assets/bootstrap-templates/blog-template/home-bg.jpg"
            },
            "data": "",
            "title": {
                "title": "Blog",
                "subtitle": "A Clean Blog",
                "background": "app/assets/bootstrap-templates/blog-template/home-bg.jpg",
                "buttonLink": "#"
            },
            "elementSequence": 0,
            "elementTmpType": "headder",
            "navName": "Headder",
            "includeInNav": false,
            "elementTmpName": "blog-headder"
        },

        p.navbarElement = {
            "elementTmpName": "agency-nav",
            "elementTmpType": "nav",
            "elementSequence": "",
            "enableBlog": true,
            "title": { "title": "title", "subtitle": "subtitle" },
            "data": dataAgencyNavbar,
            "background": { "color": "", "image": "" }
        };
    p.footer = {
        "elementTmpName": "agency-footer",
        "elementTmpType": "footer",
        "elementSequence": '',
        "title": { "title": "title", "subtitle": "subtitle" },
        "data": dataAgencyFooter,
        "background": { "color": "", "image": "" }
    };
    p.pageType = "titlepage";
    p.pageData = [{
            "elementTmpName": "creative-headder",
            "includeInNav": false,
            "navName": "Headder",
            "elementTmpType": "headder",
            "elementSequence": 0,
            "title": { "title": "Freshly brewed page", "subtitle": "welcome, please take a look what you can do with CMS Lite" },
            "data": dataCreativeHeadder,
            "background": { "color": "", "image": "app/assets/bootstrap-templates/img-tmp1/header.jpg" }
        },
        {
            "elementTmpName": "agency-service",
            "includeInNav": true,
            "navName": "Services",
            "elementTmpType": "service",
            "elementSequence": 1,
            "title": {
                "title": "Services",
                "subtitle": "Lorem ipsum dolor sit amet consectetur."
            },
            "data": dataAgencyService,
            "background": { "color": "", "image": "" }
        },
        {
            "elementTmpName": "creative-service",
            "includeInNav": true,
            "navName": "Services",
            "elementTmpType": "service",
            "title": { "title": "title", "subtitle": "subtitle" },
            "elementSequence": 2,
            "data": dataCreativeService,
            "background": { "color": "", "image": "" }
        },
        {
            "elementTmpName": "creative-portfolio",
            "includeInNav": true,
            "navName": "Portfolio",
            "elementTmpType": "portfolio",
            "elementSequence": 3,
            "title": { "title": "title", "subtitle": "subtitle" },
            "data": dataCreativePortfolio,
            "background": { "color": "", "image": "" }
        },
        {
            "elementTmpName": "agency-headder",
            "includeInNav": true,
            "navName": "HEadder",
            "elementTmpType": "headder",
            "elementSequence": 4,
            "title": { "title": "titlex", "subtitle": "saddsaew" },
            "data": dataAgencyHeadder,
            "background": { "color": "", "image": "app/assets/bootstrap-templates/img-tmp2/header-bg.jpg" }
        },
        {
            "elementTmpName": "agency-portfolio",
            "includeInNav": true,
            "navName": "Portfolio",
            "elementTmpType": "portfolio",
            "elementSequence": 5,
            "title": { "title": "titlex", "subtitle": "saddsaew" },
            "data": dataAgencyPortfolio,
            "background": { "color": "", "image": "" }
        },
        {
            "elementTmpName": "agency-amazing-team",
            "includeInNav": true,
            "navName": "Team",
            "elementTmpType": "team",
            "elementSequence": 6,
            "title": { "title": "OUR AMAZING TEAM", "subtitle": "Lorem ipsum dolor sit amet consectetur." },
            "data": dataAgencyAmazingTeam,
            "background": { "color": "", "image": "" }
        },
        {
            "elementTmpName": "agency-about",
            "includeInNav": true,
            "navName": "About",
            "elementTmpType": "about",
            "elementSequence": 7,
            "title": { "title": "ABOUT", "subtitle": "Lorem ipsum dolor sit amet consectetur." },
            "data": dataAgencyAbout,
            "background": { "color": "", "image": "" }
        }
    ];
    p.title = "Title Page";
    p.includeInNav = false;

    p.save(function(err, p) {
        if (err)
            return res.send({ error: err });
        else {
            //assemble page from the model
            var pageTemplate = pageService.assembleTemplate(p);
            //write the page content to the disk...
            pageService.writeToDisk('/../../app/title-page/templates/generated-title-page.html', pageTemplate);
            
            
            
            // setTimeout(()=>{
                res.json(p);
                // }, 3000);
            
            
            
        }
    });
} //end of new title page generation block
