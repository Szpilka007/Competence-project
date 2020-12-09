const service = require('../../src/application/hotspot.service')
const {Hotspot} = require("../../src/infrastructure/entity/hotspot");

test('method findAll returns empty object', () => {
    service.HotspotService.prototype.findAll().then((response)=> {
        expect(response).toBe({});
    })
});

test('method findAll returns one object', () => {
    service.HotspotService.prototype.save(new Hotspot()).then(() => {
        service.HotspotService.prototype.findAll().then((response)=> {
            expect(response).toBe({});
        })
    })
});

test('method findAll returns empty object', () => {
    service.HotspotService.prototype.save(new Hotspot()).then(() => {
        service.HotspotService.prototype.findAll().then((response)=> {
            expect(response).toBe({});
        })
    })
});