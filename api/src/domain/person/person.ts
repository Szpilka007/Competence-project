export class Person {
  public constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public profile: string
  ) {}

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  public setProfile(profile: string) {
    this.profile = profile;
  }
}
