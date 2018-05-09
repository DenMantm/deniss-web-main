import {ArrayUtilityService} from '../common/index';

let arrayService = new ArrayUtilityService();


let ef_cond1 = {         "id": 1,
                        "type": "code",
                        "style": null,
                        "text": "code block"
                    };
                    
let ef_cond2 = {         "id": 1,
                        "type": "div",
                        "style": null,
                        "text": "<p>This fresh element</p>"
                    }; 
                    
let ef_val1 = arrayService.elementFactory(1,"code");
let ef_val2 = arrayService.elementFactory(1,"div");

describe('Array util service test - elementFactory', () => {
  it('creates element that is code block', () => expect(JSON.stringify(ef_val1)).toBe(JSON.stringify(ef_cond1)));
  it('creates div element', () => expect(JSON.stringify(ef_val2)).toBe(JSON.stringify(ef_cond2)));
});


let sf_cond1 = {
                "id": 1,
                "titleText": "New Snippet",
                "elements": [
                    {
                        "id": 0,
                        "type": "div",
                        "style": null,
                        "text": "<h3>This is the title element</h3>"
                    },
                    {
                        "id": 1,
                        "type": "p",
                        "style": null,
                        "text": "<p>This is paragraph entery</p>"
                    },
                    {
                        "id": 2,
                        "type": "pre",
                        "style": null,
                        "text": "This is pre block element"
                    }
                ],
                "comments": null
            };

let sf_val1 = arrayService.snippetFactory(1);


describe('Array util service test - snippetFactory', () => {
  it('generates element with provided id', () => expect(JSON.stringify(sf_val1)).toBe(JSON.stringify(sf_cond1)));
});


let dc_val1 = sf_val1;

let dc_cond1 = arrayService.deepCopy(dc_val1);

describe('Array util service test - deepCopy', () => {
  it('deep copy of the elements', () => expect(JSON.stringify(dc_val1)).toBe(JSON.stringify(dc_cond1)));
});