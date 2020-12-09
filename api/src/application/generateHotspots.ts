import {Hotspot} from "../infrastructure/entity/hotspot";
import {createConnection} from "typeorm";

const EARTH_RADIUS: number = 6357.0;
const CENTER_LATITUDE: number = 51.747192 * Math.PI / 180.0;
const CENTER_LONGITUDE: number = 19.453153 * Math.PI / 180.0;

const HOTSPOT_TYPES = [
    {place: 'Cafe', type: 'indoor', description: 'Tea or coffee?'},
    {place: 'Restaurant', type: 'indoor', description: 'You can eat well here.'},
    {place: 'Dorm', type: 'indoor', description: 'Best students\' parties, everyone is invited.'},
    {place: 'Library', type: 'indoor', description: 'You can find here almost every book.'},
    {place: 'Administration', type: 'indoor', description: 'University administration building.'},
    {place: 'Classrooms', type: 'indoor', description: 'University building, where classes are given.'},
    {place: 'Park', type: 'outdoor', description: 'Chill among trees.'},
    {place: 'Bus stop', type: 'outdoor', description: 'Now you can go wherever you want to.'},
    {place: 'Shop', type: 'indoor', description: 'Just a shop.'},
    {place: 'Cinema', type: 'indoor', description: 'The newest movies in one place.'},
    {place: 'Gym', type: 'indoor', description: 'You can do a workout here.'}];


require('dotenv').config();

createConnection({
    type: 'postgres',
    url: process.env.POSTGRES_DATABASE_URL,
    entities: [Hotspot]
}).then((connection) => {

    const prob = require('prob.js');
    const exponential = prob.exponential(1.0);

    const hotspotCount: number = process.argv[2] == undefined ? 10 : Number(process.argv[2]);

    for (let i = 0; i < hotspotCount; i++) {
        let angle: number = Math.random() * 2 * Math.PI;
        let distance: number = exponential();
        let latitude: number = phi(distance, angle) * 180 / Math.PI;
        let longitude: number = lambda(distance, angle, latitude) * 180 / Math.PI;
        let hotspotType = getRandomHotspotType();
        let hotspot = Hotspot.fromRequestDto({
            name: hotspotType.place,
            latitude: latitude,
            longitude: longitude,
            type: hotspotType.type,
            description: hotspotType.description
        });
        connection.manager.save(hotspot).then(() => {});
    }

    return;

}).catch(error => console.log(error));


function phi(distance: number, angle: number): number {
    return Math.asin(Math.sin(CENTER_LATITUDE) * Math.cos(distance / EARTH_RADIUS) + Math.cos(CENTER_LATITUDE) * Math.sin(distance / EARTH_RADIUS) * Math.cos(angle));
}

function lambda(distance: number, angle: number, latitude: number): number {
    return CENTER_LONGITUDE + Math.atan2(Math.sin(angle) * Math.sin(distance / EARTH_RADIUS) * Math.cos(CENTER_LATITUDE),
        Math.cos(distance / EARTH_RADIUS) - Math.sin(CENTER_LATITUDE) * Math.sin(latitude));
}

function getRandomHotspotType() {
    return HOTSPOT_TYPES[Math.floor(Math.random() * (HOTSPOT_TYPES.length))];
}


