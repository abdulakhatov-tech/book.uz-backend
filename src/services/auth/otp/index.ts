interface IOtpStore {
  name?: string;
    otpCode: number;
    surname?: string;
    expiresAt: number;
  }
  
  class OTPService {
    public otpValidity: number;
    public otpStore: Map<string, IOtpStore>;
  
    constructor() {
      this.otpStore = new Map();
      this.otpValidity = 1 * 60 * 1000; // 1 minute
    }
  
    generateOTP() {
      return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    }
  
    storeOTP(
      phoneNumber: string,
      otpCode: number,
      name?: string,
      surname?: string
    ): void {
      const otpData: {
        otpCode: number;
        expiresAt: number;
        name?: string;
        surname?: string;
      } = {
        otpCode,
        expiresAt: Date.now() + this.otpValidity,
      };
  
      if (name) {
        otpData.name = name;
      }
      if (surname) {
        otpData.surname = surname;
      }
  
      this.otpStore.set(phoneNumber, otpData);
    }
  
    validateOTP(phoneNumber: string, otpCode: number) {
      const otpEntry = this.otpStore.get(phoneNumber);
      
      if (!otpEntry) {
        throw new Error("OTP code not found!");
      }
  
      if (otpEntry.otpCode !== otpCode) {
        throw new Error("Invalid OTP code!");
      }
  
      if (Date.now() > otpEntry.expiresAt) {
        throw new Error("OTP code expired! Please try again!");
      }
  
      this.otpStore.delete(phoneNumber);
  
      return {
        name: otpEntry.name,
        surname: otpEntry.surname,
      }
    }
  }
  
  export default new OTPService;