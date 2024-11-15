import { useEffect } from 'react';

const PayPalButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD`;
    script.async = true;
    script.onload = () => {
      // Initialize PayPal buttons once the script has loaded
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '20.00', // The total price
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      }).render('#paypal-button-container'); // Render the PayPal button inside the container
    };
    document.body.appendChild(script);
  }, []);

  return <div id="paypal-button-container"></div>;
}

export default PayPalButton;
