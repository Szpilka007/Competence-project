export class StayPoint {
  public constructor(
    public id: string,
    public personId: string,
    public hotspotId: string,
    public entryTime: Date,
    public lengthOfStay: Number,
  ) { }

   public setPersonId(personId: string): void {
    this.personId = personId;
  }

   public setHotspotId(hotspotId: string): void {
    this.hotspotId = hotspotId;
  }

   public setEntryTime(entryTime: Date): void {
    this.entryTime = entryTime;
  }

   public setlengthOfStay(lengthOfStay: Number): void {
    this.lengthOfStay = lengthOfStay;
  }
} 