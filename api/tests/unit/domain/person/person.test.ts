import { Person } from "../../../../src/domain/person/person";

test("Person instance", () => {
  const person = new Person("1", "firstName", "lastName", "123456789", "210");
  expect(person).toBeInstanceOf(Person);
});

test("can set first name", () => {
  const person = new Person("1", "firstName", "lastName", "123456789", "210");
  person.setFirstName("test");
  expect(person.firstName).toStrictEqual("test");
});

test("can set last name", () => {
  const person = new Person("1", "firstName", "lastName", "123456789", "210");
  person.setLastName("test");
  expect(person.lastName).toStrictEqual("test");
});

test("can set phone number", () => {
  const person = new Person("1", "firstName", "lastName", "123456789", "210");
  person.setPhoneNumber("test");
  expect(person.phoneNumber).toStrictEqual("test");
});

test("can set phone number", () => {
  const person = new Person("1", "firstName", "lastName", "123456789", "210");
  person.setProfile("test");
  expect(person.profile).toStrictEqual("test");
});

test("Person random object", () => {
  const person = new Person("1", "firstName", "lastName", "123456789", "210");
  expect(person.firstName).toBe("firstName");
  expect(person.lastName).toBe("lastName");
  expect(person.phoneNumber).toBe("123456789");
  expect(person.profile).toBe("210");
});
