import "reflect-metadata";
import {INestApplication, INestMicroservice} from "@nestjs/common";
import {DatabaseHelper} from "../../_helper/database.helper";
import {setupAppTestModule} from "../../_config/setup_app_test_module";
import {PersonController} from "../../../src/controller/person.controller";
import {PersonRepository} from "../../../src/infrastructure/repository/person.repository";
import {TestingModule} from "@nestjs/testing";

describe("Person", () => {
	let moduleRef: TestingModule;
	let personController: PersonController;
	let personRepository: PersonRepository;
	let databaseHelper: DatabaseHelper;

	beforeAll(async () => {
		moduleRef = await setupAppTestModule();
		personController = await moduleRef.resolve(PersonController);
		personRepository = await moduleRef.resolve(PersonRepository);
		databaseHelper = new DatabaseHelper(personRepository.manager.connection);

		await databaseHelper.disableForeignKeyChecks();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("Create person", async () => {
		// GIVEN
		const payload = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "123414242",
			profile: "random",
		};

		// WHEN
		await personController.createPerson(payload);

		// THEN
		const persons = await personRepository.find();
		expect(persons.length).toBe(1);
		expect(persons[0].firstName).toBe(payload.firstName);
		expect(persons[0].lastName).toBe(payload.lastName);
		expect(persons[0].phoneNumber.length).toBeGreaterThan(0);
		expect(persons[0].profile).toBe(payload.profile);
	});

	test("Update person", async () => {
		// GIVEN
		await personController.createPerson({
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "123414242",
			profile: "random",
		});
		const persons = await personRepository.find();
		// WHEN
		await personController.updatePerson(persons[0].id, {firstName: "test", lastName: "test"});

		// THEN
		const afterUpdatePerson = await personRepository.find();
		expect(afterUpdatePerson.length).toBe(1);
		expect(afterUpdatePerson[0].firstName).toBe("test");
		expect(afterUpdatePerson[0].lastName).toBe("test");
		expect(afterUpdatePerson[0].phoneNumber.length).toBeGreaterThan(0);
		expect(afterUpdatePerson[0].profile).toBe("random");
	});

	test("Get person", async () => {
		// GIVEN
		const payload = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "123414242",
			profile: "random",
		};
		await personController.createPerson(payload);
		const persons = await personRepository.find();

		// WHEN
		const result = await personController.getPerson(persons[0].id);

		// THEN
		expect(result.firstName).toBe(payload.firstName);
		expect(result.lastName).toBe(payload.lastName);
		expect(result.phoneNumber.length).toBeGreaterThan(0);
		expect(result.profile).toBe(payload.profile);
	});

	test("Remove person", async () => {
		// GIVEN
		const payload = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "123414242",
			profile: "random",
		};
		await personController.createPerson(payload);
		const persons = await personRepository.find();

		// WHEN
		const result = await personController.removePerson(persons[0].id);

		// THEN
		const afterRemovePerson = await personRepository.find();
		expect(afterRemovePerson.length).toBe(0);
	});

	afterEach(async () => {
		jest.clearAllMocks();
		await databaseHelper.truncate("persons");
	});

	afterAll(async () => {
		await databaseHelper.enableForeignKeyChecks();
		 await moduleRef.close();
	});
});