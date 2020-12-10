const service = require('../../src/application/person.service')

test('function createPerson person service', () => {
    service.PersonService.prototype.createPerson('1').then((object) => {
        expect(object).toBe({});
    })
});

test('function getPerson person service', () => {
    service.PersonService.prototype.getPerson(1).then((object) => {
        expect(object).toBe({});
    })
});

test('function removePerson person service', () => {
    service.PersonService.prototype.removePerson(1).then((object) => {
        expect(object).toBe({});
    })
});

test('function findPersons person service', () => {
    service.PersonService.prototype.findPersons(1).then((object) => {
        expect(object).toBe({});
    })
});