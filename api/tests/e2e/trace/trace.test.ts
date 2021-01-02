import "reflect-metadata";
import {DatabaseHelper} from "../../_helper/database.helper";
import {setupAppTestModule} from "../../_config/setup_app_test_module";
import {TestingModule} from "@nestjs/testing";
import {TraceController} from "../../../src/controller/trace.controller";
import {TraceRepository} from "../../../src/infrastructure/repository/trace.repository";
import { v4 as uuid } from "uuid";
describe("Trace", () => {
	let moduleRef: TestingModule;
	let traceController: TraceController;
	let traceRepository: TraceRepository;
	let databaseHelper: DatabaseHelper;

	beforeAll(async () => {
		moduleRef = await setupAppTestModule();
		traceController = await moduleRef.resolve(TraceController);
		traceRepository = await moduleRef.resolve(TraceRepository);
		databaseHelper = new DatabaseHelper(traceRepository.manager.connection);

		await databaseHelper.disableForeignKeyChecks();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("Create trace", async () => {
		// GIVEN
		const payload = {
			personId: uuid(),
			hotspotId: uuid(),
			entryTime: new Date(),
			exitTime: new Date(),
		};

		// WHEN
		await traceController.createTrace(payload);

		// THEN
		const traces = await traceRepository.find();
		console.log(traces);
		expect(traces.length).toBe(1);
	});


	test("Get person", async () => {
		// GIVEN
		const payload = {
			personId: uuid(),
			hotspotId: uuid(),
			entryTime: new Date(),
			exitTime: new Date(),
		};
		await traceController.createTrace(payload);
		const traces = await traceRepository.find();

		// WHEN
		const result = await traceController.getTrace(traces[0].id);

		// THEN
		expect(result.personId).toBe(payload.personId);
		expect(result.entryTime).toStrictEqual(payload.entryTime);
		expect(result.exitTime).toStrictEqual(payload.exitTime);
		expect(result.id.length).toBeGreaterThan(0);
		expect(result.hotspotId).toBe(payload.hotspotId);
	});

	test("Remove trace", async () => {
		// GIVEN
		const payload = {
			personId: uuid(),
			hotspotId: uuid(),
			entryTime: new Date(),
			exitTime: new Date(),
		};
		await traceController.createTrace(payload);
		const traces = await traceRepository.find();

		// WHEN
		const result = await traceController.removeTrace(traces[0].id);

		// THEN
		const afterRemovePerson = await traceRepository.find();
		expect(afterRemovePerson.length).toBe(0);
	});

	afterEach(async () => {
		jest.clearAllMocks();
		await databaseHelper.truncate("traces");
	});

	afterAll(async () => {
		await databaseHelper.enableForeignKeyChecks();
		await moduleRef.close();
	});
});