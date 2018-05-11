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
    
    if(pageType == 'titlepage'){
        res.json({error:"cannot delete titlepage..."});
        return;
    }
               
            try{
                eraseFiles(pageType);
            }
            catch(e){
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
        else{
            
            
            //res.json(pg.navbarElement);
            
            
            let searchCondition = '/pages/'+pageType;
            

            for (let i = 0; i < pg.navbarElement.data.additionalElements.length; i++) {
                if (pg.navbarElement.data.additionalElements[i].page == searchCondition) {
                    
                    let deleteIndex = pg.navbarElement.data.additionalElements.indexOf(pg.navbarElement.data.additionalElements[i]);
                    pg.navbarElement.data.additionalElements.splice(deleteIndex,1);

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

function eraseFiles(pageType){
    
     //1. Remove module from routes
    
      let routeAddition = `{path:'pages/${pageType}',component:pages.${pageType} ,canActivate:[LoggedInGuard],resolve:{userImageList:ImageResolverService,User:UserLoggedInResolver,pageModel:pages.SimplePageResolverService,titleNav:pages.SimplePageNavResolverService,titleFooter:pages.SimplePageFooterResolverService}},`
            let path = __dirname + '/../../app/other-pages/';
            

            let routeFile = readFile(path + '/../routes.ts');
            routeFile = routeFile.replace(routeAddition, '');
            writeFile(path + '/../routes.ts', routeFile);
            
            
            //2. Remove module from app.module
            let appModule = readFile(path + '/../app.module.ts');

            appModule = appModule.replace(`pages.${pageType},` + "\r\n",'')
            writeFile(path + '/../app.module.ts', appModule);
                
                
            //3. Remove module from index.ts
            let index = readFile(path + '/index.ts');
            let replaceString = "export * from './" + pageType + "/simple-page.component';" + "\r\n";
            index = index.replace(replaceString,'');

            writeFile(path + '/index.ts', index);
            
            
            //remove folder
            fs.removeSync(path+pageType);
    
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

            let routeAddition = `{path:'pages/${newname}',component:pages.${newname} ,canActivate:[LoggedInGuard],resolve:{userImageList:ImageResolverService,User:UserLoggedInResolver,pageModel:pages.SimplePageResolverService,titleNav:pages.SimplePageNavResolverService,titleFooter:pages.SimplePageFooterResolverService}},`

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
                    
                    
                    let dataCreativeHeadder = {
                        "title": req.body.navbarName,
                        "subtitle": "simplePage",
                        "background": {color: "", image: "app/assets/bootstrap-templates/img-tmp1/header.jpg"},
                        "buttonLink": "#"
                    };


                    var p = new page();
                    p.pageName = newname;
                    p.navbarElement = pa.navbarElement;
                    p.footer = pa.footer;
                    p.pageType = newname;
                    p.pageData = [{
                            "elementTmpName": "creative-headder",
                            "includeInNav": false,
                            "navName": "Headder",
                            "elementTmpType": "headder",
                            "elementSequence": 0,
                            "title": dataCreativeHeadder,
                            "data": '',
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
                    
                    p.title = req.body.navbarName;
                    p.includeInNav = true;
                    

                    p.save((err, p) => {
                        if (err)
                            return res.send({ error: err });
                        else {
                            
                            //save new item to navbar....
                            pa.navbarElement.data.additionalElements.push({elements: [{navName: newname, slideTo: "#top_of_page"}], page: "/pages/"+newname})
                            
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
