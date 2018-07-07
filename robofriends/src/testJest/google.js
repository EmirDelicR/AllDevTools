const googleDatabase = [
    'first.com',
    'souprecipes.com',
    'flowers.com',
    'animals.com',
    'dogs.com',
    'myfavouritedog.com',
    'myfavouritedog1.com'
];

const googleSearch = (searchInput, db) => {
    const matches = db.filter(website => {
        return website.includes(searchInput);
    });
    return matches.length > 3 ? matches.slice(0, 3) : matches;
}

// console.log(googleSearch('dog'));
// To run: npm google.js

module.exports = googleSearch;