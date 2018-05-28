var fs = require('fs-extra');
var page = require('../database/models/page');
var addedPage = require('../database/models/added-page');
var pageService = require('./page.service');


exports.generateTitlePage = function() {

    return null;
}


let rewritePageContent = function() {}



exports.removeSimplePage = function(req, res) {

    let pageType = req.body.pageType;

    if (pageType == 'titlepage') {
        res.json({ error: "cannot delete titlepage..." });
        return;
    }

    try {
        eraseFiles(pageType);
    }
    catch (e) {
        eraseFiles(pageType);
    }

    //remove database entry
    page.find({ "pageType": pageType }).remove().exec();

    //remove nav entry
    page.findOne({ 'pageType': "titlepage" }, function(err, pg) {

        if (err) {
            return res.send({ error: err });
        }
        else if (!pg) {

            // res.status(404)
            // res.send('Error, blog post does not exist');
            res.send({ error: "No page " + req.query.itemPage + " found..." });
        }
        else {


            //res.json(pg.navbarElement);


            let searchCondition = '/pages/' + pageType;


            for (let i = 0; i < pg.navbarElement.data.additionalElements.length; i++) {
                if (pg.navbarElement.data.additionalElements[i].page == searchCondition) {

                    let deleteIndex = pg.navbarElement.data.additionalElements.indexOf(pg.navbarElement.data.additionalElements[i]);
                    pg.navbarElement.data.additionalElements.splice(deleteIndex, 1);

                }
            }


            page.findOneAndUpdate({ "pageType": "titlepage" }, { "navbarElement": pg.navbarElement }, { upsert: true }, function(err, ppp) {
                if (err)
                    return res.send({ error: err });
                else if (!ppp) {
                    res.send('Error, no title page found');
                }
                else {
                    //assemble page from the model

                    res.json(ppp);
                };
            });










        }
    });





}

function eraseFiles(pageType) {

    //1. Remove module from routes

    let routeAddition = `{path:'pages/${pageType}',component:pages.${pageType} ,canActivate:[LoggedInGuard],resolve:{userImageList:ImageResolverService,User:UserLoggedInResolver,pageModel:pages.SimplePageResolverService,titleNav:pages.SimplePageNavResolverService,titleFooter:pages.SimplePageFooterResolverService}},`
    let path = __dirname + '/../../app/other-pages/';


    let routeFile = readFile(path + '/../routes.ts');
    routeFile = routeFile.replace(routeAddition, '');
    writeFile(path + '/../routes.ts', routeFile);


    //2. Remove module from app.module
    let appModule = readFile(path + '/../app.module.ts');

    appModule = appModule.replace(`pages.${pageType},` + "\r\n", '')
    writeFile(path + '/../app.module.ts', appModule);


    //3. Remove module from index.ts
    let index = readFile(path + '/index.ts');
    let replaceString = "export * from './" + pageType + "/simple-page.component';" + "\r\n";
    index = index.replace(replaceString, '');

    writeFile(path + '/index.ts', index);


    //remove folder
    fs.removeSync(path + pageType);

}



exports.addSimplePage = function(req, res) {



    //check if page already exists or not


    //surround with try catch latter and add rollback functionality......


    console.log(req.body);

    //just in case
    let moduleName = req.body.navbarName.replace(/[^A-Z]+/ig, "").replace(/\s/g, "");

    console.log(moduleName)


    page.findOne({ 'pageType': moduleName }, (err, pge) => {

        if (err) {
            return res.send({ error: err });
        }
        //if does not exist allow generation
        else if (!pge) {
            //1. Copy and rename the folder
            let path = __dirname + '/../../app/other-pages/';
            let newname = moduleName;

            fs.copySync(path + 'template', path + newname);
            //copies directory, even if it has subdirectories or files
            //2. Rename module in module file
            let moduleFile = readFile(path + newname + '/simple-page.component.ts');
            let resFile = moduleFile.replace('TitlePageComponent', newname);
            writeFile(path + newname + '/simple-page.component.ts', resFile);

            //3. Add module to index.ts
            let index = readFile(path + '/index.ts');
            index = index + "export * from './" + newname + "/simple-page.component';" + "\r\n";
            writeFile(path + '/index.ts', index);

            //4. Adjust string path in configuration file

            let configuration = `export var componentData = 
                    {
                        templateUrl : "./app/other-pages/${newname}/simple-page.component.html",
                    	styleUrls :["./app/other-pages/shared/simple-page.component.css"]
                    }`
            writeFile(path + newname + '/configuration.ts', configuration);

            //4. Add module to app.module

            let appModule = readFile(path + '/../app.module.ts');

            appModule = appModule.replace('declarations:[', `declarations:[pages.${newname},` + "\r\n")
            writeFile(path + '/../app.module.ts', appModule);
            //5. Add module to routes

            let routeAddition = `{path:'pages/${newname}',component:pages.${newname} ,canActivate:[LoggedInGuard],resolve:{userImageList:ImageResolverService,User:UserLoggedInResolver,pageModel:pages.SimplePageResolverService,titlePageModel:TitlePageResolverService}},`

            let routeFile = readFile(path + '/../routes.ts');
            routeFile = routeFile.replace('];', '');
            routeFile += routeAddition + '];';
            writeFile(path + '/../routes.ts', routeFile);


            //generate page for database



            page.findOne({ 'pageType': "titlepage" }, (err, pa) => {

                if (err) {
                    return res.send({ error: err });
                }
                else if (!pa) {

                    // res.status(404)
                    // res.send('Error, blog post does not exist');
                    res.send({ error: "No page " + req.query.itemPage + " found..." });
                }
                else {





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


                    // let dataCreativeHeadder = {
                    //     "title": req.body.navbarName,
                    //     "subtitle": "simplePage",
                    //     "background": {color: "", image: "app/assets/bootstrap-templates/img-tmp1/header.jpg"},
                    //     "buttonLink": "#"
                    // };

                    let dataCreativeHeadder = {
                        "title": req.body.navbarName,
                        "subtitle": "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
                        "background": "./app/assets/bootstrap-templates/img-tmp1/header.jpg",
                        "buttonLink": {
                            "link": { "page": "/title-page", "slideTo": "#agency-amazing-team6" },
                            "buttonText": "Meet the team",
                            "isExternam": false,
                            "isEnabled":true
                        }
                    };

                    
                    let galleryTemplate = [
        {
            "elementTmpName": "creative-headder",
            "includeInNav": false,
            "navName": "Headder",
            "elementTmpType": "headder",
            "elementSequence": 0,
            "title": {
                "subtitle": "Subtitle here..",
                "title": "Gallery Template"
            },
            "data": {
                "buttonLink": {
                    "isEnabled":true,
                    "isExternam": false,
                    "buttonText": "Meet the team",
                    "link": {
                        "slideTo": "#agency-amazing-team6",
                        "page": "/title-page"
                    }
                },
                "background": "./app/assets/bootstrap-templates/img-tmp1/header.jpg",
                "subtitle": "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
                "title": "Gallery Template"
            },
            "background": {
                "image": "app/assets/bootstrap-templates/blog-template/contact-bg.jpg",
                "color": ""
            },

        },
        {

            "elementTmpName": "agency-portfolio",
            "includeInNav": false,
            "navName": "Portfolio",
            "elementTmpType": "portfolio",
            "title": {
                "title": "",
                "subtitle": ""
            },
            "data": [
                {
                    "title": "Threads",
                    "subtitle": "Illustration",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-thumbnail.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Explore",
                    "subtitle": "Graphic Design",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-thumbnail.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Finish",
                    "subtitle": "Identity",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-thumbnail.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Lines",
                    "subtitle": "Branding",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-thumbnail.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Southwest",
                    "subtitle": "Website Design",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-thumbnail.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Window",
                    "subtitle": "Photography",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-thumbnail.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                }
            ],
            "elementSequence": 1,
            "background": {
                "image": "",
                "color": ""
            }
        },
        {

            "elementTmpName": "creative-portfolio",
            "includeInNav": false,
            "navName": "portfolio",
            "elementTmpType": "portfolio",
            "title": {
                "title": "This is the title",
                "subtitle": "This is the subtitle"
            },
            "data": [
                {
                    "title": "Threads",
                    "subtitle": "Illustration",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/1.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Explore",
                    "subtitle": "Graphic Design",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/2.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Finish",
                    "subtitle": "Identity",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/3.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Lines",
                    "subtitle": "Branding",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/4.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Southwest",
                    "subtitle": "Website Design",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/5.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Window",
                    "subtitle": "Photography",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/6.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                }
            ],
            "elementSequence": 2,
            "background": {
                "image": "",
                "color": ""
            }
        },
        {

            "elementTmpName": "creative-portfolio",
            "includeInNav": false,
            "navName": "portfolio",
            "elementTmpType": "portfolio",
            "title": {
                "title": "This is the title",
                "subtitle": "This is the subtitle"
            },
            "data": [
                {
                    "title": "Threads",
                    "subtitle": "Illustration",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/1.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Explore",
                    "subtitle": "Graphic Design",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/2.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Finish",
                    "subtitle": "Identity",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/3.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Lines",
                    "subtitle": "Branding",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/4.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Southwest",
                    "subtitle": "Website Design",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/5.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                },
                {
                    "title": "Window",
                    "subtitle": "Photography",
                    "smallImage": {
                        "img": "app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/6.jpg"
                    },
                    "modal": {
                        "title": "PROJECT NAME",
                        "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                        "bigImage": {
                            "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg"
                        },
                        "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
                    }
                }
            ],
            "elementSequence": 3,
            "background": {
                "image": "",
                "color": ""
            }
        }
    ];
                    
                    let textualTemplate = [{
                            "background": {
                                "color": "",
                                "image": "app/assets/bootstrap-templates/blog-template/about-bg.jpg"
                            },
                            "elementSequence": 0,
                            "data": {
                                "buttonLink": "#",
                                "background": "app/assets/bootstrap-templates/blog-template/home-bg.jpg",
                                "subtitle": "A Clean Blog",
                                "title": "Blog"
                            },
                            "title": {
                                "subtitle": "This is the subtitle",
                                "title": "Text based template"
                            },
                            "elementTmpType": "headder",
                            "navName": "Headder",
                            "includeInNav": false,
                            "elementTmpName": "blog-headder",

                        },
                        {
                            "background": {
                                "color": "#ffffff",
                                "image": ""
                            },
                            "elementSequence": 1,
                            "data": {
                                "blogElements": [{

                                        "text": "<h2 style=\"text-align: center;\"><b>Some additional title here<\/b><\/h2><p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.<\/p>",
                                        "style": null,
                                        "type": "div",
                                        "id": 0
                                    },
                                    {

                                        "id": 1,
                                        "type": "div",
                                        "style": null,
                                        "text": "<p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.<\/p>"
                                    },
                                    {

                                        "id": 2,
                                        "type": "div",
                                        "style": null,
                                        "text": "<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.<\/p>"
                                    },
                                    {

                                        "id": 3,
                                        "type": "div",
                                        "style": null,
                                        "text": "<h2>Code block example<\/h2>"
                                    },
                                    {

                                        "id": 4,
                                        "type": "pre",
                                        "style": null,
                                        "text": "let variable =  1;\n<div><p>//Some magic function here...\nfunction sampleFunction(addVariable){\n<\/p>return variable + addVariable\n    \n}\n\n//implenentation\nlet result = sampleFunction(1);\n// console.log(result)//this should be 2<\/div>"
                                    },
                                    {

                                        "id": 5,
                                        "type": "div",
                                        "style": null,
                                        "text": "<h2 style=\"text-align: center;\"><b>The Final Frontier<\/b><\/h2><p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.<\/p><blockquote>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.<\/blockquote><p>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.<\/p>"
                                    },
                                    {

                                        "id": 6,
                                        "type": "div",
                                        "style": null,
                                        "text": "<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.<\/p>"
                                    },
                                    {

                                        "id": 7,
                                        "type": "img",
                                        "style": null,
                                        "text": {
                                            "img": "app/assets/bootstrap-templates/blog-template/post-bg.jpg"
                                        }
                                    },
                                    {
                                        "text": "<p>This fresh element<\/p>",
                                        "style": null,
                                        "type": "div",
                                        "id": 8,

                                    }
                                ],
                                "subtitle": "Some subtitle",
                                "title": "Textual element"
                            },
                            "title": {
                                "subtitle": "This is the subtitle",
                                "title": "This is the title"
                            },
                            "elementTmpType": "blog",
                            "navName": "Text",
                            "includeInNav": false,
                            "elementTmpName": "blog-body",
                        }
                    ];



                    var p = new page();
                    p.pageName = newname;
                    p.navbarElement = pa.navbarElement;
                    p.footer = pa.footer;
                    p.pageType = newname;



                    //logic to handle different template requests here....




                    if (req.body.pageType == 'template_text') {
                        //1. template_text
                            p.pageData = textualTemplate;
                    }
                    else if (req.body.pageType == 'template_galery') {
                        //2. template_galery
                        p.pageData = galleryTemplate;
                    }
                    else {
                        //fallback case
                        p.pageData = [{
                                "elementTmpName": "creative-headder",
                                "includeInNav": false,
                                "navName": "Headder",
                                "elementTmpType": "headder",
                                "elementSequence": 0,
                                "title": { "title": req.body.navbarName, "subtitle": "Subtitle here.." },
                                "data": dataCreativeHeadder,
                                "background": { "color": "", "image": "app/assets/bootstrap-templates/img-tmp1/header.jpg" }
                            },
                            {
                                "elementTmpName": "agency-service",
                                "includeInNav": false,
                                "navName": "Services",
                                "elementTmpType": "service",
                                "elementSequence": 1,
                                "title": {
                                    "title": "Services",
                                    "subtitle": "Lorem ipsum dolor sit amet consectetur."
                                },
                                "data": dataAgencyService,
                                "background": { "color": "", "image": "" }
                            }
                        ];



                    }







                    p.title = req.body.navbarName;
                    p.includeInNav = true;


                    p.save((err, p) => {
                        if (err)
                            return res.send({ error: err });
                        else {

                            //save new item to navbar....
                            pa.navbarElement.data.additionalElements.push({ elements: [{ navName: newname, slideTo: "#top_of_page" }], page: "/pages/" + newname })

                            page.findOneAndUpdate({ "pageType": "titlepage" }, { "navbarElement": pa.navbarElement }, { upsert: true }, function(err, pr) {
                                if (err)
                                    return res.send({ error: err });
                                else if (!pr) {
                                    res.send('Error, no title page found');
                                }
                                else {
                                    //assemble page from the model
                                    //assemble page from the model
                                    var pageTemplate = pageService.assembleTemplate(p);
                                    //write the page content to the disk...
                                    //writeToDisk('/../../app/title-page/generated-title-page.html', pageTemplate);
                                    writeFile(path + newname + '/simple-page.component.html', pageTemplate);
                                    res.json(p);

                                };
                            });








                        }
                    });

                }
            });



        }
        else res.send({ error: "page exists, page " + req.query.itemPage + " found..." });
    });


}



function readFile(filename) {
    return fs.readFileSync(filename, 'utf8');
    //     fs.readFile(filename, 'utf8', function(err, data) {
    //   if (err) {
    //       console.log('errorr');
    //      // throw err;
    //       return readFile(filename);
    //       //throw err;
    //   }
    //       console.log('OK: ' + filename);
    //       //console.log(data)
    //       return data;
    // });
}

function writeFile(filename, data) {
    fs.writeFile(filename, data, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}




exports.assembleTemplate = function(pageData) {

    //mandatory elements here...
    let mainString = "";

    let contentEditNav = '<content-edit-nav *ngIf="loginCheck()" [editPressed]="showElementTools" (editClick)="editClick()" (disableClick)="disableClick()" (saveClick)="saveClick()"></content-edit-nav>';
    mainString += contentEditNav;

    let layoutEditor = '<layout-editor *ngIf="loginCheck() && showElementTools" [pageData]="clonedPageData" ></layout-editor>';
    mainString += layoutEditor;

    let navbar = `<${pageData.navbarElement.elementTmpName} [pageData]="pageData"></${pageData.navbarElement.elementTmpName}>`;
    mainString += navbar;

    for (let i = 0; i < pageData.pageData.length; i++) {
        mainString += `<${pageData.pageData[i].elementTmpName} [filteredItemList]="filteredItemList" [showElementTools]="showElementTools" [pageData]="pageData.pageData[${i}]"></${pageData.pageData[i].elementTmpName}>`;
    }

    let footer = `<${pageData.footer.elementTmpName} [pageData]="pageData"></${pageData.footer.elementTmpName}>`;
    mainString += footer;

    console.log(mainString);
    return mainString;
}

exports.writeToDisk = function(path, page) {


    write(path, page);

    // fs.writeFile(__dirname+path, page, function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // }); 


}
//if fails recursively calls itself untill succeeds...
function write(path, page) {

    try {
        fs.writeFile(__dirname + path, page, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
    catch (e) {
        console.log("Error! Retrying");
        console.log(e);
        write(path, page);
    }

}



// let dataAgencyService = [{sequence:0,
//                      icon:'fa-shopping-cart',
//                      heading:'E-Commerce',
//                      text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
//         },{sequence:1,
//                      icon:'fa-laptop',
//                      heading:'Responsive Design',
//                      text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. '
//         },
//         {sequence:2,
//                      icon:'fa-lock',
//                      heading:'Web Security',
//                      text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
//         }];

//         let dataCreativeHeadder = "";

//         let dataCreativeService =  [{sequence:0,
//                                  icon:'fa-diamond',
//                                  heading:'Sturdy Templates',
//                                  text:'Our templates are updated regularly so they dont break.'},
//                                  {sequence:1,
//                                  icon:'fa-paper-plane',
//                                  heading:'Ready to Ship',
//                                  text:'You can use this theme as is, or you can make changes!'},
//                                 {sequence:2,
//                                  icon:'fa-newspaper-o',
//                                  heading:'Up to Date',
//                                  text:'We update dependencies to keep things fresh.'},
//                                 {sequence:3,
//                                  icon:'fa-heart',
//                                  heading:'Made with Love',
//                                  text:'You have to make your websites with love these days!'
//                                 }];

//         let dataCreativePortfolio = [{sequence:0,
//                                  icon:'fa-diamond',
//                                  heading:'Sturdy Templates',
//                                  text:'Our templates are updated regularly so they dont break.'},
//                                  {sequence:1,
//                                  icon:'fa-paper-plane',
//                                  heading:'Ready to Ship',
//                                  text:'You can use this theme as is, or you can make changes!'},
//                                 {sequence:2,
//                                  icon:'fa-newspaper-o',
//                                  heading:'Up to Date',
//                                  text:'We update dependencies to keep things fresh.'},
//                                 {sequence:3,
//                                  icon:'fa-heart',
//                                  heading:'Made with Love',
//                                  text:'You have to make your websites with love these days!'
//                                 }];

//         let dataAgencyHeadder = "";
//         let dataAgencyPortfolio = "";
//         let dataAgencyAmazingTeam = "";
//         let dataAgencyAbout =  "";
//         let dataAgencyFooter  = "";


//     let pageData = {"pageName":"Title Page",
//                             "navbarElement":{"elementTmpName":"agency-nav"},
//                             "footer":{"elementTmpName":"agency-footer",
//                                           "data":dataAgencyFooter},
//                             "pageType":"titlepage",
//                             "pageLayout":"layout1",
//                             "pageData":[{"elementTmpName":"creative-headder",
//                                           "elementTmpType":"headder",
//                                           "elementSequence":0,
//                                           "data":dataCreativeHeadder},
//                                          {"elementTmpName":"agency-service",
//                                           "elementTmpType":"service",
//                                           "elementSequence":1,
//                                           "data":dataAgencyService},
//                                          {"elementTmpName":"creative-service",
//                                           "elementTmpType":"service",
//                                           "elementSequence":2,
//                                           "data":dataCreativeService},
//                                         {"elementTmpName":"creative-portfolio",
//                                           "elementTmpType":"portfolio",
//                                           "elementSequence":3,
//                                           "data":dataCreativePortfolio},
//                                         {"elementTmpName":"agency-headder",
//                                           "elementTmpType":"headder",
//                                           "elementSequence":4,
//                                           "data":dataAgencyHeadder},
//                                         {"elementTmpName":"agency-portfolio",
//                                           "elementTmpType":"portfolio",
//                                           "elementSequence":5,
//                                           "data":dataAgencyPortfolio},
//                                         {"elementTmpName":"agency-amazing-team",
//                                           "elementTmpType":"team",
//                                           "elementSequence":6,
//                                           "data":dataAgencyAmazingTeam},
//                                         {"elementTmpName":"agency-about",
//                                           "elementTmpType":"about",
//                                           "elementSequence":7,
//                                           "data":dataAgencyAbout}
//                                           ]};
