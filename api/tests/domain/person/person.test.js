const {Person} = require("../../../src/domain/person/person");

test('person model test', () => {
    const person = new Person('1','firstName','lastName',123456789,'210')
    expect(person.firstName).toBe('firstName')
    expect(person.lastName).toBe('lastName')
    expect(person.phoneNumber).toBe(123456789)
    expect(person.profile).toBe('210')
});