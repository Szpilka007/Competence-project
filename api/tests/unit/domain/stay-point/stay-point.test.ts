import { StayPoint } from "../../../../src/domain/stayPoint/stayPoint";

test("StayPoint instance", () => {
  const stayPoint = new StayPoint("1", "1", "1", new Date(), 12);
  expect(stayPoint).toBeInstanceOf(StayPoint);
});

test("can set person id", () => {
  const stayPoint = new StayPoint("1", "1", "1", new Date(), 12);
  stayPoint.setPersonId("test");
  expect(stayPoint.personId).toStrictEqual("test");
});

test("can set length of stay", () => {
  const stayPoint = new StayPoint("1", "1", "1", new Date(), 12);
  stayPoint.setlengthOfStay(4);
  expect(stayPoint.lengthOfStay).toStrictEqual(4);
});

test("can set length of stay", () => {
  const date = new Date();
  const stayPoint = new StayPoint("1", "1", "1", new Date(), 12);
  stayPoint.setEntryTime(date);
  expect(stayPoint.entryTime).toStrictEqual(date);
});

test("can set hotspot id", () => {
  const stayPoint = new StayPoint("1", "1", "1", new Date(), 12);
  stayPoint.setHotspotId("fake-id");
  expect(stayPoint.hotspotId).toStrictEqual("fake-id");
});
