declare global {
    interface Window {
      paypal: any; // TypeScript won't know about PayPal without this
    }
  }
  
  export {};
  