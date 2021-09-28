const {animals} = require('./data/animals.json')
const express = require('express');
const app = express();

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //if personalitytraits is a string place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalityTraits arrya
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filtered results array
            //remember it is initially a copy of the animalsArray
            //but here were updating it for each trait in the .forEach() loop
            //for each trait being targetted by the filter the filteredResults
            //array will then contain only the entries that contacin the trait
            //so ar the end well have an array of animals that have every one
            //of the traits when the .forEach loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }
  app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
//app.get('/api/animals', (req, res) => {
//    let results = animals;
//    if (req,query) {
//        results = filterByQuery(req.query, results);
//    }
//    res.json(results);
//
//    console.log(req.query)
//    res.json(animals);
//})
app.listen(3001, () => {
    console.log('API server now on port 3001')
})