import { Trace } from "../../../../src/domain/trace/trace";

test("Trace instance", () => {
  const trace = new Trace("1", "1", "1", null, null);
  expect(trace).toBeInstanceOf(Trace);
});

test("can set person id", () => {
  const trace = new Trace("1", "1", "1", null, null);
  trace.setPersonId("test");
  expect(trace.personId).toStrictEqual("test");
});

test("can set hotspot id", () => {
  const trace = new Trace("1", "1", "1", null, null);
  trace.setHotspotId("test");
  expect(trace.hotspotId).toStrictEqual("test");
});

test("can set entry time", () => {
  const date = new Date();
  const trace = new Trace("1", "1", "1", null, null);
  trace.setEntryTime(date);
  expect(trace.entryTime).toBeInstanceOf(Date);
  expect(trace.entryTime).toBe(date);
});

test("can set exit time", () => {
  const date = new Date();
  const trace = new Trace("1", "1", "1", null, null);
  trace.setExitTime(date);
  expect(trace.exitTime).toBeInstanceOf(Date);
  expect(trace.exitTime).toBe(date);
});

test("can set trace random object", () => {
  const trace = new Trace("1", "1", "1", null, null);
  expect(trace.id).toBe("1");
  expect(trace.personId).toBe("1");
  expect(trace.hotspotId).toBe("1");
  expect(trace.entryTime).toBe(null);
  expect(trace.exitTime).toBe(null);
});
