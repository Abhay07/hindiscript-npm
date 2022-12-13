console.log(process.argv[2]);
import {open} from "node:fs/promises";
import { exec } from "node:child_process";
import {hindiMapper, hindiScriptRegex, hindiScriptKeyWords, tamilScriptRegex, tamilMapper, gujaratiScriptKeyWords, kannadaScriptRegex, kannadaMapper, marathiScriptRegex, marathiMapper, gujaratiScriptRegex, gujaratiMapper, teluguScriptRegex, teluguMapper } from "./src/mapping.js";

// Read input file name from arguments
const fileName = process.argv[2];

//setting default language
let SELECTED_LANGUAGE = 'HINDI';

//reading language from arguments if exists
const langFlagIndex = process.argv.indexOf('-l');
if(langFlagIndex > -1){
	SELECTED_LANGUAGE = process.argv[langFlagIndex+1] || 'HINDI';
	console.log(SELECTED_LANGUAGE);
	SELECTED_LANGUAGE = SELECTED_LANGUAGE.toUpperCase();
}


export const main = async () => {
	if(!fileName){
		return console.log('Please provide a file name');
	}
	if(fileName.indexOf('.hs') < 0){
		return console.log('Provide a .hs file');
	}
	const currentDirectory = process.cwd();
	const inputFilePath = (currentDirectory+'/'+fileName);
	const outputFilePath = (currentDirectory+'/'+'output.js');
    let filehandle = null
    try{
        filehandle = await open(inputFilePath,'r');
        const indianScript = await filehandle.readFile({encoding:'utf8'});
		console.log('Transpiling hindiscript to javascript...');

		//Mapping of .hs to .js
		let hindiCode,  javascriptCode;
        switch(SELECTED_LANGUAGE){
            case 'HINDI':
                hindiCode = indianScript;
                javascriptCode = hindiCode.replace(hindiScriptRegex, hindiMapper);
                break;
            case 'TAMIL':
                hindiCode = indianScript;
                javascriptCode = hindiCode.replace(tamilScriptRegex, tamilMapper)
                break;
            case 'TELUGU':
                    hindiCode = indianScript;
                    javascriptCode = hindiCode.replace(teluguScriptRegex, teluguMapper)
                    break;
            case 'MARATHI':
                hindiCode = indianScript;
                javascriptCode = hindiCode.replace(marathiScriptRegex, marathiMapper)
                break;
            case 'GUJARATI':
                hindiCode = indianScript;
                javascriptCode = hindiCode.replace(gujaratiScriptRegex, gujaratiMapper)
                break;
            case 'KANNADA':
            hindiCode = indianScript;
            javascriptCode = hindiCode.replace(kannadaScriptRegex, kannadaMapper)
            break;
        }

		//write transpiled javascript code to output.js
		let writeFileHandle = await open(outputFilePath,'w');
		await writeFileHandle.writeFile(javascriptCode);
		console.log('Successfully transpiled '+fileName+' to '+ 'output.js. Opening folder.');
		exec('open .');
    }
    catch(err){
        console.log(err);
    }
}