const service = require('../../src/application/trace.service')

test('function createTrace trace service', () => {
    service.TraceService.prototype.createTrace('1').then((object) => {
        expect(object).toBe({});
    })
});

test('function getTrace trace service', () => {
    service.TraceService.prototype.getTrace(1).then((object) => {
        expect(object).toBe({});
    })
});

test('function removeTrace trace service', () => {
    service.TraceService.prototype.removeTrace(1).then((object) => {
        expect(object).toBe({});
    })
});