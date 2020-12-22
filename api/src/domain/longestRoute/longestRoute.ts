export class LongestRoute {
  public constructor(
    public id: string,
    public personId: string,
    public routeLength: Number,
  ) { }

   public setPersonId(personId: string): void {
    this.personId = personId;
  }

   public setlengthOfStay(routeLength: Number): void {
    this.routeLength = routeLength;
  }
} 