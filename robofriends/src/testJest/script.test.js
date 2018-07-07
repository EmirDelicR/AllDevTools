const googleSearch = require('./google');

const dbMock = [
    'disney.com',
    'cats.com',
    'catspicture.com'
];

describe('googleSearch', () => {
    it('this is a test', () => {
        expect(googleSearch('testtest', dbMock)).toEqual([]);
    })
    
    it('this is a test 2', () => {
        expect(googleSearch('disney', dbMock)).toEqual(['disney.com']);
    })
    
    it('work with undefined and null input', () => {
        expect(googleSearch(undefined, dbMock)).toEqual([]);
        expect(googleSearch(null, dbMock)).toEqual([]);
    })
    
    it('does not return more then 3 matches', () => {
        expect(googleSearch('.com', dbMock).length).toEqual(3);
    })
})
