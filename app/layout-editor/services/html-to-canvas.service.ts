import { Injectable } from '@angular/core';

declare var html2canvas,document;

@Injectable()
export class HtmlToCanvasService{
  constructor() {
  }
  
  //Getting elements to build the page...

  //Getting the current layout
  
  
  //saving the new layout
  
   getScreenshotOfElement(element, posX, posY, width, height, callback) {
    html2canvas(element, {
        onrendered: (canvas) => {
            let context = canvas.getContext('2d');
            let imageData = context.getImageData(posX, posY, width, height).data;
            let outputCanvas = document.createElement('canvas');
            let outputContext = outputCanvas.getContext('2d');
            outputCanvas.width = width;
            outputCanvas.height = height;

            let idata = outputContext.createImageData(width, height);
            idata.data.set(imageData);
            outputContext.putImageData(idata, 0, 0);
            callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
        },
        width: width,
        height: height,
        useCORS: true,
        taintTest: false,
        allowTaint: false
    });
}
  
  
}