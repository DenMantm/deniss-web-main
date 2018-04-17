var fs = require('fs');
var page = require('../database/models/page');

exports.generateTitlePage = function(){
 
    return null;
}


let rewritePageContent = function(){
    
}

exports.assembleTemplate = function(pageData){
        
            //mandatory elements here...
        let mainString = "";
            
        let contentEditNav = '<content-edit-nav *ngIf="loginCheck()" [editPressed]="showElementTools" (editClick)="editClick()" (disableClick)="disableClick()" (saveClick)="saveClick()"></content-edit-nav>';
        mainString += contentEditNav;
        
        let layoutEditor = '<layout-editor *ngIf="loginCheck() && showElementTools" [pageData]="clonedPageData" ></layout-editor>';
        mainString += layoutEditor;   
        
        let navbar = `<${pageData.navbarElement.elementTmpName} [pageData]="pageData"></${pageData.navbarElement.elementTmpName}>`;
        mainString += navbar;                                 
        
        for(let i = 0;i<pageData.pageData.length;i++){
            mainString += `<${pageData.pageData[i].elementTmpName} [showElementTools]="showElementTools" [pageData]="pageData.pageData[${i}]"></${pageData.pageData[i].elementTmpName}>`;
        }
        
        let footer = `<${pageData.footer.elementTmpName} [pageData]="pageData"></${pageData.footer.elementTmpName}>`;
        mainString += footer;
        
        console.log(mainString);
        return mainString;
}

exports.writeToDisk = function(path,page){
    

         write(path,page);

// fs.writeFile(__dirname+path, page, function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
    
    
}
//if fails recursively calls itself untill succeeds...
function write(path,page){
    
    try{
    fs.writeFile(__dirname+path, page, function(err) {
    if(err) {
        return console.log(err);
    }
        console.log("The file was saved!");
}); 
}catch(e){
    console.log("Error! Retrying");
    console.log(e);
    write(path,page);
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

