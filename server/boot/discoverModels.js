// const path = require('path');
// const loopback = require('loopback');
// const fs = require('fs');
// const app = require(path.resolve(__dirname, '../server'));
// const outputPath = path.resolve(__dirname, '../../common/models');
// const ds = app.datasources.assignment;
// const configPath = path.resolve(__dirname, '../model-config.json');


// let modelConfig = {};
// let models = ['Event'];
// for (let i = 0; i < models.length; i++) {
//     ds.discoverSchema(models[i], { schema: 'calendar', associations: true, relations: true }, function (err, schema) {
//         if (err){
//             console.log(err);
//             throw err;
//         }
//         var outputName = outputPath + '/' + schema.name + '.json';
//         let parsedSchema = JSON.parse(JSON.stringify(schema));
//         fs.writeFile(outputName, JSON.stringify(parsedSchema, null, 2), function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("JSON saved to " + outputName);
//             }
//         });
//     });
//     let modelNAme = models[i].charAt(0).toUpperCase() + models[i].slice(1);
//     modelConfig[modelNAme] = { dataSource: 'assignment', public: true };
// }
   
// fs.readFile(configPath, 'utf-8', function (err, configJson) {
//     let config = JSON.parse(configJson);
//     let merged = { ...config, ...modelConfig };
//     fs.writeFile(configPath, JSON.stringify(merged, null, 2), function (err) {
//         if (err) throw err;
//     });
// });