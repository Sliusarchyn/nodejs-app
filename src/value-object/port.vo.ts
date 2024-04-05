export default class Port {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValidPort(value)) {
      throw new Error('Invalid port number');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  private isValidPort(value: number): boolean {
    return Number.isInteger(value) && value > 0 && value <= 65535;
  }
}
