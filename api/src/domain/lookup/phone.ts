export class PhoneLookUp {
    public constructor(
      public id: string,
      public fakeNumber: string,
      public realNumber: string
    ) {}
  
    public setFakeNumber(fakeNumber: string) {
      this.fakeNumber = fakeNumber;
    }
  
    public setRealNumber(realNumber: string) {
      this.realNumber = realNumber;
    }
  }
  