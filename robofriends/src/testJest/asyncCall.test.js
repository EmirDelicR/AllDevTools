const fetch = require('node-fetch');
const swapi = require('./asyncCall');


/** 
 *  Use assertions to check if test is executed 
 *  Pass done to wait promise to end
 */
it('test swapi api get people', (done) => {
    expect.assertions(1);
    swapi.getPeople(fetch).then(data => {
        expect(data.count).toEqual(87);
        done();
    })
})
/**
 * Or use return and remove done 
 */
it('test swapi api get people promise', () => {
    expect.assertions(2);
    return swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5);
    })
})

/**
 * Using MOCK in JEST
 */
it('using MOCK test', () => {
    const mockFetch = jest.fn()
        .mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({
                count: 87,
                results: [0, 1, 2, 3, 4, 5]
            })
        }))
    expect.assertions(3);
    return swapi.getPeoplePromise(mockFetch).then(data => {
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5);
    })
})