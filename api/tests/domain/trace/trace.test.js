const {Trace} = require("../../../src/domain/trace/trace");


test('trace model test', () => {
    const trace = new Trace('1','1','1',null,null)
    expect(trace.id).toBe('1')
    expect(trace.personId).toBe('1')
    expect(trace.hotspotId).toBe('1')
    expect(trace.entryTime).toBe(null)
    expect(trace.exitTime).toBe(null)
});