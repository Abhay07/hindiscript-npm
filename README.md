##Hindiscript

####Installing
Install hindiscript npm module globally

`npm install -g hindiscript`

####Usage
Create a .hs file with hindiscript code

####Sample Hindiscript code 
```javascript
//Sample hindiscript code - test.hs
maanteHain x = 5;
yadi(x>2){
    likho('x 5 se bada hai');
}
anyatha{
    likho('x 5 se chhota hai');
}
```

Transpile hindiscript to javascript with below code

`hindiscript test.hs`

This will create an output.js file in the current folder.

Default language is Hindi. Change language through -l argument.
`hindiscript test.hs -l  gujarati`

Supported languages
- Hindi
- Gujarati
- Kannada
- Telugu
- Tamil
- Marathi