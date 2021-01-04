export class Trace {
  public constructor(
    public id: string,
    public personId: string,
    public hotspotId: string,
    public entryTime: Date,
    public exitTime: Date
  ) {}

  public setPersonId(personId: string) {
    this.personId = personId;
  }

  public setHotspotId(hotspotId: string) {
    this.hotspotId = hotspotId;
  }

  public setEntryTime(entryTime: Date) {
    this.entryTime = entryTime;
  }

  public setExitTime(exitTime: Date) {
    this.exitTime = exitTime;
  }
}
